import { APICallError, streamText, type ModelMessage } from "ai";
import { groq } from "@ai-sdk/groq";
import { CHAT_MODEL } from "./config";
import { portfolioSystemPrompt } from "./chat-prompt";

export class ChatGenerationError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly retryAfter?: string,
  ) {
    super(message);
  }
}

export async function* streamChatAnswer(
  messages: ModelMessage[],
  context: string,
  signal: AbortSignal,
) {
  const models = [
    CHAT_MODEL,
    CHAT_MODEL === "openai/gpt-oss-20b"
      ? "openai/gpt-oss-120b"
      : "openai/gpt-oss-20b",
  ];
  let lastError: unknown;
  for (const model of models) {
    signal.throwIfAborted();
    let visible = false;
    try {
      const result = streamText({
        model: groq(model),
        system: portfolioSystemPrompt(context),
        messages,
        maxOutputTokens: 2048,
        maxRetries: 0,
        onError: () => {},
        abortSignal: AbortSignal.any([signal, AbortSignal.timeout(18_000)]),
        providerOptions: {
          groq: { reasoningEffort: "low" },
        },
      });
      let finish: string | undefined;
      let leading = "";
      for await (const part of result.stream) {
        signal.throwIfAborted();
        if (part.type === "error") throw part.error;
        if (part.type === "abort") throw new Error("generation aborted");
        if (part.type === "finish") finish = part.finishReason;
        if (part.type === "text-delta") {
          const delta = visible ? part.text : leading + part.text;
          if (!visible && !delta.trim()) {
            leading = delta;
            continue;
          }
          if (delta) {
            visible = true;
            yield delta;
          }
        }
      }
      if (visible && finish === "stop") return;
      throw new Error(`incomplete generation: ${finish}`);
    } catch (error) {
      signal.throwIfAborted();
      lastError = error;
      console.warn("chat generation failed", {
        model,
        status: APICallError.isInstance(error) ? error.statusCode : undefined,
        name: error instanceof Error ? error.name : "unknown",
      });
      // never append a second answer after partial text.
      if (visible)
        throw new ChatGenerationError(
          "The answer was interrupted. Please try again.",
          503,
        );
      if (
        APICallError.isInstance(error) &&
        [400, 401, 403].includes(error.statusCode ?? 0)
      )
        break;
    }
  }
  if (APICallError.isInstance(lastError) && lastError.statusCode === 429) {
    throw new ChatGenerationError(
      "Chat is busy or its free quota is used up. Please try again later.",
      429,
      lastError.responseHeaders?.["retry-after"] || "60",
    );
  }
  throw new ChatGenerationError(
    "Chat couldn't complete an answer. Please try again.",
    503,
  );
}

export async function generateChatAnswer(
  messages: ModelMessage[],
  context: string,
  signal: AbortSignal,
) {
  let answer = "";
  for await (const delta of streamChatAnswer(messages, context, signal))
    answer += delta;
  return answer.trim();
}
