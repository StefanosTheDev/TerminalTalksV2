// src/app/_lib/services/openai.ts
import OpenAI from 'openai';
import {
  TECHNICAL_LECTURE_CHAT_SYSTEM_PROMPT,
  TECHNICAL_LECTURE_GENERATION_SYSTEM_PROMPT,
  createLectureGenerationPrompt,
  isSTEMTopic,
  CHAT_RESPONSES,
} from '@/app/_lib/util/prompts/lecturePrompts';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Use the GPT-4 model for chat (more conversational)
export const CHAT_MODEL = 'gpt-4-turbo-preview';

// Use GPT-4o for transcript generation (latest, most capable)
export const TRANSCRIPT_MODEL = 'gpt-4o';

// Updated system prompt for chat
export const PODCAST_SYSTEM_PROMPT = TECHNICAL_LECTURE_CHAT_SYSTEM_PROMPT;

// Types for lecture details
export interface LectureDetails {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  focus: string;
  duration: string;
}

// Function to extract lecture details from chat
export function extractLectureDetails(content: string): LectureDetails | null {
  // Look for the hidden generation marker
  const markerMatch = content.match(
    /\[GENERATE_TRANSCRIPT: topic="([^"]+)", level="([^"]+)", focus="([^"]+)"\]/
  );

  if (markerMatch) {
    return {
      topic: markerMatch[1],
      level: markerMatch[2] as 'beginner' | 'intermediate' | 'advanced',
      focus: markerMatch[3],
      duration: '5 minutes',
    };
  }

  return null;
}

// Function to check if message is confirmation
export function isConfirmationMessage(message: string): boolean {
  const confirmations = [
    'yes',
    'yeah',
    'yep',
    'correct',
    'perfect',
    'looks good',
    'sounds good',
    'go ahead',
    'generate',
    'create it',
  ];
  const lowerMessage = message.toLowerCase().trim();
  return confirmations.some((conf) => lowerMessage.includes(conf));
}

// Generate a technical lecture transcript
export async function generateLectureTranscript(
  details: LectureDetails
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: TRANSCRIPT_MODEL,
      messages: [
        {
          role: 'system',
          content: TECHNICAL_LECTURE_GENERATION_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: createLectureGenerationPrompt(details),
        },
      ],
      temperature: 0.7,
      max_tokens: 1500, // Enough for 750 words
    });

    const transcript = completion.choices[0].message.content || '';
    return cleanTranscriptForTTS(transcript);
  } catch (error) {
    console.error('Error generating transcript:', error);
    throw new Error('Failed to generate lecture transcript');
  }
}

// Clean transcript for TTS
export function cleanTranscriptForTTS(text: string): string {
  return (
    text
      // Remove any remaining code syntax
      .replace(/```[^`]*```/g, '') // Remove code blocks
      .replace(/`[^`]+`/g, (match) => match.slice(1, -1)) // Remove inline code backticks
      .replace(/[{}[\]();]/g, '') // Remove code-like punctuation

      // Convert [PAUSE] to ElevenLabs-friendly pauses
      .replace(/\[PAUSE\]/g, '... ') // ElevenLabs handles "..." as natural pause

      // Clean formatting
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/#{1,6}\s+/g, '') // Remove markdown headers

      // Clean whitespace
      .replace(/\n{3,}/g, '\n\n') // Max 2 newlines
      .replace(/\s+/g, ' ') // Multiple spaces to single
      .trim()
  );
}

// Helper to check if message needs STEM redirect
export function checkSTEMCompliance(message: string): {
  isValid: boolean;
  response?: string;
} {
  if (!isSTEMTopic(message)) {
    return {
      isValid: false,
      response: CHAT_RESPONSES.notSTEM,
    };
  }
  return { isValid: true };
}
