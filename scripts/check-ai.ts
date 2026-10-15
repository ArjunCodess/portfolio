import dotenv from "dotenv";
import assert from "node:assert/strict";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import {
  findRelevantContent,
  generateEmbedding,
  buildContext,
} from "../src/lib/ai/embedding";
import { CHAT_MODEL } from "../src/lib/ai/config";

dotenv.config({ path: ".env.local", quiet: true });
async function main() {
  assert.ok(
    process.env.EMBEDDING_SERVICE_URL,
    "Set EMBEDDING_SERVICE_URL for live model verification",
  );
  const vector = await generateEmbedding("What did Arjun research in MINTS?");
  assert.equal(vector.length, 768);
  for (const [query, expected] of [
    ["Which conferences accepted NGTA?", "NGTA"],
    ["Where was MINTS submitted?", "MINTS"],
    ["Who was Arjun's teammate in Hidden Prompt?", "Hidden Prompt"],
    ["What did Arjun write about Lodha Genius?", "Lodha"],
    ["Who is Pilot's CMO?", "Sai"],
    ["How many journal pages did Arjun write in 2025?", "39 journal pages"],
    ["Which school subject did Arjun fail in 2025?", "history"],
  ]) {
    const chunks = await findRelevantContent(query);
    assert.ok(
      chunks.some((c) => c.content.includes(expected)),
      `Retrieval missed ${expected}`,
    );
    console.log(`Retrieval passed: ${query}`);
  }
  const { text } = await generateText({
    model: google(CHAT_MODEL),
    system: `Answer only from this context, in one sentence: ${buildContext(await findRelevantContent("Where was MINTS submitted?"))}`,
    prompt:
      "Where was MINTS submitted? Distinguish submission from acceptance.",
    maxOutputTokens: 100,
    maxRetries: 0,
    providerOptions: {
      google: { thinkingConfig: { thinkingLevel: "minimal" } },
    },
  });
  assert.match(text, /GLBIO\s*2027/i);
  assert.match(text, /submit/i);
  console.log(`${CHAT_MODEL}: ${text}`);
}
main().catch((error) => {
  console.error(
    error instanceof Error ? error.message : "AI verification failed",
  );
  process.exitCode = 1;
});
