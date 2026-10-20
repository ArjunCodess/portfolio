import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";
import { findRelevantContent, buildContext } from "@/lib/ai/embedding";
import { CHAT_MODEL } from "@/lib/ai/config";
import {
  ChatGenerationError,
  generateChatAnswer,
} from "@/lib/ai/chat-generation";
import {
  boundedHistory,
  chatRequest,
  ChatLimitError,
} from "@/lib/ai/chat-policy";
import { reserveChatBudget } from "@/lib/ai/chat-budget";

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
      return Response.json({ error: "Invalid origin" }, { status: 403 });
    if (Number(req.headers.get("content-length")) > 24_000)
      return Response.json({ error: "Request too large" }, { status: 413 });
    const raw = await req.text();
    if (new TextEncoder().encode(raw).length > 24_000)
      return Response.json({ error: "Request too large" }, { status: 413 });
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const parsed = chatRequest.safeParse(body);
    if (!parsed.success)
      return Response.json(
        { error: "Send a text question of at most 2,000 characters." },
        { status: 400 },
      );
    const messages = boundedHistory(parsed.data.messages);
    const query = messages.at(-1)!.parts[0].text.trim();
    if (!query)
      return Response.json(
        { error: "Please enter a question." },
        { status: 400 },
      );
    if (!process.env.GROQ_API_KEY)
      return Response.json(
        {
          error:
            "Chat is temporarily unavailable. Please contact Arjun directly.",
        },
        { status: 503 },
      );

    // Only standalone questions are cached; follow-ups depend on conversation.
    const key =
      messages.length === 1 ? `${CHAT_MODEL}:${query.toLowerCase()}` : null;
    const cached = key ? answers.get(key) : undefined;
    if (cached && cached.expires > Date.now())
      return answerResponse(cached.text);
    const signal = AbortSignal.any([req.signal, AbortSignal.timeout(45_000)]);
    await reserveChatBudget(req, signal);
    const context = buildContext(
      await findRelevantContent(query, 4, false, signal),
    );
    const text = await generateChatAnswer(
      await convertToModelMessages(messages),
      context,
      signal,
    );
    if (key) {
      if (answers.size >= 100) answers.delete(answers.keys().next().value!);
      answers.set(key, { text, expires: Date.now() + 3_600_000 });
    }
    return answerResponse(text);
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
      "Chat unavailable:",
      error instanceof Error ? error.name : "unknown error",
    );
    return Response.json(
      {
        error:
          "Chat is temporarily unavailable. Please contact Arjun directly.",
      },
      { status: 503 },
    );
  }
}
