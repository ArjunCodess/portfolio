import type { UIMessage } from "ai";

// Send only the text used by the server, bounded independently of how many
// messages (or reasoning parts from an older deployment) remain in the UI.
export function chatHistory(messages: UIMessage[]) {
  const recent = messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant",
    )
    .map((message) => ({
      id: message.id,
      role: message.role,
      parts: [
        {
          type: "text" as const,
          text: message.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("")
            .slice(0, 2000),
        },
      ],
    }))
    .filter((message) => message.parts[0].text.trim())
    .slice(-6);
  const encoder = new TextEncoder();
  while (
    recent.length > 1 &&
    encoder.encode(JSON.stringify({ messages: recent })).length > 18_000
  ) {
    recent.shift();
  }
  while (recent[0]?.role === "assistant") recent.shift();
  return recent;
}
