import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/app/_lib/prisma';
import { openai } from '@/app/_lib/services/openai';
import { ElevenLabsClient } from 'elevenlabs';
import { UTApi } from 'uploadthing/server';

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

const utapi = new UTApi();

// System prompt for transcript generation
const TRANSCRIPT_SYSTEM_PROMPT = `You are a professional podcast script writer. Create engaging, natural-sounding podcast scripts that are ready for text-to-speech conversion.

Rules:
- Write in a conversational, engaging tone
- Include natural speech patterns
- No stage directions or sound effects
- No markdown or special formatting
- Write as if speaking directly to the listener
- Keep it focused and valuable`;

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { conversationId, podcastDetails } = await req.json();

    // Get user from DB
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Step 1: Generate transcript
    const transcriptPrompt = `Create a ${
      podcastDetails.length || '5-minute'
    } podcast script about:

Topic: ${podcastDetails.topic}
Format: ${podcastDetails.format}
Tone: ${podcastDetails.tone}
Target Audience: ${podcastDetails.audience}

Create an engaging podcast script that delivers value to the audience. Start with a hook, deliver the main content, and end with a clear takeaway.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: TRANSCRIPT_SYSTEM_PROMPT },
        { role: 'user', content: transcriptPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const transcript = completion.choices[0].message.content || '';

    // Step 2: Generate audio with ElevenLabs
    const audio = await elevenlabs.generate({
      voice: 'pNInz6obpgDQGcFmaJgB', // Adam voice
      text: transcript,
      model_id: 'eleven_monolingual_v1',
    });

    // Convert the readable stream to a buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    // Step 3: Upload to UploadThing
    const file = new File([audioBuffer], `podcast-${Date.now()}.mp3`, {
      type: 'audio/mpeg',
    });

    const uploadResponse = await utapi.uploadFiles(file);
    const uploadedFile = Array.isArray(uploadResponse)
      ? uploadResponse[0]
      : uploadResponse;

    if (!uploadedFile.data?.url) {
      throw new Error('Failed to upload audio file');
    }

    // Step 4: Calculate duration from length string
    const calculateDuration = (lengthStr: string): number => {
      const match = lengthStr.match(/(\d+)/);
      if (match) {
        return parseInt(match[1]) * 60; // Convert minutes to seconds
      }
      return 300; // Default to 5 minutes
    };

    // Step 5: Save to database with ALL required fields
    const podcast = await prisma.podcast.create({
      data: {
        conversationId,
        userId: dbUser.id,
        title: podcastDetails.topic.slice(0, 100),
        description: `A ${podcastDetails.format} podcast about ${podcastDetails.topic}`,
        script: transcript, // The generated transcript
        audioUrl: uploadedFile.data.url,
        duration: calculateDuration(podcastDetails.length || '5 minutes'),
        format: podcastDetails.format || 'solo',
        tone: podcastDetails.tone || 'professional',
        audience: podcastDetails.audience || 'general',
      },
    });

    // Step 6: Add a system message to the conversation
    await prisma.message.create({
      data: {
        content: `🎙️ **Your podcast is ready!**\n\n**Title:** ${
          podcast.title
        }\n\nYour ${
          podcast.format
        } podcast has been generated successfully. Click play below to listen to your episode!\n\n**Duration:** ${Math.ceil(
          podcast.duration / 60
        )} minutes`,
        role: 'system',
        conversationId: conversationId,
      },
    });

    return NextResponse.json({
      success: true,
      podcastId: podcast.id,
      audioUrl: podcast.audioUrl,
      title: podcast.title,
      duration: podcast.duration,
    });
  } catch (error) {
    console.error('Podcast generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate podcast',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
