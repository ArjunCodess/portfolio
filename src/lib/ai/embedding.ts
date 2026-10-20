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
  signal?: AbortSignal,
): Promise<number[]> {
  signal?.throwIfAborted();
  const key = text.trim().toLowerCase();
  const cached = queryCache.get(key);
  if (cached && cached.expires > Date.now()) return cached.value;
  const [embedding] = await embedTexts(
    [`task: search result | query: ${text}`],
    timeoutMs,
    signal,
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
  signal?.throwIfAborted();
  const current = getKnowledgeChunks();
  const lexical = rankLexically(query, current)
    .filter((chunk) => chunk.similarity > 0)
    .slice(0, 24);
  try {
    if (!process.env.POSTGRES_URL)
      throw new Error("POSTGRES_URL is required for semantic retrieval");
    const queryEmbedding = await generateEmbedding(query, 4000, signal);
    const db = neon(process.env.POSTGRES_URL, {
      fetchOptions: {
        signal: signal
          ? AbortSignal.any([signal, AbortSignal.timeout(3000)])
          : AbortSignal.timeout(3000),
      },
    });
    const vector = `[${queryEmbedding.join(",")}]`;
    const rows = await db`
      SELECT metadata->>'chunkId' AS id, source, content,
        1 - (embedding <=> ${vector}::vector) AS similarity
      FROM kb_documents
      WHERE metadata->>'embeddingModel' = ${EMBEDDING_MODEL}
        AND metadata->>'embeddingProfile' = ${EMBEDDING_PROFILE}
        AND metadata->>'dimensions' = ${String(EMBEDDING_DIMENSIONS)}
        AND metadata->>'sourceHash' = ${getKnowledgeHash(current)}
      ORDER BY embedding <=> ${vector}::vector
      LIMIT 24`;
    if (!rows.length)
      throw new Error("Database index is stale; run pnpm kb:refresh");
    const semantic = rows as {
      id: string;
      source: string;
      content: string;
      similarity: number;
    }[];
    return fuseRankings(lexical, semantic).slice(0, limit);
  } catch (error) {
    signal?.throwIfAborted();
    if (requireSemantic) throw error;
    // The small, curated corpus remains available if the inference host sleeps.
    console.warn(
      "Semantic retrieval unavailable; using keyword retrieval:",
      error instanceof Error ? error.message : "unknown error",
    );
    return lexical.slice(0, limit);
  }
}

export function buildContext(
  chunks: { content: string; source: string }[],
  budget = 5200,
): string {
  const blocks: string[] = [];
  let remaining = budget;
  for (const chunk of chunks) {
    const block = `[${chunk.source}]\n${chunk.content}`;
    if (block.length + 2 > remaining) continue;
    blocks.push(block);
    remaining -= block.length + 2;
  }
  return blocks.join("\n\n");
}

export function fuseRankings<T extends { id: string }>(...rankings: T[][]) {
  const scores = new Map<string, { chunk: T; score: number }>();
  for (const ranking of rankings) {
    const seen = new Set<string>();
    ranking.forEach((chunk, index) => {
      if (seen.has(chunk.id)) return;
      seen.add(chunk.id);
      const previous = scores.get(chunk.id);
      scores.set(chunk.id, {
        chunk,
        score: (previous?.score || 0) + 1 / (60 + index + 1),
      });
    });
  }
  return [...scores.values()]
    .sort((a, b) => b.score - a.score)
    .map(({ chunk }) => chunk);
}
