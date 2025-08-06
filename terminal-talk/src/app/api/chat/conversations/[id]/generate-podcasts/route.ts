// app/api/chat/conversations/[id]/generate-podcast/route.ts
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/app/_lib/prisma';
import { openai } from '@/app/_lib/services/openai';
import { ElevenLabsClient } from 'elevenlabs';

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

// System prompt for podcast script generation
const PODCAST_SCRIPT_PROMPT = `You are an expert podcast scriptwriter. Create an engaging, natural-sounding podcast script based on the provided details.

Guidelines:
- Write in a conversational, engaging tone
- Include natural speech patterns, pauses, and emphasis
- Add personality and enthusiasm where appropriate
- Structure the content logically with a clear intro, body, and outro
- Keep the language accessible and entertaining
- The script should match the requested length and format

DO NOT include any stage directions, sound effects notes, or meta-commentary. Write ONLY the spoken words.`;

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

    const { podcastDetails } = await req.json();

    if (!podcastDetails) {
      return NextResponse.json(
        { error: 'Missing podcast details' },
        { status: 400 }
      );
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify conversation ownership
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: dbUser.id,
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Step 1: Generate podcast script with GPT
    const scriptPrompt = `Create a podcast script with these specifications:
Topic: ${podcastDetails.topic}
Format: ${podcastDetails.format}
Tone: ${podcastDetails.tone}
Target Audience: ${podcastDetails.audience}
Episode Length: ${podcastDetails.length}

Create an engaging script that sounds natural when read aloud. Start with a catchy intro, develop the main content, and end with a memorable outro.`;

    console.log('Generating podcast script...');
    const scriptCompletion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: PODCAST_SCRIPT_PROMPT },
        { role: 'user', content: scriptPrompt },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const podcastScript = scriptCompletion.choices[0].message.content || '';
    console.log('Script generated, length:', podcastScript.length);

    // Step 2: Generate audio with ElevenLabs
    console.log('Generating audio with ElevenLabs...');

    // Using the text-to-speech method
    const audioStream = await elevenlabs.textToSpeech.convert(
      process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM', // Rachel voice as default
      {
        text: podcastScript,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }
    );

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk));
    }
    const audioBuffer = Buffer.concat(chunks);
    console.log('Audio generated, size:', audioBuffer.length);

    // Step 3: Upload audio to cloud storage
    // For now, we'll use base64 encoding (not recommended for production)
    const audioBase64 = audioBuffer.toString('base64');
    const audioDataUrl = `data:audio/mpeg;base64,${audioBase64}`;

    // TODO: In production, upload to S3/Cloudinary/etc:
    // const audioUrl = await uploadToCloudStorage(audioBuffer, `podcast-${conversationId}-${Date.now()}.mp3`);

    // Step 4: Create podcast record in database
    const podcast = await prisma.podcast.create({
      data: {
        title: podcastDetails.topic,
        description: `A ${podcastDetails.format} podcast about ${podcastDetails.topic}`,
        script: podcastScript,
        audioUrl: audioDataUrl, // In production, use the cloud URL
        duration: calculateDuration(podcastDetails.length),
        format: podcastDetails.format,
        tone: podcastDetails.tone,
        audience: podcastDetails.audience,
        userId: dbUser.id,
        conversationId: conversationId,
      },
    });

    console.log('Podcast created:', podcast.id);

    // Step 5: Add system message to conversation
    await prisma.message.create({
      data: {
        content: `🎙️ **Your podcast is ready!**\n\n**Title:** ${
          podcast.title
        }\n\nYour ${
          podcastDetails.format
        } podcast has been generated successfully. Click play below to listen to your episode!\n\n**Duration:** ${Math.ceil(
          podcast.duration / 60
        )} minutes`,
        role: 'system',
        conversationId: conversationId,
      },
    });

    return NextResponse.json({
      success: true,
      podcast: {
        id: podcast.id,
        title: podcast.title,
        audioUrl: podcast.audioUrl,
        script: podcast.script,
        duration: podcast.duration,
      },
    });
  } catch (error) {
    console.error('Error generating podcast:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate podcast',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Helper function to convert length string to seconds
function calculateDuration(lengthStr: string): number {
  const match = lengthStr.match(/(\d+)/);
  if (match) {
    return parseInt(match[1]) * 60; // Convert minutes to seconds
  }
  return 600; // Default to 10 minutes
}
