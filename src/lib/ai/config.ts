export const EMBEDDING_MODEL = "google/embeddinggemma-2";
export const EMBEDDING_DIMENSIONS = 768;
export const CHAT_MODEL =
  process.env.GEMINI_CHAT_MODEL || "gemini-flash-lite-latest";

export function validateEmbedding(value: unknown): number[] {
  if (
    !Array.isArray(value) ||
    value.length !== EMBEDDING_DIMENSIONS ||
    !value.every((n) => typeof n === "number" && Number.isFinite(n))
  ) {
    throw new Error(
      "Expected a finite 768-dimensional EmbeddingGemma 2 vector",
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
  const endpoint = process.env.EMBEDDING_SERVICE_URL;
  if (!endpoint) throw new Error("EMBEDDING_SERVICE_URL is not configured");
  const response = await fetch(`${endpoint.replace(/\/$/, "")}/embed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.EMBEDDING_SERVICE_TOKEN
        ? { Authorization: `Bearer ${process.env.EMBEDDING_SERVICE_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: texts }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok)
    throw new Error(`Embedding service returned ${response.status}`);
  const data = await response.json();
  if (
    data.model !== EMBEDDING_MODEL ||
    !Array.isArray(data.embeddings) ||
    data.embeddings.length !== texts.length
  ) {
    throw new Error("Embedding service model or batch mismatch");
  }
  return data.embeddings.map(validateEmbedding);
}
