import fs from "node:fs/promises";
import path from "node:path";
import {
  EMBEDDING_MODEL,
  EMBEDDING_DIMENSIONS,
  embedTexts,
  validateEmbedding,
} from "./config";
import {
  getKnowledgeChunks,
  rankLexically,
  type KnowledgeChunk,
} from "./knowledge";

type Index = {
  model: string;
  dimensions: number;
  chunks: (KnowledgeChunk & { embedding: number[] })[];
};
const queryCache = new Map<string, { value: number[]; expires: number }>();

export async function generateEmbedding(text: string): Promise<number[]> {
  const key = text.trim().toLowerCase();
  const cached = queryCache.get(key);
  if (cached && cached.expires > Date.now()) return cached.value;
  const [embedding] = await embedTexts([
    `task: search result | query: ${text}`,
  ]);
  if (queryCache.size >= 128)
    queryCache.delete(queryCache.keys().next().value!);
  queryCache.set(key, { value: embedding, expires: Date.now() + 3_600_000 });
  return embedding;
}

export async function findRelevantContent(query: string, limit = 4) {
  const current = getKnowledgeChunks();
  try {
    const index: Index = JSON.parse(
      await fs.readFile(
        path.join(process.cwd(), "src/data/embeddings.json"),
        "utf8",
      ),
    );
    if (
      index.model !== EMBEDDING_MODEL ||
      index.dimensions !== EMBEDDING_DIMENSIONS ||
      JSON.stringify(
        index.chunks.map(({ id, source, content }) => ({
          id,
          source,
          content,
        })),
      ) !== JSON.stringify(current)
    ) {
      throw new Error("Embedding index is stale; run pnpm kb:generate");
    }
    const queryEmbedding = await generateEmbedding(query);
    return index.chunks
      .map((chunk) => {
        const embedding = validateEmbedding(chunk.embedding);
        return {
          ...chunk,
          similarity: embedding.reduce(
            (sum, n, i) => sum + n * queryEmbedding[i],
            0,
          ),
        };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  } catch (error) {
    // The small, curated corpus remains available if the inference host sleeps.
    console.warn(
      "Semantic retrieval unavailable; using keyword retrieval:",
      error instanceof Error ? error.message : "unknown error",
    );
    return rankLexically(query, current)
      .filter((chunk) => chunk.similarity > 0)
      .slice(0, limit);
  }
}

export function buildContext(
  chunks: { content: string; source: string }[],
): string {
  return chunks
    .map((chunk) => `[${chunk.source}]\n${chunk.content}`)
    .join("\n\n")
    .slice(0, 5200);
}
