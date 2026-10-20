import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";
import { CHAT_MODEL } from "@/lib/ai/config";
import {
  ChatGenerationError,
  streamChatAnswer,
} from "@/lib/ai/chat-generation";
import {
  boundedHistory,
  chatRequest,
  ChatLimitError,
} from "@/lib/ai/chat-policy";
import { reserveChatBudget } from "@/lib/ai/chat-budget";
import {
  contextSources,
  planRetrieval,
  retrieveChatContext,
} from "@/lib/ai/chat-retrieval";
import { getKnowledgeChunks, getKnowledgeHash } from "@/lib/ai/knowledge";
import { CHAT_PROMPT_VERSION } from "@/lib/ai/chat-prompt";
import { lowercaseProse } from "@/lib/ai/chat-output";

export const runtime = "nodejs";
export const maxDuration = 60;
const answers = new Map<string, { text: string; expires: number }>();

function answerResponse(text: string) {
  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute({ writer }) {
        writer.write({ type: "start", messageId: crypto.randomUUID() });
        writer.write({ type: "text-start", id: "cached" });
        writer.write({ type: "text-delta", id: "cached", delta: text });
        writer.write({ type: "text-end", id: "cached" });
        writer.write({ type: "finish", finishReason: "stop" });
      },
    }),
  });
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin");
    if (origin && origin !== new URL(req.url).origin)
      return Response.json({ error: "invalid origin" }, { status: 403 });
    if (Number(req.headers.get("content-length")) > 24_000)
      return Response.json({ error: "request too large" }, { status: 413 });
    const raw = await req.text();
    if (new TextEncoder().encode(raw).length > 24_000)
      return Response.json({ error: "request too large" }, { status: 413 });
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return Response.json({ error: "invalid json" }, { status: 400 });
    }
    const parsed = chatRequest.safeParse(body);
    if (!parsed.success)
      return Response.json(
        { error: "send a text question of at most 2,000 characters." },
        { status: 400 },
      );
    const messages = boundedHistory(parsed.data.messages);
    const query = messages.at(-1)!.parts[0].text.trim();
    if (!query)
      return Response.json(
        { error: "please enter a question." },
        { status: 400 },
      );
    if (!process.env.GROQ_API_KEY)
      return Response.json(
        {
          error:
            "chat is temporarily unavailable. please contact arjun directly.",
        },
        { status: 503 },
      );

    // follow-ups depend on conversation and must not share cached answers.
    const key =
      messages.length === 1
        ? `${CHAT_MODEL}:${CHAT_PROMPT_VERSION}:${getKnowledgeHash(getKnowledgeChunks())}:${query}`
        : null;
    const cached = key ? answers.get(key) : undefined;
    if (cached && cached.expires > Date.now())
      return answerResponse(cached.text);
    const signal = AbortSignal.any([req.signal, AbortSignal.timeout(45_000)]);
    await reserveChatBudget(req, signal);
    const plan = planRetrieval(messages);
    if (plan.clarification) return answerResponse(plan.clarification);
    if (/^(hi|hello|hey)[!.\s]*$/i.test(query))
      return answerResponse(
        "hi, i'm arjun's portfolio assistant. ask me about his projects, research, or background.",
      );
    const context = await retrieveChatContext(plan, signal);
    const answer = lowercaseProse(
      streamChatAnswer(await convertToModelMessages(messages), context, signal),
    );
    // wait for actual text so preflight failures retain their http status.
    const first = await answer.next();
    if (first.done)
      throw new ChatGenerationError(
        "chat couldn't complete an answer. please try again.",
        503,
      );
    return createUIMessageStreamResponse({
      stream: createUIMessageStream({
        onError: (error) =>
          error instanceof ChatGenerationError
            ? error.message
            : "the answer was interrupted. please try again.",
        async execute({ writer }) {
          const id = crypto.randomUUID();
          writer.write({ type: "start", messageId: crypto.randomUUID() });
          writer.write({ type: "text-start", id });
          let text = first.value;
          writer.write({ type: "text-delta", id, delta: first.value });
          try {
            for await (const delta of answer) {
              text += delta;
              writer.write({ type: "text-delta", id, delta });
            }
            signal.throwIfAborted();
            const missingSources = contextSources(context, text).filter(
              (source) => !text.includes(source.url),
            );
            if (missingSources.length) {
              const delta = `\n\nsources: ${missingSources.map((source) => `[${source.label}](${source.url})`).join(", ")}`;
              text += delta;
              writer.write({ type: "text-delta", id, delta });
            }
            if (key) {
              if (answers.size >= 100)
                answers.delete(answers.keys().next().value!);
              answers.set(key, { text, expires: Date.now() + 3_600_000 });
            }
            writer.write({ type: "text-end", id });
            writer.write({ type: "finish", finishReason: "stop" });
          } finally {
            await answer.return();
          }
        },
      }),
    });
  } catch (error) {
    if (error instanceof ChatGenerationError)
      return Response.json(
        { error: error.message },
        {
          status: error.status,
          headers: error.retryAfter
            ? { "Retry-After": error.retryAfter }
            : undefined,
        },
      );
    if (error instanceof ChatLimitError)
      return Response.json(
        { error: error.message },
        { status: 429, headers: { "Retry-After": String(error.retryAfter) } },
      );
    console.error(
      "chat unavailable:",
      error instanceof Error ? error.name : "unknown error",
    );
    return Response.json(
      {
        error:
          "chat is temporarily unavailable. please contact arjun directly.",
      },
      { status: 503 },
    );
  }
}
