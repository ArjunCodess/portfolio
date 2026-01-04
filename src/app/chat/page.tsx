'use client';

import { useChat, type UIMessage } from '@ai-sdk/react';
import { useState } from 'react';
import { ChatMessage } from '@/components/chat/chat-message';
import { ChatInput } from '@/components/chat/chat-input';
import BlurFade from '@/components/magicui/blur-fade';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const BLUR_FADE_DELAY = 0.04;

const SUGGESTED_QUESTIONS = [
  "What's your biggest project?",
  "Tell me about Pilot",
  "What did you earn in 2025?",
  "What certifications do you have?",
  "What's your tech stack?",
];

export default function ChatPage() {
  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat();

  const [input, setInput] = useState('');

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

  return (
    <main className="flex flex-col min-h-[100dvh] z-10">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <h1 className="text-xl font-bold">Chat with ArjunCodess AI</h1>
          </div>
        </div>
      </BlurFade>

      {/* Chat messages area */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex-1 min-h-[400px] max-h-[60vh] overflow-y-auto rounded-lg border bg-card p-4 mb-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <MessageCircle className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Hi! I&apos;m Arjun&apos;s AI assistant.</p>
              <p className="text-sm mb-6">
                Ask me anything about Arjun&apos;s projects, skills, achievements, or experience!
              </p>

              {/* Suggested questions */}
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-3 py-1.5 text-xs rounded-full border bg-background hover:bg-accent transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
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
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex justify-center">
                  <div className="bg-destructive/10 text-destructive rounded-lg px-4 py-2 text-sm">
                    Something went wrong. Please try again.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </BlurFade>

      {/* Input area */}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSendMessage}
          isLoading={isLoading}
        />
        <p className="text-xs text-muted-foreground text-center mt-3">
          Powered by RAG + Gemini 3 Flash. Responses are based on Arjun&apos;s knowledge base.
        </p>
      </BlurFade>
    </main>
  );
}
