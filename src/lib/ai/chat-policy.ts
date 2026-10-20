import { z } from "zod";

const message = z
  .object({
    id: z.string().max(200),
    role: z.enum(["user", "assistant"]),
    parts: z
      .array(
        z.union([
          z.object({ type: z.literal("text"), text: z.string().max(8000) }),
          z.object({ type: z.literal("step-start") }),
          z.object({
            type: z.literal("reasoning"),
            text: z.string().max(16000),
          }),
        ]),
      )
      .min(1)
      .max(12),
  })
  .refine(
    (m) =>
      m.parts.filter((p) => p.type === "text").length === 1 &&
      (m.role === "assistant" ||
        m.parts.every((p) => p.type === "text" && p.text.length <= 2000)),
  );
export const chatRequest = z
  .object({ messages: z.array(message).min(1).max(40) })
  .refine(
    (body) => body.messages.at(-1)?.role === "user",
    "The last message must be a user question",
  );

export function boundedHistory(messages: z.infer<typeof message>[]) {
  const recent = messages.slice(-6);
  while (recent[0]?.role === "assistant") recent.shift();
  return recent.map((m) => ({
    ...m,
    parts: m.parts.filter((p) => p.type === "text"),
  }));
}

export class ChatLimitError extends Error {
  constructor(
    message: string,
    public readonly retryAfter = 60,
  ) {
    super(message);
  }
}
