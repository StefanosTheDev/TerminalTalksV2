import { CourseWithProgress } from '@/app/types'; // wherever you put it
import { UC } from '@/app/types';
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
