// src/app/api/chat/conversations/[id]/messages/route.ts
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/app/_lib/prisma';
import {
  openai,
  CHAT_MODEL,
  PODCAST_SYSTEM_PROMPT,
  checkSTEMCompliance,
  extractLectureDetails,
  generateLectureTranscript,
} from '@/app/_lib/services/openai';
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

    // Check if this is the first real message (after system message)
    const isFirstMessage =
      conversation.messages.filter((m) => m.role === 'user').length === 0;

    // For first message, check STEM compliance
    if (isFirstMessage) {
      const stemCheck = checkSTEMCompliance(content);
      if (!stemCheck.isValid) {
        // Save user message
        await prisma.message.create({
          data: {
            content,
            role: 'user',
            conversationId: id,
          },
        });

        // Save STEM redirect response
        const assistantMessage = await prisma.message.create({
          data: {
            content: stemCheck.response!,
            role: 'assistant',
            conversationId: id,
          },
        });

        return NextResponse.json({
          userMessage: { content, role: 'user' },
          assistantMessage,
        });
      }
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

    // Call OpenAI for chat
    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: openAIMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse =
      completion.choices[0].message.content ||
      "I'm sorry, I couldn't generate a response.";

    // Check if AI is ready to generate transcript
    const lectureDetails = extractLectureDetails(aiResponse);

    let finalResponse = aiResponse;
    let transcriptGenerated = false;

    if (lectureDetails) {
      // Remove the generation marker from the response shown to user
      finalResponse = aiResponse
        .replace(/\[GENERATE_TRANSCRIPT:.*?\]/, '')
        .trim();

      // Generate the actual transcript using GPT-4o
      try {
        const transcript = await generateLectureTranscript(lectureDetails);

        // Store the transcript in the conversation metadata
        await prisma.conversation.update({
          where: { id },
          data: {
            title: `${lectureDetails.topic} - ${lectureDetails.level}`,
          },
        });

        // Create a system message with the transcript
        await prisma.message.create({
          data: {
            content: transcript,
            role: 'system',
            conversationId: id,
          },
        });

        transcriptGenerated = true;
      } catch (error) {
        console.error('Failed to generate transcript:', error);
        finalResponse = `${finalResponse}\n\nI encountered an error while creating your lecture. Please try again.`;
      }
    }

    // Save AI response
    const assistantMessage = await prisma.message.create({
      data: {
        content: finalResponse,
        role: 'assistant',
        conversationId: id,
      },
    });

    // Update conversation timestamp and title if needed
    const updates: Prisma.ConversationUpdateInput = {
      updatedAt: new Date(),
    };

    // Update title based on first user message if it's still the default
    if (conversation.messages.length === 1 && !transcriptGenerated) {
      updates.title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
    }

    await prisma.conversation.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json({
      userMessage,
      assistantMessage,
      transcriptGenerated,
      lectureDetails: transcriptGenerated ? lectureDetails : null,
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
