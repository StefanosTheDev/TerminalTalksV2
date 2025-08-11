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
    console.log('Starting podcast generation...');

    const { id: conversationId } = await context.params;

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { lectureDetails } = body;

    console.log('Lecture details:', lectureDetails);

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

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    if (!conversation.messages[0]) {
      return NextResponse.json(
        { error: 'No transcript found in conversation' },
        { status: 404 }
      );
    }

    const transcript = conversation.messages[0].content;
    console.log('Transcript length:', transcript.length);

    // Check if ElevenLabs API key exists
    if (!process.env.ELEVENLABS_API_KEY) {
      console.error('ElevenLabs API key missing');
      return NextResponse.json(
        { error: 'Audio generation service not configured' },
        { status: 500 }
      );
    }

    // Generate audio with ElevenLabs
    try {
      console.log('Calling ElevenLabs API...');
      const audio = await elevenlabs.generate({
        voice: 'pNInz6obpgDQGcFmaJgB', // Adam voice
        text: transcript.substring(0, 5000), // ElevenLabs has character limits
        model_id: 'eleven_monolingual_v1',
      });

      // Convert stream to buffer
      const chunks: Uint8Array[] = [];
      for await (const chunk of audio) {
        chunks.push(chunk);
      }
      const audioBuffer = Buffer.concat(chunks);
      console.log('Audio generated, size:', audioBuffer.length);

      // For testing, you can skip UploadThing and use a dummy URL
      // Remove this in production
      if (
        process.env.NODE_ENV === 'development' &&
        !process.env.UPLOADTHING_SECRET
      ) {
        console.warn('UploadThing not configured, using dummy URL');

        // Create podcast record with dummy URL
        const podcast = await prisma.podcast.create({
          data: {
            title: `${lectureDetails.topic} - ${lectureDetails.level} level`,
            description: lectureDetails.focus,
            script: transcript,
            audioUrl: 'https://example.com/dummy-audio.mp3', // Dummy URL
            duration: Math.ceil(transcript.split(' ').length / 150) * 60,
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
      }

      // Upload to UploadThing
      console.log('Uploading to UploadThing...');
      const fileName = `lecture-${Date.now()}.mp3`;
      const file = new File([audioBuffer], fileName, {
        type: 'audio/mpeg',
      });

      const uploadResponse = await utapi.uploadFiles(file);
      const uploadedFile = Array.isArray(uploadResponse)
        ? uploadResponse[0]
        : uploadResponse;

      if (!uploadedFile || uploadedFile.error) {
        console.error('Upload failed:', uploadedFile?.error);
        throw new Error('Failed to upload audio file');
      }

      console.log('Audio uploaded:', uploadedFile.data.url);

      // Create podcast record
      const podcast = await prisma.podcast.create({
        data: {
          title: `${lectureDetails.topic} - ${lectureDetails.level} level`,
          description: lectureDetails.focus,
          script: transcript,
          audioUrl: uploadedFile.data.url,
          duration: Math.ceil(transcript.split(' ').length / 150) * 60,
          format: 'lecture',
          tone: 'educational',
          audience: lectureDetails.level,
          userId: dbUser.id,
          conversationId: conversation.id,
        },
      });

      console.log('Podcast created:', podcast.id);

      return NextResponse.json({
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        audioUrl: podcast.audioUrl,
        duration: podcast.duration,
        createdAt: podcast.createdAt,
      });
    } catch (elevenLabsError) {
      console.error('ElevenLabs error:', elevenLabsError);
      return NextResponse.json(
        { error: 'Failed to generate audio. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in podcast generation:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate podcast',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
