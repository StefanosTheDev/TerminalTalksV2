// src/app/_lib/services/openai.ts
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Use GPT-4 for chat (intent extraction)
export const CHAT_MODEL = 'gpt-5';

// Use GPT-4o for transcript generation (most capable)
export const TRANSCRIPT_MODEL = 'gpt-5';

// STAGE 1: Intent Extraction System Prompt
export const INTENT_EXTRACTION_PROMPT = `You are an expert podcast producer helping users create AI-generated podcasts. Your role is to naturally understand what kind of podcast episode they want through conversation.

COMMUNICATION STYLE:
- Keep responses concise - typically 1-3 sentences
- Ask one clear question at a time
- Avoid lengthy explanations or examples
- Sound like a helpful friend, not a manual
- Match the user's energy and length

CORE BEHAVIOR:
- Extract details through natural back-and-forth
- Build excitement without overwhelming
- Guide gently toward clarity
- Handle vague requests by offering suggestions
- Never force choices - work with what they give you

WHAT TO EXTRACT:
1. Topic & Angle (What specifically? What's the unique take?)
2. Target Audience Level (Beginner/Intermediate/Advanced)
3. Format Style (Lecture/Discussion/Interview/Debate)
4. Tone (Professional/Casual/Funny)
5. Key Points to cover
6. Specific examples they want

DEFAULT ASSUMPTIONS (if not specified):
- Format: Casual discussion (most engaging)
- Audience: Intermediate (broadest appeal)
- Tone: Friendly professional
- Length: 5-7 minutes (system default)

WHEN MINIMUM INFO GATHERED:
- Must have: Topic (even if broad)
- Everything else can use defaults
- Show: "✨ Got it! Ready to create: [one-line summary]"
- End with: [READY_TO_GENERATE]`;

// STAGE 2: Master Podcast Generation Prompt
export const PODCAST_GENERATION_PROMPT = `You are a world-class AI podcast production system that creates complete, natural-sounding podcast transcripts of 5-7 minutes (600-850 words).

PRODUCTION PRINCIPLES:
- Every word must sound natural when spoken aloud
- NEVER write literal code syntax (no "function App() {}" or "const x = 5")
- Explain concepts conversationally
- Use [PAUSE] markers for emphasis and clarity
- Include human moments: realizations, clarifications, natural flow

5-7 MINUTE STRUCTURE:
1. Hook (30 seconds): Grab attention with intriguing statement
2. Main Content (5-6 minutes): Deep dive with natural conversation flow
3. Wrap-up (30 seconds): Key takeaway and actionable next step

CRITICAL: Write for the ear, not the eye. Natural speech patterns only.`;

// Types for podcast details
export interface PodcastIntent {
  topic: string;
  angle?: string;
  audience_level: 'beginner' | 'intermediate' | 'advanced';
  format: 'lecture' | 'discussion' | 'interview' | 'debate';
  tone: 'professional' | 'casual' | 'funny' | 'mixed';
  key_points?: string[];
  examples?: string[];
  special_requirements?: string;
}

// Helper function to check if ready to generate
export function isReadyToGenerate(message: string): boolean {
  return (
    message.includes('[READY_TO_GENERATE]') ||
    message.includes('✨ Got it! Ready to create:')
  );
}

// Extract intent from conversation
// Add this improved function to your openai.ts file, replacing the basic one:

