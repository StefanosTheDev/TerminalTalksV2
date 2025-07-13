// at the top of your file (or in a shared types.ts)
import { Prisma } from '@prisma/client';

// app/types.ts
export interface CourseWithProgress {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;

  // reshaped/computed
  lecturesCount: number;
  totalSeconds: number;
  timeLabel: string;
  progress: number;
  completed: boolean;
}

// Extracted types for reusability (align with Prisma schema)
export interface Lecture {
  id: number;
  title: string;
  totalSeconds?: number | null;
  audioUrl: string;
  description: string;
}

export interface UserCourse {
  progress: number; // Percent (0-100) from schema
  completed: boolean;
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  lectures: Lecture[];
  userCourses: UserCourse[]; // Assuming populated via Prisma include
}
