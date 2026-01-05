/**
 * Embedding utilities for RAG
 *
 * Uses Xenova/all-MiniLM-L6-v2 for query embedding generation
 * and performs vector similarity search in PostgreSQL.
 */

import { sql } from "@vercel/postgres";
import { formatEmbedding } from "../utils";

// Cache for the embedding pipeline
let embeddingPipeline: any = null;

/**
 * Get or initialize the embedding pipeline
 */
async function getEmbeddingPipeline() {
  if (embeddingPipeline) {
    return embeddingPipeline;
  }

  // Dynamic import to avoid issues with SSR
  const { pipeline, env } = await import("@xenova/transformers");

  // Configure transformers.js
  env.cacheDir = "./.cache/transformers";
  env.allowLocalModels = true;

  embeddingPipeline = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
    {
      quantized: true,
    },
  );

  return embeddingPipeline;
}

/**
 * Generate embedding for a single text query
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const extractor = await getEmbeddingPipeline();

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data as Float32Array);
}

/**
 * Find relevant content from the knowledge base
 */
export async function findRelevantContent(
  query: string,
  limit: number = 5,
): Promise<
  {
    id: string;
    content: string;
    source: string;
    similarity: number;
  }[]
> {
  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query);
  const embeddingStr = formatEmbedding(queryEmbedding);

  // Perform similarity search using cosine distance
  const result = await sql`
    SELECT 
      id,
      content,
      source,
      1 - (embedding <=> ${embeddingStr}::vector) as similarity
    FROM kb_documents
    ORDER BY embedding <=> ${embeddingStr}::vector
    LIMIT ${limit}
  `;

  return result.rows.map((row) => ({
    id: String(row.id),
    content: row.content as string,
    source: row.source as string,
    similarity: Number(row.similarity),
  }));
}

/**
 * Build context string from retrieved chunks
 */
export function buildContext(
  chunks: { content: string; source: string; similarity: number }[],
): string {
  if (chunks.length === 0) {
    return "";
  }

  return chunks
    .map((chunk, i) => {
      const sourceLabel = chunk.source
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return `[Context ${i + 1} - From ${sourceLabel}]\n${chunk.content}`;
    })
    .join("\n\n");
}
