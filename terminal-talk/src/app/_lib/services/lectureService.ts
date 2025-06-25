import prisma from '@/app/_lib/prisma';
import { unstable_cache } from 'next/cache';

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
// GET ALL LECTURES
export async function getAllLectures() {
  const fetchLectures = await prisma.lecture.findMany({});
  return fetchLectures;
}

// This GEts All Slugs From Lectures
export async function getAllLectureSlugs(): Promise<{ slug: string }[]> {
  return prisma.lecture.findMany({
    select: { slug: true },
  });
}

export const getLectureCached = unstable_cache(
  (slug: string) => getLectureBySlug(slug),
  ['lecture'], // static key prefix
  { revalidate: 60 * 60 } // refresh once per hour
);

export async function getLectureBySlug(slug: string) {
  return prisma.lecture.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      topic: true,
      description: true,
      transcript: true,
      audioUrl: true,
    },
  });
}
