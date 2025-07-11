// at the top of your file (or in a shared types.ts)
import { Prisma } from '@prisma/client';

export type CourseWithProgress = Prisma.CourseGetPayload<{
  include: {
    lectures: true;
    userCourses: {
      select: { progress: true; completed: true };
    };
  };
}>;

export interface Lecture {
  id: number;
  title: string;
  audioURL: string;
  description: string;
}

// Certificates ->
export interface UC {
  progress: number;
  completed: boolean;
}
// This uses Prisma’s helper to derive exactly the shape of what findMany({ include: { … } }) returns.
