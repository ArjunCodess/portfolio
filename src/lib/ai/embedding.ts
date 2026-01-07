/**
 * Embedding utilities for RAG
 *
 * Uses Vercel AI SDK with Google Gemini for query embedding generation
 * and performs vector similarity search in PostgreSQL.
 */

import { embed } from "ai";
import { google } from "@ai-sdk/google";
import { sql } from "@vercel/postgres";
import { formatEmbedding } from "../utils";

/**
 * Generate embedding for a single text query using Vercel AI SDK
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: google.embedding("text-embedding-004"),
    value: text,
  });

  return embedding;
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
