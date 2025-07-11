import { CourseWithProgress } from '@/app/types'; // wherever you put it
import { UC } from '@/app/types';
import prisma from '@/app/_lib/prisma';
export const secondsToLabel = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h ? `${h} h ${m} min` : `${m} min`;
};

// Need Review
export const fetchCoursesWithProgressStatus = async (
  clerkId: string
): Promise<CourseWithProgress[]> => {
  return prisma.course.findMany({
    include: {
      lectures: true,
      userCourses: {
        where: { user: { clerkId } },
        select: { progress: true, completed: true },
      },
    },
    orderBy: { title: 'asc' },
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
    (c: UC) => c.progress > 0 && c.progress < 100
  ).length;
  const completedCount = data.userCourses.filter((c: UC) => c.completed).length;

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

export const bumpProgress = () => {};
