import { neon } from "@neondatabase/serverless";
import {
  EMBEDDING_MODEL,
  EMBEDDING_DIMENSIONS,
  EMBEDDING_PROFILE,
  embedTexts,
} from "./config";
import {
  getKnowledgeChunks,
  rankLexically,
  getKnowledgeHash,
} from "./knowledge";

const queryCache = new Map<string, { value: number[]; expires: number }>();

export async function generateEmbedding(
  text: string,
  timeoutMs = 20_000,
): Promise<number[]> {
  const key = text.trim().toLowerCase();
  const cached = queryCache.get(key);
  if (cached && cached.expires > Date.now()) return cached.value;
  const [embedding] = await embedTexts(
    [`task: search result | query: ${text}`],
    timeoutMs,
  );
  if (queryCache.size >= 128)
    queryCache.delete(queryCache.keys().next().value!);
  queryCache.set(key, { value: embedding, expires: Date.now() + 3_600_000 });
  return embedding;
}

export async function findRelevantContent(
  query: string,
  limit = 4,
  requireSemantic = false,
  signal?: AbortSignal,
) {
  const current = getKnowledgeChunks();
  try {
    if (!process.env.POSTGRES_URL)
      throw new Error("POSTGRES_URL is required for semantic retrieval");
    const queryEmbedding = await generateEmbedding(query, 4000);
    const db = neon(process.env.POSTGRES_URL, {
      fetchOptions: {
        signal: signal
          ? AbortSignal.any([signal, AbortSignal.timeout(3000)])
          : AbortSignal.timeout(3000),
      },
    });
    const vector = `[${queryEmbedding.join(",")}]`;
    // Exact project names and award aliases can be less reliable in dense
    // retrieval. Blend rare-term matches with cosine distance over the same
    // current database rows, without spending another model request.
    const lexical = rankLexically(query, current)
      .filter((chunk) => chunk.similarity > 0)
      .slice(0, 12);
    const maximum = lexical[0]?.similarity || 1;
    const boosts = JSON.stringify(
      Object.fromEntries(
        lexical.map((chunk) => [chunk.id, chunk.similarity / maximum]),
      ),
    );
    const rows = await db`
      SELECT metadata->>'chunkId' AS id, source, content,
        1 - (embedding <=> ${vector}::vector) AS similarity
      FROM kb_documents
      WHERE metadata->>'embeddingModel' = ${EMBEDDING_MODEL}
        AND metadata->>'embeddingProfile' = ${EMBEDDING_PROFILE}
        AND metadata->>'dimensions' = ${String(EMBEDDING_DIMENSIONS)}
        AND metadata->>'sourceHash' = ${getKnowledgeHash(current)}
      ORDER BY (1 - (embedding <=> ${vector}::vector)) +
        0.4 * COALESCE((${boosts}::jsonb ->> (metadata->>'chunkId'))::double precision, 0) DESC
      LIMIT ${Math.max(1, Math.min(12, limit))}`;
    if (!rows.length)
      throw new Error("Database index is stale; run pnpm kb:refresh");
    return rows as {
      id: string;
      source: string;
      content: string;
      similarity: number;
    }[];
  } catch (error) {
    if (requireSemantic) throw error;
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
