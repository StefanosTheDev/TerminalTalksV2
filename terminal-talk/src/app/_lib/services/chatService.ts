// app/_services/messageService.ts
import prisma from '@/app/_lib/prisma';

/**
 * Fetches all conversations for a user with the latest message preview.
 * Used for sidebar list of conversations.
 */
export const loadAccountConversations = async (clerkId: string) => {
  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) {
    throw new Error('No User Found');
  }

  const conversations = await prisma.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' }, // Get last message
      },
    },
  });

  return conversations;
};

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
      userId: user.id, // Ensures this conversation belongs to the user
    },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' }, // Oldest to newest (chat-style)
      },
    },
  });

  if (!conversation) {
    throw new Error('Conversation not found or unauthorized');
  }

  return conversation;
};
