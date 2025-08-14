// src/app/_lib/services/podcastService.ts
import prisma from '@/app/_lib/prisma';
import { ElevenLabsClient } from 'elevenlabs';
import { UTApi } from 'uploadthing/server';
import {
  generatePodcastTranscript,
  PodcastIntent,
  extractPodcastIntent,
} from './openai';
import { ConversationMetadata } from './openai';
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

const utapi = new UTApi();

interface GeneratePodcastParams {
  conversationId: string;
  clerkId: string;
}

// Helper function to parse speakers from transcript
function parseTranscriptForSpeakers(
  transcript: string
): Array<{ speaker: string; text: string }> {
  const segments: Array<{ speaker: string; text: string }> = [];

  // Remove stage directions and sound effects
  const cleanedTranscript = transcript
    .replace(/\[PAUSE\]/gi, '')
    .replace(/\[.*?MUSIC.*?\]/gi, '')
    .replace(/\[.*?SOUND.*?\]/gi, '')
    .replace(/\[.*?FADE.*?\]/gi, '')
    .replace(/\(.*?MUSIC.*?\)/gi, '')
    .replace(/\(.*?SOUND.*?\)/gi, '');

  // Split by speaker patterns like "HOST:", "GUEST:", "Speaker 1:", etc.
  const speakerPattern =
    /^(HOST|GUEST|SPEAKER\s*\d+|INTERVIEWER|EXPERT|NARRATOR):\s*/gim;
  const parts = cleanedTranscript.split(speakerPattern);

  // If no speaker markers found, assume it's a single narrator
  if (parts.length === 1) {
    return [{ speaker: 'narrator', text: cleanedTranscript.trim() }];
  }

  // Parse speakers and their text
  for (let i = 1; i < parts.length; i += 2) {
    const speaker = parts[i].toLowerCase().replace(/\s+/g, '');
    const text = parts[i + 1]?.trim();
    if (text) {
      segments.push({ speaker, text });
    }
  }

  return segments;
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

  // Get the conversation with metadata AND messages
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

  // Check if we have intent in metadata first
  let intent: PodcastIntent | null = null;

  if (conversation.metadata && typeof conversation.metadata === 'object') {
    const metadata = conversation.metadata as ConversationMetadata;
    if (metadata.intent) {
      intent = metadata.intent;
    }
  }

  // If not in metadata, extract from messages
  if (!intent) {
    const messages = conversation.messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    intent = extractPodcastIntent(messages);
  }

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

  // Generate audio with multiple speakers if needed
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

// Generate audio with multiple voices support
export async function generateAudio(text: string): Promise<Buffer> {
  console.log('Generating audio with ElevenLabs...');

  // Parse the transcript for multiple speakers
  const segments = parseTranscriptForSpeakers(text);
  console.log(
    `Found ${segments.length} segments with speakers:`,
    segments.map((s) => s.speaker)
  );

  // Define voice mappings for different speakers
  // Using Chris and Jessica from ElevenLabs
  const voiceMap: Record<string, string> = {
    host: 'iP95p4xoKVk53GoZ742B', // Chris - male voice
    guest: 'cgSgspJ2msm6clMCkdW9', // Jessica - female voice
    speaker1: 'iP95p4xoKVk53GoZ742B', // Chris
    speaker2: 'cgSgspJ2msm6clMCkdW9', // Jessica
    interviewer: 'iP95p4xoKVk53GoZ742B', // Chris
    expert: 'cgSgspJ2msm6clMCkdW9', // Jessica
    narrator: 'iP95p4xoKVk53GoZ742B', // Chris for single speaker
  };

  try {
    // If only one speaker, generate simple audio
    if (
      segments.length === 1 ||
      !segments.some((s) => s.speaker !== segments[0].speaker)
    ) {
      const audio = await elevenlabs.generate({
        voice: voiceMap['narrator'],
        text: segments[0].text,
        model_id: 'eleven_monolingual_v1',
      });

      const chunks: Uint8Array[] = [];
      for await (const chunk of audio) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    }

    // For multiple speakers, generate each segment separately and combine
    const audioBuffers: Buffer[] = [];

    for (const segment of segments) {
      const voice = voiceMap[segment.speaker] || voiceMap['narrator'];
      console.log(
        `Generating audio for ${segment.speaker} with voice ${voice}`
      );

      const audio = await elevenlabs.generate({
        voice: voice,
        text: segment.text,
        model_id: 'eleven_monolingual_v1',
      });

      const chunks: Uint8Array[] = [];
      for await (const chunk of audio) {
        chunks.push(chunk);
      }

      audioBuffers.push(Buffer.concat(chunks));

      // Add a small pause between speakers (silence)
      // This is a simple approach - for production you'd want proper audio mixing
      const silenceBuffer = Buffer.alloc(22050); // 0.5 seconds of silence at 44.1kHz
      audioBuffers.push(silenceBuffer);
    }

    // Combine all audio buffers
    const finalBuffer = Buffer.concat(audioBuffers);
    console.log('Combined audio buffer size:', finalBuffer.length);

    return finalBuffer;
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
