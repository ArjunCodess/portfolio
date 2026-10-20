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
import { reserveChatBudget } from "../src/lib/ai/chat-budget";
import { ChatLimitError } from "../src/lib/ai/chat-policy";
import { lowercaseProse } from "../src/lib/ai/chat-output";

const originalEnv = { ...process.env };
afterEach(() => {
  mock.restoreAll();
  process.env = { ...originalEnv };
});

function completion(text: string, finish = "stop") {
  return new Response(
    [
      event({ reasoning: "private reasoning" }),
      event({ content: text }),
      event({}, finish),
      "data: [DONE]\n\n",
    ].join(""),
    { headers: { "content-type": "text/event-stream" } },
  );
}

function event(delta: Record<string, string>, finish: string | null = null) {
  return `data: ${JSON.stringify({ id: "test", created: 1, model: "test", choices: [{ index: 0, delta, finish_reason: finish }] })}\n\n`;
}

function provider(responses: Response[], databaseCalls: string[] = []) {
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
      databaseCalls.push(String(init.body));
      const params = JSON.parse(String(init.body)).params as string[];
      const limits = params
        .map((param) => {
          try {
            return JSON.parse(param);
          } catch {
            return null;
          }
        })
        .find(
          (param) =>
            param &&
            typeof param === "object" &&
            Object.keys(param).some((key) => key.startsWith("global:")),
        );
      return Response.json({
        fields: [{ name: "key", dataTypeID: 25 }],
        rows: Object.keys(limits || {}).map((key) => [key]),
        rowCount: 4,
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

test("lowercase output preserves urls across every possible chunk boundary", async () => {
  const original =
    "NGTA: [GitHub](https://github.com/ArjunCodess/NGTA) and PRISM. https://Example.com/CaseSensitive";
  const expected =
    "ngta: [github](https://github.com/ArjunCodess/NGTA) and prism. https://Example.com/CaseSensitive";
  for (let split = 0; split < original.length; split++) {
    async function* input() {
      yield original.slice(0, split);
      yield original.slice(split);
    }
    let answer = "";
    for await (const delta of lowercaseProse(input())) answer += delta;
    assert.equal(answer, expected, `boundary ${split}`);
  }
});

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

test(
  "the route emits text before the provider finishes",
  { timeout: 3000 },
  async () => {
    const encoder = new TextEncoder();
    let upstream!: ReadableStreamDefaultController<Uint8Array>;
    const response = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          upstream = controller;
          controller.enqueue(encoder.encode(event({ content: "first words" })));
        },
      }),
      { headers: { "content-type": "text/event-stream" } },
    );
    provider([response]);
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const result = await Promise.race([
        POST(request("incremental stream test")),
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () => reject(new Error("route buffered the answer")),
            1000,
          );
        }),
      ]);
      const reader = result.body!.getReader();
      let visible = "";
      while (!visible.includes("first words")) {
        const part = await reader.read();
        assert.ok(!part.done);
        visible += new TextDecoder().decode(part.value);
      }
      assert.ok(!visible.includes('"type":"finish"'));
      upstream.enqueue(
        encoder.encode(
          event({ content: " finished" }) +
            event({}, "stop") +
            "data: [DONE]\n\n",
        ),
      );
      upstream.close();
      while (!(await reader.read()).done) {
        /* drain the completed stream */
      }
    } finally {
      clearTimeout(timer);
    }
  },
);

test("interrupted route streams are errors and never populate the answer cache", async () => {
  const calls = provider([
    completion("partial", "length"),
    completion("complete"),
  ]);
  const first = await POST(request("partial cache test"));
  const body = await first.text();
  assert.ok(body.includes('"type":"error"'));
  assert.ok(!body.includes('"finishReason":"stop"'));
  assert.ok(
    (await (await POST(request("partial cache test"))).text()).includes(
      "complete",
    ),
  );
  assert.equal(calls.length, 2);
});

test("all quota reservations use one database request", async () => {
  const databaseCalls: string[] = [];
  provider([], databaseCalls);
  await reserveChatBudget(request("quota batching"), signal());
  assert.equal(databaseCalls.length, 1);
  assert.ok(databaseCalls[0].includes("global:minute:"));
  assert.ok(databaseCalls[0].includes("global:day:"));
  assert.ok(databaseCalls[0].includes("visitor:"));
});

test("denied quota reservations stop generation", async () => {
  process.env.POSTGRES_URL = "postgresql://test:test@db.example.test/test";
  let requests = 0;
  mock.method(globalThis, "fetch", async () => {
    requests++;
    return Response.json({
      fields: [{ name: "key", dataTypeID: 25 }],
      rows: [],
      rowCount: 0,
      command: "INSERT",
    });
  });
  await assert.rejects(
    reserveChatBudget(new Request("http://localhost/api/chat"), signal()),
    ChatLimitError,
  );
  assert.equal(requests, 1);
});

test("greetings avoid embedding and generation calls", async () => {
  const calls = provider([]);
  const body = await (await POST(request("hello"))).text();
  assert.ok(body.includes("portfolio assistant"));
  assert.equal(calls.length, 0);
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

test("partial answers fail without appending another model's answer", async () => {
  const calls = provider([completion("unfinished", "length")]);
  await assert.rejects(
    generateChatAnswer(question, "context", signal()),
    /interrupted/,
  );
  assert.equal(calls.length, 1);
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
  assert.ok(body.includes("arjun builds ai tools."));
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
    assert.equal(final.parts[0].text, "a visible answer.");
    assert.equal(final.parts[0].state, "done");
  }
});