// Extract intent from conversation with better parsing
export function extractPodcastIntent(
  conversation: any[]
): PodcastIntent | null {
  // Look through the conversation for extracted details
  const lastAssistantMessage = [...conversation]
    .reverse()
    .find((msg) => msg.role === 'assistant');

  if (
    !lastAssistantMessage ||
    !isReadyToGenerate(lastAssistantMessage.content)
  ) {
    return null;
  }

  // Initialize with defaults
  const intent: PodcastIntent = {
    topic: '',
    audience_level: 'intermediate',
    format: 'discussion',
    tone: 'casual',
    key_points: [],
    examples: [],
  };

  // Extract topic from the conversation
  // Look for the first substantial user message
  for (const msg of conversation) {
    if (msg.role === 'user' && msg.content.length > 10) {
      // Extract the main topic from phrases like "podcast about X"
      const topicMatch = msg.content.match(
        /(?:about|on|regarding|discussing)\s+(.+?)(?:\.|$|\s+for|\s+to)/i
      );
      if (topicMatch) {
        intent.topic = topicMatch[1].trim();
      } else {
        // Fallback: use the first user message as topic
        intent.topic = msg.content.slice(0, 100);
      }
      break;
    }
  }

  // Look through the conversation for specific details
  const fullConversation = conversation
    .map((m) => m.content)
    .join(' ')
    .toLowerCase();

  // Extract audience level
  if (
    fullConversation.includes('beginner') ||
    fullConversation.includes('new to') ||
    fullConversation.includes('no experience')
  ) {
    intent.audience_level = 'beginner';
  } else if (
    fullConversation.includes('advanced') ||
    fullConversation.includes('expert') ||
    fullConversation.includes('deep dive')
  ) {
    intent.audience_level = 'advanced';
  }

  // Extract format
  if (
    fullConversation.includes('lecture') ||
    fullConversation.includes('teach') ||
    fullConversation.includes('explain')
  ) {
    intent.format = 'lecture';
  } else if (
    fullConversation.includes('interview') ||
    fullConversation.includes('q&a') ||
    fullConversation.includes('question')
  ) {
    intent.format = 'interview';
  } else if (
    fullConversation.includes('debate') ||
    fullConversation.includes('argument') ||
    fullConversation.includes('pros and cons')
  ) {
    intent.format = 'debate';
  }

  // Extract tone
  if (
    fullConversation.includes('professional') ||
    fullConversation.includes('formal') ||
    fullConversation.includes('serious')
  ) {
    intent.tone = 'professional';
  } else if (
    fullConversation.includes('funny') ||
    fullConversation.includes('humor') ||
    fullConversation.includes('entertaining')
  ) {
    intent.tone = 'funny';
  } else if (
    fullConversation.includes('mixed') ||
    fullConversation.includes('balance')
  ) {
    intent.tone = 'mixed';
  }

  // Extract the angle from the ready message
  const readyMatch = lastAssistantMessage.content.match(
    /Ready to create:\s*(.+?)(?:\s*for\s*|$)/
  );
  if (readyMatch) {
    intent.angle = readyMatch[1].trim();
  }

  return intent;
}
// Generate dynamic sub-prompts based on intent
export function generateSubPrompts(intent: PodcastIntent): string {
  let subPrompt = '';

  // Add audience level prompt
  switch (intent.audience_level) {
    case 'beginner':
      subPrompt += `\n\nBEGINNER FOCUS:
- Assume zero knowledge
- Define ALL technical terms simply
- Use real-world analogies and comparisons
- Encouraging, supportive tone
- Build confidence throughout`;
      break;
    case 'intermediate':
      subPrompt += `\n\nINTERMEDIATE FOCUS:
- Assume 2-3 years experience
- Focus on "when and why" over "what"
- Compare approaches and trade-offs
- Reference real-world scenarios`;
      break;
    case 'advanced':
      subPrompt += `\n\nADVANCED FOCUS:
- Assume deep expertise
- Discuss edge cases and nuances
- Challenge conventional wisdom
- Industry insights and trends`;
      break;
  }

  // Add format-specific prompts
  switch (intent.format) {
    case 'discussion':
      subPrompt += `\n\nFORMAT: Natural conversation between two hosts with different perspectives, building on each other's points.`;
      break;
    case 'lecture':
      subPrompt += `\n\nFORMAT: Solo expert lecture with clear teaching progression and rhetorical questions.`;
      break;
    case 'interview':
      subPrompt += `\n\nFORMAT: Interviewer drawing out insights from expert with follow-up questions.`;
      break;
  }

  return subPrompt;
}

// Main function to generate podcast transcript
export async function generatePodcastTranscript(
  intent: PodcastIntent
): Promise<string> {
  const dynamicPrompts = generateSubPrompts(intent);

  const fullPrompt = PODCAST_GENERATION_PROMPT + dynamicPrompts;

  const userPrompt = `Create a ${intent.format} podcast about: ${intent.topic}
Target audience: ${intent.audience_level}
Tone: ${intent.tone}
${
  intent.key_points?.length ? `Key points: ${intent.key_points.join(', ')}` : ''
}
${intent.examples?.length ? `Examples: ${intent.examples.join(', ')}` : ''}`;

  try {
    const completion = await openai.chat.completions.create({
      model: TRANSCRIPT_MODEL,
      messages: [
        { role: 'system', content: fullPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_completion_tokens: 1500, // Changed from max_tokens
    });

    return (
      completion.choices[0].message.content || 'Failed to generate transcript.'
    );
  } catch (error) {
    console.error('Error generating transcript:', error);
    throw error;
  }
}
