import { embedMany } from "ai";
import { google } from "@ai-sdk/google";

export const EMBEDDING_MODEL = "gemini-embedding-2";
export const EMBEDDING_DIMENSIONS = 768;
export const EMBEDDING_PROFILE = `${EMBEDDING_MODEL}:768:search-v1`;
export const CHAT_MODEL =
  process.env.GEMINI_CHAT_MODEL || "gemini-flash-lite-latest";

export function validateEmbedding(value: unknown): number[] {
  if (
    !Array.isArray(value) ||
    value.length !== EMBEDDING_DIMENSIONS ||
    !value.every((n) => typeof n === "number" && Number.isFinite(n))
  ) {
    throw new Error(
      "Expected a finite 768-dimensional Gemini embedding vector",
    );
  }
  const norm = Math.hypot(...value);
  if (norm === 0) throw new Error("Embedding vector cannot be zero");
  return value.map((n) => n / norm);
}

export async function embedTexts(
  texts: string[],
  timeoutMs = 20_000,
): Promise<number[][]> {
  if (
    !texts.length ||
    texts.length > 8 ||
    texts.some((text) => !text.trim() || text.length > 8000)
  )
    throw new Error(
      "Expected 1 to 8 non-empty embedding inputs, each at most 8,000 characters",
    );
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is required for embeddings");
  // Gemini Embedding 2 expects task prefixes in the text, not a taskType option.
  const { embeddings } = await embedMany({
    model: google.embedding(EMBEDDING_MODEL),
    values: texts,
    dimensions: EMBEDDING_DIMENSIONS,
    maxRetries: 0,
    maxParallelCalls: 1,
    abortSignal: AbortSignal.timeout(timeoutMs),
  });
  if (embeddings.length !== texts.length)
    throw new Error("Embedding batch mismatch");
  return embeddings.map(validateEmbedding);
}
