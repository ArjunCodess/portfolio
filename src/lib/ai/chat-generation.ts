import { APICallError, generateText, type ModelMessage } from "ai";
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

export async function generateChatAnswer(
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
    try {
      const result = await generateText({
        model: groq(model),
        system: portfolioSystemPrompt(context),
        messages,
        maxOutputTokens: 2048,
        maxRetries: 0,
        abortSignal: AbortSignal.any([signal, AbortSignal.timeout(18_000)]),
        providerOptions: {
          groq: { reasoningEffort: "low" },
        },
      });
      // Reasoning can exhaust the output budget before any answer is produced.
      // Never cache or return an empty, truncated, or failed generation as success.
      if (result.text.trim() && result.finishReason === "stop") {
        return result.text.trim();
      }
      lastError = new Error(`Incomplete generation: ${result.finishReason}`);
      console.warn("Chat generation incomplete", {
        model,
        finishReason: result.finishReason,
        hasText: Boolean(result.text.trim()),
      });
    } catch (error) {
      lastError = error;
      console.warn("Chat generation failed", {
        model,
        status: APICallError.isInstance(error) ? error.statusCode : undefined,
        name: error instanceof Error ? error.name : "unknown",
      });
      // A different model cannot repair invalid credentials or a bad payload.
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
