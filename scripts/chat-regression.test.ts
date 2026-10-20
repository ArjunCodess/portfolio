import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { mock } from "node:test";
import { DefaultChatTransport, readUIMessageStream, type UIMessage } from "ai";
import { chatHistory } from "../src/lib/ai/chat-history";
import { boundedHistory, chatRequest } from "../src/lib/ai/chat-policy";
import {
  generateChatAnswer,
  ChatGenerationError,
} from "../src/lib/ai/chat-generation";
import { POST } from "../src/app/api/chat/route";

const originalEnv = { ...process.env };
afterEach(() => {
  mock.restoreAll();
  process.env = { ...originalEnv };
});

function completion(text: string, finish = "stop") {
  return Response.json({
    id: "test",
    created: 1,
    model: "test",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: text,
          reasoning: "private reasoning",
        },
        finish_reason: finish,
      },
    ],
    usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
  });
}

function provider(responses: Response[]) {
  process.env.GROQ_API_KEY = "test-only";
  const calls: string[] = [];
  mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    if (String(url).includes("api.groq.com")) {
      calls.push(JSON.parse(String(init.body)).model);
      const response = responses.shift();
      assert.ok(response, "Unexpected provider retry");
      return response;
    }
    if (String(url).endsWith("/sql")) {
      return Response.json({
        fields: [{ name: "attempts", dataTypeID: 23 }],
        rows: [[1]],
        rowCount: 1,
        command: "INSERT",
      });
    }
    throw new Error("Unexpected network request in test");
  });
  return calls;
}
const question = [{ role: "user" as const, content: "Who is Arjun?" }];
const signal = () => AbortSignal.timeout(5000);
function request(query: string) {
  process.env.POSTGRES_URL = "postgresql://test:test@db.example.test/test";
  delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  return new Request("http://localhost/api/chat", {
    method: "POST",
    body: JSON.stringify({
      messages: [
        { id: "test", role: "user", parts: [{ type: "text", text: query }] },
      ],
    }),
  });
}

test("long conversations omit reasoning and stay below the body byte limit", () => {
  const messages: UIMessage[] = Array.from({ length: 101 }, (_, i) => ({
    id: String(i),
    role: i % 2 ? "assistant" : "user",
    parts: [
      { type: "reasoning", text: "hidden", state: "done" },
      { type: "text", text: "😀".repeat(1000) },
    ],
  }));
  const recent = chatHistory(messages);
  assert.ok(recent.length <= 6);
  assert.equal(recent.at(-1)?.id, "100");
  assert.ok(
    new TextEncoder().encode(JSON.stringify({ messages: recent })).length <
      24000,
  );
  assert.ok(chatRequest.safeParse({ messages: recent }).success);
  assert.ok(
    recent.every((m) => m.parts.length === 1 && m.parts[0].type === "text"),
  );
});

test("older assistant reasoning is accepted but never sent back to the model", () => {
  const parsed = chatRequest.parse({
    messages: [
      { id: "1", role: "user", parts: [{ type: "text", text: "hello" }] },
      {
        id: "2",
        role: "assistant",
        parts: [
          { type: "step-start" },
          { type: "reasoning", text: "hidden" },
          { type: "text", text: "hi" },
        ],
      },
      { id: "3", role: "user", parts: [{ type: "text", text: "more?" }] },
    ],
  });
  assert.ok(
    boundedHistory(parsed.messages).every((m) =>
      m.parts.every((p) => p.type === "text"),
    ),
  );
});

test("reasoning-only output falls back to another Groq model", async () => {
  const calls = provider([
    completion("", "length"),
    completion("A complete answer."),
  ]);
  assert.equal(
    await generateChatAnswer(question, "context", signal()),
    "A complete answer.",
  );
  assert.equal(calls.length, 2);
  assert.equal(calls[1], "openai/gpt-oss-20b");
});

test("truncated answers are not treated as success", async () => {
  provider([completion("unfinished", "length"), completion("finished")]);
  assert.equal(
    await generateChatAnswer(question, "context", signal()),
    "finished",
  );
});

test("provider outages get one bounded fallback", async () => {
  const calls = provider([
    Response.json({ error: { message: "unavailable" } }, { status: 503 }),
    completion("recovered"),
  ]);
  assert.equal(
    await generateChatAnswer(question, "context", signal()),
    "recovered",
  );
  assert.equal(calls.length, 2);
});

test("invalid credentials do not trigger another provider request", async () => {
  const calls = provider([
    Response.json({ error: { message: "invalid key" } }, { status: 401 }),
  ]);
  await assert.rejects(
    generateChatAnswer(question, "context", signal()),
    ChatGenerationError,
  );
  assert.equal(calls.length, 1);
});

test("rate limits return HTTP 429 with Retry-After instead of HTTP 200", async () => {
  provider(
    Array.from({ length: 2 }, () =>
      Response.json(
        { error: { message: "quota" } },
        { status: 429, headers: { "retry-after": "90" } },
      ),
    ),
  );
  const response = await POST(request("quota test"));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "90");
});

test("empty answers return HTTP 503 instead of an empty successful stream", async () => {
  provider([completion(""), completion("")]);
  assert.equal((await POST(request("empty test"))).status, 503);
});

test("successful UI streams contain only answer text and cache the completed answer", async () => {
  const calls = provider([completion("Arjun builds AI tools.")]);
  const response = await POST(request("success test"));
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.ok(body.includes('"type":"text-delta"'));
  assert.ok(body.includes("Arjun builds AI tools."));
  assert.ok(body.includes('"type":"finish"'));
  assert.ok(!body.includes("private reasoning"));
  assert.equal((await POST(request("success test"))).status, 200);
  assert.equal(calls.length, 1);
});

test("aborted requests never call Groq", async () => {
  const calls = provider([]);
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    generateChatAnswer(question, "context", controller.signal),
  );
  assert.equal(calls.length, 0);
});

test("the browser SDK reconstructs a complete assistant message from the route", async () => {
  provider([completion("A visible answer.")]);
  const transport = new DefaultChatTransport({
    fetch: async () => POST(request("client protocol test")),
  });
  const stream = await transport.sendMessages({
    trigger: "submit-message",
    chatId: "test",
    messageId: undefined,
    messages: [],
    abortSignal: signal(),
  });
  let final: UIMessage | undefined;
  for await (const message of readUIMessageStream({
    stream,
    terminateOnError: true,
  }))
    final = message;
  assert.equal(final?.role, "assistant");
  assert.equal(final?.parts.length, 1);
  assert.equal(final?.parts[0].type, "text");
  if (final?.parts[0].type === "text") {
    assert.equal(final.parts[0].text, "A visible answer.");
    assert.equal(final.parts[0].state, "done");
  }
});
