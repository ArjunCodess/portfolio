import { neon } from "@neondatabase/serverless";
import {
  EMBEDDING_MODEL,
  EMBEDDING_PROFILE,
  EMBEDDING_DIMENSIONS,
  validateEmbedding,
} from "./config";
import { getKnowledgeHash, type KnowledgeChunk } from "./knowledge";

export type IndexedChunk = KnowledgeChunk & { embedding: number[] };

export async function replaceDatabaseEmbeddings(chunks: IndexedChunk[]) {
  if (!chunks.length)
    throw new Error(
      "Refusing to replace embeddings with an empty knowledge base",
    );
  const url = process.env.POSTGRES_URL;
  if (!url)
    throw new Error("POSTGRES_URL is required to refresh database embeddings");
  const sourceHash = getKnowledgeHash(chunks);
  const records = chunks.map((chunk) => ({
    content: chunk.content,
    source: chunk.source,
    embedding: `[${validateEmbedding(chunk.embedding).join(",")}]`,
    metadata: {
      chunkId: chunk.id,
      embeddingModel: EMBEDDING_MODEL,
      embeddingProfile: EMBEDDING_PROFILE,
      dimensions: EMBEDDING_DIMENSIONS,
      sourceHash,
    },
  }));
  const db = neon(url);
  await db`CREATE EXTENSION IF NOT EXISTS vector`;
  await db`CREATE TABLE IF NOT EXISTS kb_documents (
    id BIGSERIAL PRIMARY KEY, content TEXT NOT NULL, source TEXT NOT NULL,
    embedding vector(768) NOT NULL, metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  // Generate and validate the complete corpus before touching the live table.
  // DELETE and every INSERT commit together, so readers never see an empty or
  // partially rebuilt index, and a failure rolls the old embeddings back.
  const results = await db.transaction([
    db`DELETE FROM kb_documents`,
    db`INSERT INTO kb_documents (content, source, embedding, metadata)
       SELECT r.content, r.source, r.embedding::vector, r.metadata
       FROM jsonb_to_recordset(${JSON.stringify(records)}::jsonb)
       AS r(content text, source text, embedding text, metadata jsonb)
       RETURNING id`,
  ]);
  if (results[1].length !== chunks.length)
    throw new Error("Embedding row count did not match generated chunks");
  return { count: results[1].length, sourceHash };
}
