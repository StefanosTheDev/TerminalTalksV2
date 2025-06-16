import OpenAI from 'openai';
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
// import 'dotenv/config';

export async function createLecture({
  title,
  topic,
  text,
  language,
  level,
}: {
  title: string;
  topic: string;
  text: string;
  language: string;
  level: string;
}) {
  //   const lectureText = generateLectureText(title, topic, text, language, level);
  //   const lectureAudio = text;
}

// User Says Hey This my Title, Topic Of Desired, & Supported Text Providing Context,
// Step 1: Pass The Content Into Generate Lecture Text.
// Step 2: Return The Value To Generate AudioFile
// Step 3: Return an OBJ: {lectureText: '', audioFileUrl: ''}

async function generateLectureText({
  title,
  topic,
  text,
  language,
  level,
}: {
  title: string;
  topic: string;
  text: string;
  language: string;
  level: string;
}) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });
  const completion = openai.chat.completions.create({
    model: 'gpt-4o-mini',
    store: true,
    messages: [{ role: 'user', content: 'write a haiku about ai' }],
  });
  completion.then((result) => console.log(result.choices[0].message));
}

async function generateAudioFile() {
  const elevenlabs = new ElevenLabsClient();
  const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
    text: 'The first move is what sets everything in motion.',
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
  });

  await play(audio);
}
