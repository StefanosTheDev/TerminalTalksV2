// app/_services/messageService.ts
import prisma from '@/app/_lib/prisma';
import { openai, PODCAST_SYSTEM_PROMPT } from '@/app/_lib/services/openai';

/**
 * Fetches all messages for a specific conversation the user owns.
 * Used when rendering the chat screen.
 */
export const loadConversationMessages = async (
  conversationId: string,
  clerkId: string
) => {
  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) {
    throw new Error('No User Found');
  }

  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId: user.id,
    },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!conversation) {
    throw new Error('Conversation not found or unauthorized');
  }

  // Return the full conversation with typed messages
  return {
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    messages: conversation.messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role as 'user' | 'assistant' | 'system',
      createdAt: msg.createdAt,
    })),
  };
};
// This Returns Minimalist Version Of Everything.
export async function getUserConversations(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) return [];

    const conversations = await prisma.conversation.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
    });

    return conversations;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
}

// Create Conversation.
export async function createConversation(
  clerkId: string,
  firstMessage: string
) {
  // Step 1: Validate User Exists.

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) throw new Error('User not found');

  // Step 2: Get AI response for the first message That we Passed.
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: PODCAST_SYSTEM_PROMPT },
      { role: 'user', content: firstMessage },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  // Step 3Access the AI Response. Just In Case Response Lags Or Goes Bad. Leverage the || Symbol.
  const aiResponse =
    completion.choices[0].message.content ||
    "I'm excited to help you create a podcast! Could you tell me more about what you have in mind?";

  // Step 4. So now that the AI Has responded. We Need TO Create The Conversation InThe DB>
  const conversation = await prisma.conversation.create({
    data: {
      title:
        firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : ''),
      userId: user.id,
      messages: {
        create: [
          {
            role: 'user',
            content: firstMessage,
          },
          {
            role: 'assistant',
            content: aiResponse,
          },
        ],
      },
    },
    include: {
      // ← ADD THIS!
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return conversation;
}
