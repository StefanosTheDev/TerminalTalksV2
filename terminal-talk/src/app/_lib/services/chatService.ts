// app/_services/messageService.ts
import prisma from '@/app/_lib/prisma';
import { openai, PODCAST_SYSTEM_PROMPT } from '@/app/_lib/services/openai';
import { Prisma } from '@prisma/client';

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

// GET conversation by ID
export async function getConversationById(
  conversationId: string,
  clerkId: string
) {
  // Get user from database
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Get conversation with messages
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId: user.id, // Ensure user owns this conversation
    },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  return conversation;
}

// Send message to conversation (updated version)
export async function sendMessageToConversation(
  conversationId: string,
  clerkId: string,
  content: string
) {
  // Get user
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Get conversation with messages
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  // Verify user owns this conversation
  if (conversation.userId !== user.id) {
    throw new Error('Unauthorized');
  }

  // Create user message
  const userMessage = await prisma.message.create({
    data: {
      content,
      role: 'user',
      conversationId,
    },
  });

  // Prepare messages for OpenAI
  const openAIMessages = [
    { role: 'system' as const, content: PODCAST_SYSTEM_PROMPT },
    ...conversation.messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content },
  ];

  // Call OpenAI
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: openAIMessages,
    temperature: 0.7,
    max_tokens: 500,
  });

  const aiResponse =
    completion.choices[0].message.content ||
    "I'm sorry, I couldn't generate a response.";

  // Save AI response
  const assistantMessage = await prisma.message.create({
    data: {
      content: aiResponse,
      role: 'assistant',
      conversationId,
    },
  });

  // Update conversation timestamp and title if needed
  const updates: Prisma.ConversationUpdateInput = {
    updatedAt: new Date(),
  };

  // Update title based on first user message if it's still the default
  if (conversation.messages.length === 1) {
    updates.title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
  }

  await prisma.conversation.update({
    where: { id: conversationId },
    data: updates,
  });

  return {
    userMessage,
    assistantMessage,
  };
}
