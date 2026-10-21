"use client";

import * as React from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { chatHistory } from "@/lib/ai/chat-history";
import { chatFollowups } from "@/lib/ai/chat-followups";
import { useState } from "react";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const SUGGESTED_QUESTIONS = [
  "Where was NGTA accepted?",
  "Compare MINTS and PRISM",
  "Which projects use Python?",
  "What did you win at Xavier?",
  'What is "chain reaction." about?',
];

const chatTransport = new DefaultChatTransport({
  prepareSendMessagesRequest: ({ messages }) => ({
    body: {
      messages: chatHistory(messages),
    },
  }),
});

function chatErrorMessage(error: Error) {
  try {
    const body: unknown = JSON.parse(error.message);
    if (
      body &&
      typeof body === "object" &&
      "error" in body &&
      typeof body.error === "string"
    ) {
      return body.error;
    }
  } catch {
    // Network and stream errors may already be plain text.
  }
  return error.message || "Chat is unavailable. Please try again.";
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { messages, sendMessage, regenerate, status, error } = useChat({
    transport: chatTransport,
  });

  const { toggleSidebar, isMobile } = useSidebar();
  const [input, setInput] = useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const isLoading = status === "streaming" || status === "submitted";
  const followups = chatFollowups(messages);

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    if (!isLoading) sendMessage({ text: question });
  };

  // avoid restarting smooth scrolling for every streamed token.
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: isLoading ? "auto" : "smooth",
    });
  }, [messages, isLoading]);

  return (
    <Sidebar
      side="right"
      variant="sidebar"
      collapsible="offcanvas"
      className="border-none h-full z-50"
      {...props}
    >
      <SidebarContent className="flex flex-col h-full border-l">
        {/* Header */}
        <div className="flex items-center justify-end p-4 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full h-8 w-8 hover:bg-muted"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col h-full overflow-y-auto p-6">
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl text-foreground font-semibold">
                    Ask me anything
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-[350px] mx-auto">
                    I&apos;m Arjun&apos;s portfolio assistant. Ask me about his
                    projects, skills, and experience.
                  </p>
                </div>

                <div className="w-full space-y-8 pt-4">
                  <h3 className="text-xs font-semibold text-muted-foreground tracking-wider text-center mb-3">
                    Suggested questions
                  </h3>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="cursor-pointer text-foreground/90 w-full text-left px-4 py-3 text-sm rounded-xl bg-muted border border-border flex items-center justify-between group transition-opacity hover:opacity-60"
                      >
                        <span className="min-w-0 flex-1">{question}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message: UIMessage) => {
                const textContent =
                  message.parts
                    ?.filter(
                      (part: {
                        type: string;
                      }): part is { type: "text"; text: string } =>
                        part.type === "text",
                    )
                    .map((part: { type: "text"; text: string }) => part.text)
                    .join("") || "";

                if (message.role === "assistant" && !textContent.trim())
                  return null;

                return (
                  <ChatMessage
                    key={message.id}
                    role={message.role as "user" | "assistant"}
                    content={textContent}
                    isStreaming={
                      isLoading &&
                      message.id === messages[messages.length - 1]?.id &&
                      message.role === "assistant"
                    }
                  />
                );
              })}

              {/* Loading indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span
                        className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex justify-center">
                  <div className="bg-destructive/10 text-destructive rounded-lg px-4 py-2 text-xs">
                    {chatErrorMessage(error)}
                    <button
                      type="button"
                      onClick={() => regenerate()}
                      disabled={isLoading}
                      className="ml-2 underline disabled:opacity-50"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="min-w-0 p-4 shrink-0">
          {messages.length > 0 && (
            <div
              key={followups.join("|")}
              role="group"
              aria-label="Suggested follow-up questions"
              className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:thin]"
            >
              {followups.map((question) => (
                <button
                  key={question}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="min-h-9 shrink-0 rounded-full border border-border bg-muted/50 px-3 py-2 text-xs text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
