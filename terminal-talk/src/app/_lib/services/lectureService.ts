import prisma from '@/app/_lib/prisma';

// CREATE LECTURE
export async function createLecture({
  title,
  slug,
  topic,
  description,
  transcript,
  audioUrl,
}: {
  title: string;
  slug: string;
  topic: string;
  description: string;
  transcript: string;
  audioUrl: string;
}) {
  // prisma.lecture.create returns the newly-inserted row
  const lecture = await prisma.lecture.create({
    data: {
      // because the variable names match the column names, you can use shorthand
      title,
      slug,
      topic,
      description,
      transcript,
      audioUrl,
      // createdAt is auto-filled by Prisma’s @default(now()) in your schema
    },
  });

  return lecture;
}

export async function getAllLectures() {
  const fetchLectures = await prisma.lecture.findMany({});
  return fetchLectures;
}

// why was topic not be able to get imported
export async function getLectureBySlug(slug: string) {
  return prisma.lecture.findUnique({
    where: { slug },
  });
}
// import OpenAI from 'openai';
// import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
// import fs from 'fs';
// import path from 'path';
// import { Readable } from 'stream';
// import {
//   createBeginnerSystemPrompt,
//   createBeginnerUserPrompt,
//   createIntermediateSystemPrompt,
//   createIntermediateUserPrompt,
// } from '../util/prompt';
// import { cleanText } from '../util/util';

// // Generate the lecture script using OpenAI
// export async function generateLectureText({
//   title,
//   topic,
//   text,
//   language,
//   level,
// }: {
//   title: string;
//   topic: string;
//   text: string;
//   language: string;
//   level: string;
// }) {
//   const systemPrompt = createIntermediateSystemPrompt();
//   const userPrompt = createIntermediateUserPrompt({
//     title,
//     topic,
//     text,
//     language,
//     level,
//   });

//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_KEY!,
//   });

//   const completion = await openai.chat.completions.create({
//     model: 'gpt-4o-mini',
//     messages: [
//       { role: 'system', content: systemPrompt },
//       { role: 'user', content: userPrompt },
//     ],
//     temperature: 0.7,
//     max_tokens: 1000,
//   });

//   const script = completion.choices[0].message.content;
//   if (!script) throw new Error('No lecture generated');

//   return {
//     script,
//     audioScript: script.replace(/\[PAUSE\]/g, '<break time="1s"/>'),
//   };
// }

// // Convert ElevenLabs stream to buffer
// export async function streamToBuffer(stream: Readable): Promise<Buffer> {
//   const chunks: Buffer[] = [];
//   for await (const chunk of stream) {
//     chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
//   }
//   return Buffer.concat(chunks);
// }

// // // Generate audio and save as MP3 file in public/audio
// // export async function generateAudioFile({ text }: { text: string }) {
// //   // ✅ 1. Verify API key exists
// //   if (!process.env.ELEVENLABS_API_KEY) {
// //     throw new Error('ELEVENLABS_API_KEY is missing');
// //   }

// //   // // ✅ 2. Clean text to prevent 401 errors
// //   // const cleanedText = cleanText(text);
// //   // console.log('🧹 Text cleaned for ElevenLabs');

// //   const elevenlabs = new ElevenLabsClient({
// //     apiKey: process.env.ELEVENLABS_API_KEY!,
// //   });

// //   // ✅ 3. Use cleaned text in the stream
// //   const stream = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
// //     text, // ✅ Use cleaned text instead of raw text
// //     modelId: 'eleven_flash_v2_5',
// //     outputFormat: 'mp3_44100_128',
// //   });

// //   // const audioBuffer = await streamToBuffer(stream: Read);

// //   // Ensure public/audio directory exists
// //   const audioDir = path.join(process.cwd(), 'public/audio');
// //   if (!fs.existsSync(audioDir)) {
// //     fs.mkdirSync(audioDir, { recursive: true });
// //   }

// //   // Save file
// //   const filePath = path.join(audioDir, 'lecture.mp3');
// //   fs.writeFileSync(filePath, audioBuffer);

// //   return {
// //     success: true,
// //     path: '/audio/lecture.mp3',
// //   };
// // }

// export async function createLecture({
//   title,
//   topic,
//   text,
//   language,
//   level,
// }: {
//   title: string;
//   topic: string;
//   text: string;
//   language: string;
//   level: string;
// }) {
//   const { script, audioScript } = await generateLectureText({
//     title,
//     topic,
//     text,
//     language,
//     level,
//   });

//   // Generate and save audio, but don't return it
//   // await generateAudioFile({ text: audioScript }); // ✅ Fixed - passing audioScript as 'text'

//   // Just return the script (safe to serialize)
//   return {
//     success: true,
//     script,
//   };
// }

// export async function mockPost() {
//   const data = await prisma.lectures.create({})

// }
