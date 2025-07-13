import { CourseWithProgress } from '@/app/types'; // wherever you put it
import prisma from '@/app/_lib/prisma';
import { UserCourse } from '@/app/types';
export const secondsToLabel = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h ? `${h} h ${m} min` : `${m} min`;
};

export const fetchCoursesWithProgressStatus = async (
  clerkId: string
): Promise<CourseWithProgress[]> => {
  const raw = await prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      category: true,
      lectures: {
        select: { id: true, totalSeconds: true }, // ← add `id` at least
      },
      userCourses: {
        where: { user: { clerkId } },
        select: { progress: true, completed: true },
        take: 1,
      },
    },
    orderBy: { title: 'asc' },
  });

  return raw.map((course) => {
    // number of lectures
    const lecturesCount = course.lectures.length;
    const totalSeconds = course.lectures.reduce(
      (sum, lec) => sum + (lec.totalSeconds ?? 0),
      0
    );

    // build a human-readable label, e.g. "125m 30s" or however you like
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeLabel = `${minutes}m ${seconds}s`;

    // pull out the first (and only) userCourse, or default to 0 / false
    const { progress = 0, completed = false } = course.userCourses[0] || {};

    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      category: course.category,

      lecturesCount,
      totalSeconds,
      timeLabel,
      progress,
      completed,
      status: completed
        ? 'completed'
        : progress > 0
        ? 'in-progress'
        : 'not-started',
    };
  });
};

//Need Review a: “Give me the one Course whose slug field equals this slug”
export const fetchCourse = async (clerkId: string, slug: string) => {
  return await prisma.course.findUnique({
    where: { slug },
    include: {
      lectures: true,
      userCourses: {
        where: { user: { clerkId } },
        select: { progress: true, completed: true },
      },
    },
  });
};

export const fetchStatsCardInfo = async (clerkId: string) => {
  const data = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      userCourses: { select: { progress: true, completed: true } },
      certificates: true,
    },
  });

  if (!data) throw new Error('User not found');

  const certificates = data.certificates.length;
  const inProgressCount = data.userCourses.filter(
    (c: UserCourse) => c.progress > 0 && c.progress < 100
  ).length;
  const completedCount = data.userCourses.filter(
    (c: UserCourse) => c.completed
  ).length;

  return {
    certificates,
    inProgressCount,
    completedCount,
  };
};

// Look at the Progress Value. Compare that to the Length
// So if Im 0 and my length is 10 my percent is 0/10 (Not Started)
// So if Im 1 Out of 5 Which means i completed 1 lecture. I am 20 %
export const calculateProgress = (
  progressVal: number,
  total: number
): number => {
  // index + 1 because if index === 0, you're 1/total done
  return Math.round((progressVal / total) * 100);
};

/**
 * Fetch all certificates for a user by their Clerk ID.
 * Returns an array of Certificate records, each including the related Course.
 */
export const fetchAccountCertificates = async (clerkId: string) => {
  return prisma.certificate.findMany({
    where: { user: { clerkId } },
    include: { course: true },
  });
}; // ADD these functions to your existing utilService.ts file

interface ProgressRecord {
  progress: number;
  completed: boolean;
}
export const getUserCourseProgress = async (
  clerkId: string,
  courseId: number
): Promise<ProgressRecord> => {
  // 1) look up your internal user.id via clerkId
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  if (!user) throw new Error('User not found');

  // 2) look up the one row and return just the two fields (with defaults)
  const rec = await prisma.userCourse.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
    select: { progress: true, completed: true },
  });

  return {
    progress: rec?.progress ?? 0,
    completed: rec?.completed ?? false,
  };
};

/**
 * Update the progress (and optionally completed) for an existing userCourse row.
 * Throws if either the user or the userCourse row doesn’t exist.
 */

export async function upsertProgress(
  clerkId: string,
  courseId: number,
  progress: number,
  completed: boolean
): Promise<void> {
  // — lookup internal user.id
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  if (!user) throw new Error('User not found');

  // — upsert the progress
  await prisma.userCourse.upsert({
    where: {
      userId_courseId: { userId: user.id, courseId },
    },
    create: {
      userId: user.id,
      courseId,
      progress,
      completed,
    },
    update: {
      progress,
      completed,
    },
  });

  // — if they just hit 100%, issue (or ensure) a certificate
  if (completed) {
    await prisma.certificate.upsert({
      where: {
        userId_courseId: { userId: user.id, courseId },
      },
      create: {
        userId: user.id,
        courseId,
      },
      update: {}, // no fields to change if it already exists
    });
  }
}
