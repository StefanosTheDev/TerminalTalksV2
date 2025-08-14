// src/app/_lib/services/podcastService.ts
import prisma from '@/app/_lib/prisma';
import { ElevenLabsClient } from 'elevenlabs';
import { UTApi } from 'uploadthing/server';
import {
  generatePodcastTranscript,
  PodcastIntent,
  extractPodcastIntent,
} from './openai';

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

const utapi = new UTApi();

interface GeneratePodcastParams {
  conversationId: string;
  clerkId: string;
}

export async function generatePodcastFromConversation({
  conversationId,
  clerkId,
}: GeneratePodcastParams) {
  console.log('Starting podcast generation for conversation:', conversationId);

  // Get user
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Get the conversation with metadata
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

  // Extract intent from conversation
  const messages = conversation.messages.map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  const intent = extractPodcastIntent(messages);

  if (!intent) {
    throw new Error('Could not extract podcast intent from conversation');
  }

  console.log('Extracted intent:', intent);

  // Generate the transcript using the two-stage system
  console.log('Generating transcript...');
  const transcript = await generatePodcastTranscript(intent);

  // Save the transcript as a system message
  await prisma.message.create({
    data: {
      role: 'system',
      content: transcript,
      conversationId: conversation.id,
    },
  });

  console.log('Transcript generated, generating audio...');

  // Generate audio
  const audioBuffer = await generateAudio(transcript);

  console.log('Audio generated, uploading...');

  // Upload audio
  const audioUrl = await uploadAudio(audioBuffer);

  console.log('Audio uploaded:', audioUrl);

  // Create podcast record
  const podcast = await prisma.podcast.create({
    data: {
      title: `${intent.topic} - ${intent.audience_level} level`,
      description: intent.angle || intent.topic,
      script: transcript,
      audioUrl: audioUrl,
      duration: estimateDuration(transcript),
      format: intent.format,
      tone: intent.tone,
      audience: intent.audience_level,
      userId: user.id,
      conversationId: conversation.id,
    },
  });

  console.log('Podcast created:', podcast.id);

  return {
    id: podcast.id,
    title: podcast.title,
    description: podcast.description,
    audioUrl: podcast.audioUrl,
    duration: podcast.duration,
    createdAt: podcast.createdAt,
  };
}

// Generate audio with better error handling
export async function generateAudio(text: string): Promise<Buffer> {
  console.log('Generating audio with ElevenLabs...');
  console.log('Text length:', text.length);

  try {
    const audio = await elevenlabs.generate({
      voice: 'pNInz6obpgDQGcFmaJgB', // Adam voice
      text: text,
      model_id: 'eleven_monolingual_v1',
    });

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    console.log('Audio buffer size:', buffer.length);

    return buffer;
  } catch (error) {
    console.error('ElevenLabs error:', error);
    throw new Error(
      `Failed to generate audio: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

// Upload audio with better error handling
export async function uploadAudio(audioBuffer: Buffer): Promise<string> {
  console.log('Uploading audio file...');

  try {
    const fileName = `podcast-${Date.now()}.mp3`;
    const file = new File([audioBuffer], fileName, {
      type: 'audio/mpeg',
    });

    console.log('File created:', fileName, 'Size:', file.size);

    const uploadResponse = await utapi.uploadFiles(file);
    const uploadedFile = Array.isArray(uploadResponse)
      ? uploadResponse[0]
      : uploadResponse;

    if (!uploadedFile || uploadedFile.error) {
      throw new Error(
        `Upload failed: ${uploadedFile?.error || 'Unknown error'}`
      );
    }

    console.log('Upload successful:', uploadedFile.data.url);
    return uploadedFile.data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(
      `Failed to upload audio: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

// Estimate duration
function estimateDuration(transcript: string): number {
  // Remove [PAUSE] markers for word count
  const cleanText = transcript.replace(/\[PAUSE\]/g, '');
  // Rough estimate: 150 words per minute
  const words = cleanText.split(' ').length;
  return Math.ceil(words / 150) * 60;
}

// Get podcast by ID (no changes needed)
export async function getPodcastById(podcastId: string, clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const podcast = await prisma.podcast.findFirst({
    where: {
      id: podcastId,
      userId: user.id,
    },
  });

  if (!podcast) {
    throw new Error('Podcast not found');
  }

  return {
    id: podcast.id,
    title: podcast.title,
    description: podcast.description,
    audioUrl: podcast.audioUrl,
    duration: podcast.duration,
    createdAt: podcast.createdAt,
  };
}
