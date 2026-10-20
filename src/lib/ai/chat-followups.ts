import type { UIMessage } from "ai";

const defaults = [
  "Which projects use Python?",
  "What research has Arjun worked on?",
  "What did Arjun win at Xavier?",
  "What is Arjun's experience?",
  "How can I contact Arjun?",
  "What does Arjun write about?",
];

export function chatFollowups(messages: UIMessage[]): string[] {
  const questions = messages
    .filter((message) => message.role === "user")
    .map((message) =>
      message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join(" "),
    );
  const latest = questions.at(-1) || "";
  const projectNames = [
    "NGTA",
    "MINTS",
    "PRISM",
    "PSYCON",
    "HYDRA-ccRCC",
    "MEN2 Predictor",
    "WebCrawlAI",
    "Analyzr",
  ];
  const match = latest.match(
    /\b(NGTA|MINTS|PRISM|PSYCON|HYDRA-ccRCC|MEN2 Predictor|WebCrawlAI|Analyzr)\b/i,
  )?.[0];
  const project = projectNames.find(
    (name) => name.toLowerCase() === match?.toLowerCase(),
  );
  let candidates = defaults;
  if (project) {
    candidates = [
      `What problem does ${project} solve?`,
      `Which technologies does ${project} use?`,
      `What is the current status of ${project}?`,
      `What are the limitations of ${project}?`,
    ];
  } else if (/\b(research|paper|accepted|published)\b/i.test(latest)) {
    candidates = [
      "Where was NGTA accepted?",
      "Compare MINTS and PRISM",
      "What does PRISM predict?",
    ];
  } else if (/\b(write|writing|blog|chain reaction)\b/i.test(latest)) {
    candidates = [
      'What is "chain reaction." about?',
      "Where does Arjun publish his writing?",
      "What technical topics does Arjun write about?",
    ];
  }
  const asked = new Set(
    questions.map((question) =>
      question.toLowerCase().replace(/[^a-z0-9]/g, ""),
    ),
  );
  const fresh = [...new Set([...candidates, ...defaults])]
    .filter(
      (question) =>
        !asked.has(question.toLowerCase().replace(/[^a-z0-9]/g, "")),
    )
    .slice(0, 3);
  return [...new Set([...fresh, ...defaults])].slice(0, 3);
}
