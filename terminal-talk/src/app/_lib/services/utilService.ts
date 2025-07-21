import prisma from '@/app/_lib/prisma';
import { UserCourse } from '@/app/types';

export const fetchCoursesWithProgressStatus = async (clerkId: string) => {
  const data = await prisma.course.findMany({
    include: {
      lectures: { select: { id: true, totalSeconds: true } },
      userCourses: {
        where: { user: { clerkId } },
        select: { progress: true, completed: true },
      },
    },
  });

  const totalSeconds = data
    .flatMap((course) => course.lectures)
    .reduce((sum, lec) => sum + (lec.totalSeconds ?? 0), 0);

  const timeLabel = calculateCourseTime(totalSeconds);

  return data.map((course) => {
    const lecturesCount = course.lectures.length;
    //It's a one-liner that safely pulls progress and completed from userCourses[0],
    // with default fallbacks if no data exists — super clean and safe.
    const { progress = 0, completed = false } = course.userCourses[0] || {};
    // NEW: flag whether the user is enrolled in this course
    const inUserCourse = course.userCourses.length > 0;
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      category: course.category,

      // Computed Variables
      lecturesCount,
      totalSeconds,
      timeLabel,
      inUserCourse,
      progress,
      completed,
    };
  });
};
export function calculateCourseTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}
export const fetchCourse = async (clerkId: string, slug: string) => {
  // 1. Grab the course, its lectures, and the user's course‐level progress
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      lectures: {
        include: {
          LectureProgress: {
            where: { user: { clerkId } },
            select: { lectureId: true },
          },
        },
      },
      userCourses: {
        where: { user: { clerkId } },
        select: { progress: true, completed: true },
      },
    },
  });
  if (!course) return null;

  // 2. Collect just the IDs of lectures this user has any progress on:
  //    - filter to only those lectures whose LectureProgress array isn’t empty
  //    - map each remaining lecture to its .id
  const initialLectureProgress = course.lectures
    .filter((lec) => lec.LectureProgress.length > 0)
    .map((lec) => lec.id);

  console.log('🏁 initialLectureProgress:', initialLectureProgress);

  // 3. Shape the final payload
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description, // include the course description
    category: course.category,
    // strip out the nested LectureProgress objects before sending to the client

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lectures: course.lectures.map(({ LectureProgress, ...lec }) => lec),
    userCourses: course.userCourses,
    initialLectureProgress,
    clerkId,
  };
};

export const fetchStatsCardInfo = async (clerkId: string) => {
  console.log('⛔️ [prisma] DATABASE_URL=', process.env.DATABASE_URL);
  const data = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      userCourses: { select: { progress: true, completed: true } },
      certificates: true,
    },
  });

  if (!data) throw new Error('User not found');

  const certificates = data.certificates.length;

  // ANY progress < 100 (including 0%) counts as "in progress"
  const inProgressCount = data.userCourses.filter(
    (uc: UserCourse) => uc.progress < 100
  ).length;

  const completedCount = data.userCourses.filter(
    (uc: UserCourse) => uc.completed
  ).length;

  return {
    certificates,
    inProgressCount,
    completedCount,
  };
};
export const fetchAccountCertificates = async (clerkId: string) => {
  return prisma.certificate.findMany({
    where: { user: { clerkId } },
    include: { course: true },
  });
};
export const checkStartCourse = async (
  clerkId: string,
  courseId: number
): Promise<{
  userId: number;
  courseId: number;
  progress: number;
  completed: boolean;
  updatedAt: Date;
}> => {
  // 1. Find the user by Clerk ID
  const user = await prisma.user.findUnique({
    where: { clerkId },
  });
  if (!user) throw new Error(`User with clerkId "${clerkId}" not found`);

  // 2. (Optional) Verify the course exists
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });
  if (!course) throw new Error(`Course with id "${courseId}" not found`);

  // 3. Upsert the UserCourse (create if missing, skip update otherwise)
  const userCourse = await prisma.userCourse.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
    update: {}, // no-op update
    create: {
      userId: user.id,
      courseId,
      progress: 0,
      completed: false,
      updatedAt: new Date(),
    },
  });

  return userCourse;
};
/**
 * Marks a lecture as completed, updates overall course progress,
 * and issues a certificate if 100% complete.
 */
export async function updateProgressInDB({
  clerkId,
  courseId,
  lectureId,
}: {
  clerkId: string;
  courseId: number;
  lectureId: number;
}) {
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error('User not found');

  const userId = user.id;
  let isCourseCompleted = false;

  // ✅ 1. Fetch the current completion state
  const existingUserCourse = await prisma.userCourse.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  await prisma.$transaction(async (tx) => {
    // ✅ 2. Upsert LectureProgress
    await tx.lectureProgress.upsert({
      where: { userId_lectureId: { userId, lectureId } },
      update: {},
      create: { userId, lectureId },
    });

    // ✅ 3. Count progress
    const completedCount = await tx.lectureProgress.count({
      where: { userId, lecture: { courseId } },
    });

    const totalLectures = await tx.lecture.count({ where: { courseId } });
    const progress = Math.round((completedCount / totalLectures) * 100);
    const completed = progress === 100;

    // ✅ 4. Update or create UserCourse
    await tx.userCourse.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { progress, completed, updatedAt: new Date() },
      create: { userId, courseId, progress, completed },
    });

    // ✅ 5. Only mark isCourseCompleted = true if it changed from false → true
    if (completed && !existingUserCourse?.completed) {
      await tx.certificate.upsert({
        where: { userId_courseId: { userId, courseId } },
        update: {},
        create: { userId, courseId },
      });
      isCourseCompleted = true; // 🎉 Trigger one-time action
    }
  });

  return { isCourseCompleted };
}
