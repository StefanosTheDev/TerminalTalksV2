// src/app/_lib/services/chatService.ts
import prisma from '@/app/_lib/prisma';
import {
  openai,
  INTENT_EXTRACTION_PROMPT,
  CHAT_MODEL,
  isReadyToGenerate,
  extractPodcastIntent,
} from '@/app/_lib/services/openai';

/**
 * Create a new conversation with intent extraction
 */
export async function createConversation(
  clerkId: string,
  firstMessage: string
) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) throw new Error('User not found');

  // Use intent extraction prompt for new conversations
  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages: [
      { role: 'system', content: INTENT_EXTRACTION_PROMPT },
      { role: 'user', content: firstMessage },
    ],
    max_completion_tokens: 200, // Changed from max_tokens
  });

  const aiResponse =
    completion.choices[0].message.content ||
    "I'd love to help you create a podcast! What topic did you have in mind?";

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
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return conversation;
}

/**
 * Send message to existing conversation with intent extraction
 */
export async function sendMessageToConversation(
  conversationId: string,
  clerkId: string,
  content: string
) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) throw new Error('User not found');

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!conversation || conversation.userId !== user.id) {
    throw new Error('Conversation not found or unauthorized');
  }

  // Create user message
  const userMessage = await prisma.message.create({
    data: {
      content,
      role: 'user',
      conversationId,
    },
  });

  // Check if we already have the intent ready
  const conversationMessages = [
    ...conversation.messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content },
  ];

  // Check if last assistant message indicated readiness
  const lastAssistantMsg = conversation.messages
    .filter((m) => m.role === 'assistant')
    .pop();

  let aiResponse: string;

  if (lastAssistantMsg && isReadyToGenerate(lastAssistantMsg.content)) {
    // User is confirming generation
    if (
      content.toLowerCase().includes('yes') ||
      content.toLowerCase().includes('go') ||
      content.toLowerCase().includes('create') ||
      content.toLowerCase().includes('generate')
    ) {
      aiResponse =
        '🎙️ Generating your podcast now! This will take about 30 seconds...';

      // Save this response
      const assistantMessage = await prisma.message.create({
        data: {
          content: aiResponse,
          role: 'assistant',
          conversationId,
        },
      });

      // Mark conversation as ready for generation
      const intent = extractPodcastIntent(conversationMessages);
      await prisma.conversation.update({
        where: { id: conversationId },
        data: {
          metadata: JSON.parse(
            JSON.stringify({
              readyToGenerate: true,
              intent: intent,
            })
          ),
        },
      });

      return { userMessage, assistantMessage, readyToGenerate: true };
    }
  }

  // Continue intent extraction conversation
  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages: [
      { role: 'system', content: INTENT_EXTRACTION_PROMPT },
      ...conversationMessages,
    ],
    max_completion_tokens: 200, // Changed from max_tokens
  });

  aiResponse =
    completion.choices[0].message.content ||
    "I'm sorry, I couldn't generate a response.";

  const assistantMessage = await prisma.message.create({
    data: {
      content: aiResponse,
      role: 'assistant',
      conversationId,
    },
  });

  // Update conversation
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  return {
    userMessage,
    assistantMessage,
    readyToGenerate: isReadyToGenerate(aiResponse),
  };
}

/**
 * Get conversation by ID
 */
export async function getConversationById(
  conversationId: string,
  clerkId: string
) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error('User not found');
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
    throw new Error('Conversation not found');
  }

  return conversation;
}

/**
 * Get user conversations
 */
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

/**
 * Load conversation messages for display
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
