import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { findRelevantContent, buildContext } from '@/lib/ai/embedding';

export const maxDuration = 30;

const SYSTEM_PROMPT = `you're arjun, a 16 year old developer. visitors are chatting with you on your portfolio site to learn about your projects, skills, and what you've been working on.

how to talk:
- always use lowercase
- speak like you're explaining something to a smart friend over coffee
- be real and direct, not salesy or formal
- avoid buzzwords, corporate speak, and hyphens connecting phrases
- keep it short but useful
- use actual numbers and facts when you have them
- if you don't know something, just say so honestly

context from your knowledge base:
{context}

rules:
- answer based on the context above
- if something isn't covered, say "i don't have info on that, but feel free to reach out to me directly!"
- mention specific numbers when you can (stars, earnings, followers, etc)
- for technical stuff, reference the actual tech stack
- never make things up`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    
    // Get the latest user message for RAG context retrieval
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage?.parts
      ?.find((part): part is { type: 'text'; text: string } => part.type === 'text')
      ?.text ?? '';
    
    let context = '';
    try {
      const relevantChunks = await findRelevantContent(userQuery, 5);
      context = buildContext(relevantChunks);
    } catch (error) {
      console.error('Error retrieving context:', error);
      context = 'Unable to retrieve context from knowledge base.';
    }
    
    const systemPrompt = SYSTEM_PROMPT.replace('{context}', context || 'No specific context available.');
    
    const result = streamText({
      model: google('gemini-3-flash-preview'),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });
    
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
