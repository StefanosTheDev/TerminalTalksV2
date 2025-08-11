// src/app/api/chat/conversations/[id]/generate-podcast/route.ts
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/app/_lib/prisma';
import { ElevenLabsClient } from 'elevenlabs';
import { UTApi } from 'uploadthing/server';

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

const utapi = new UTApi();

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await context.params;

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lectureDetails } = await req.json();

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the conversation with the latest transcript
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: dbUser.id,
      },
      include: {
        messages: {
          where: {
            role: 'system', // Where we stored the transcript
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    if (!conversation || !conversation.messages[0]) {
      return NextResponse.json(
        { error: 'No transcript found' },
        { status: 404 }
      );
    }

    const transcript = conversation.messages[0].content;

    // Generate audio with ElevenLabs
    console.log('Generating audio with ElevenLabs...');
    const audio = await elevenlabs.generate({
      voice: 'pNInz6obpgDQGcFmaJgB', // Adam voice - great for educational content
      text: transcript,
      model_id: 'eleven_monolingual_v1',
    });

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    // Upload to UploadThing
    console.log('Uploading audio file...');
    const fileName = `lecture-${Date.now()}.mp3`;
    const file = new File([audioBuffer], fileName, {
      type: 'audio/mpeg',
    });

    const uploadResponse = await utapi.uploadFiles(file);
    const uploadedFile = Array.isArray(uploadResponse)
      ? uploadResponse[0]
      : uploadResponse;

    if (!uploadedFile || uploadedFile.error) {
      throw new Error('Failed to upload audio file');
    }

    // Create podcast record
    const podcast = await prisma.podcast.create({
      data: {
        title: `${lectureDetails.topic} - ${lectureDetails.level} level`,
        description: lectureDetails.focus,
        script: transcript,
        audioUrl: uploadedFile.data.url,
        duration: Math.ceil(transcript.split(' ').length / 150) * 60, // Rough estimate
        format: 'lecture',
        tone: 'educational',
        audience: lectureDetails.level,
        userId: dbUser.id,
        conversationId: conversation.id,
      },
    });

    return NextResponse.json({
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      audioUrl: podcast.audioUrl,
      duration: podcast.duration,
      createdAt: podcast.createdAt,
    });
  } catch (error) {
    console.error('Error generating podcast:', error);
    return NextResponse.json(
      { error: 'Failed to generate podcast' },
      { status: 500 }
    );
  }
}
