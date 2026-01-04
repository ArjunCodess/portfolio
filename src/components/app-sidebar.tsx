'use client';

import * as React from "react"
import { useChat, type UIMessage } from '@ai-sdk/react';
import { useState } from 'react';
import { ChatMessage } from '@/components/chat/chat-message';
import { ChatInput } from '@/components/chat/chat-input';
import { ArrowRight, MessageCircle, X } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"


const SUGGESTED_QUESTIONS = [
  "Tell me about your MEN2 medical research.",
  "What is Pilot Ops?",
  "How did you build a community on DEV.to?",
  "What are your top open source projects?",
  "What were your key achievements in 2025?",
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat();

  const { toggleSidebar, isMobile } = useSidebar();
  const [input, setInput] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage({ text: question });
  };

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="rounded-full h-8 w-8 hover:bg-muted">
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
                  <h2 className="text-2xl text-foreground font-semibold">Hi, I&apos;m ArjunCodess AI 👋</h2>
                  <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
                    I can answer questions about Arjun&apos;s projects, skills, and experience.
                  </p>
                </div>

                <div className="w-full space-y-8 pt-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center mb-3">Ask me about...</h3>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-foreground/90 w-full text-left px-4 py-3 text-sm rounded-xl bg-muted border border-border flex items-center justify-between group transition-opacity hover:opacity-60"
                      >
                        <span>{question}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message: UIMessage) => {
                const textContent = message.parts
                  ?.filter((part: { type: string }): part is { type: 'text'; text: string } => part.type === 'text')
                  .map((part: { type: 'text'; text: string }) => part.text)
                  .join('') || '';

                return (
                  <ChatMessage
                    key={message.id}
                    role={message.role as 'user' | 'assistant'}
                    content={textContent}
                    isStreaming={isLoading && message.id === messages[messages.length - 1]?.id && message.role === 'assistant'}
                  />
                );
              })}

              {/* Loading indicator */}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex justify-center">
                  <div className="bg-destructive/10 text-destructive rounded-lg px-4 py-2 text-xs">
                    Something went wrong. Please try again.
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 shrink-0">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
