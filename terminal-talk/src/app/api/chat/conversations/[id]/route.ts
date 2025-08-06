import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/app/_lib/prisma';
import { openai, PODCAST_SYSTEM_PROMPT } from '@/app/_lib/services/openai';
import { Prisma } from '@prisma/client';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await req.json();

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get conversation with all messages
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Create user message
    const userMessage = await prisma.message.create({
      data: {
        content,
        role: 'user',
        conversationId: id,
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
      model: 'gpt-4-turbo-preview', // or 'gpt-3.5-turbo' for faster/cheaper
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
        conversationId: id,
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
      where: { id },
      data: updates,
    });

    return NextResponse.json({
      userMessage,
      assistantMessage,
    });
  } catch (error) {
    console.error('Error in message route:', error);
    return NextResponse.json(
      {
        error: 'Failed to send message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
