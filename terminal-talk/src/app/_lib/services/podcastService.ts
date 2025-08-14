import { prisma } from '@/app/_lib/prisma';
import { ElevenLabsClient } from 'elevenlabs';
import { UTApi } from 'uploadthing/server';

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

const utapi = new UTApi();

interface GeneratePodcastParams {
  conversationId: string;
  clerkId: string;
  lectureDetails: {
    topic: string;
    level: string;
    focus: string;
  };
}

export async function generatePodcastFromConversation({
  conversationId,
  clerkId,
  lectureDetails,
}: GeneratePodcastParams) {
  // Service handles user lookup
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // 1. Get the conversation and transcript
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId: user.id,
    },
    include: {
      messages: {
        where: { role: 'system' },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!conversation || !conversation.messages[0]) {
    throw new Error('No transcript found');
  }

  const transcript = conversation.messages[0].content;

  // 2. Generate audio
  const audioBuffer = await generateAudio(transcript);

  // 3. Upload audio
  const audioUrl = await uploadAudio(audioBuffer);

  // 4. Create podcast record
  const podcast = await prisma.podcast.create({
    data: {
      title: `${lectureDetails.topic} - ${lectureDetails.level} level`,
      description: lectureDetails.focus,
      script: transcript,
      audioUrl: audioUrl,
      duration: estimateDuration(transcript),
      format: 'lecture',
      tone: 'educational',
      audience: lectureDetails.level,
      userId: user.id,
      conversationId: conversation.id,
    },
  });

  return {
    id: podcast.id,
    title: podcast.title,
    description: podcast.description,
    audioUrl: podcast.audioUrl,
    duration: podcast.duration,
    createdAt: podcast.createdAt,
  };
}

// Helper functions
export async function generateAudio(text: string): Promise<Buffer> {
  console.log('Generating audio with ElevenLabs...');

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

  return Buffer.concat(chunks);
}

export async function uploadAudio(audioBuffer: Buffer): Promise<string> {
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

  return uploadedFile.data.url;
}

function estimateDuration(transcript: string): number {
  // Rough estimate: 150 words per minute
  return Math.ceil(transcript.split(' ').length / 150) * 60;
}

export async function getPodcastById(podcastId: string, clerkId: string) {
  // Get user from database
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Get the podcast
  const podcast = await prisma.podcast.findFirst({
    where: {
      id: podcastId,
      userId: user.id,
    },
  });

  if (!podcast) {
    throw new Error('Podcast not found');
  }

  // Return only the fields we want to expose
  return {
    id: podcast.id,
    title: podcast.title,
    description: podcast.description,
    audioUrl: podcast.audioUrl,
    duration: podcast.duration,
    createdAt: podcast.createdAt,
  };
}
