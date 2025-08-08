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
  inUserCourse: boolean;
}

// Extracted types for reusability (align with Prisma schema)
export interface Lecture {
  id: number;
  title: string;
  totalSeconds?: number | null;
  projectId: string;
  description: string;
}
export interface CourseContextType {
  course: Course;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
}
export interface UserCourse {
  progress: number; // Percent (0-100) from schema
  completed: boolean;
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  lectures: Lecture[];
  userCourses: UserCourse[]; // Assuming populated via Prisma include
  lecProgress: number[];
}

export interface ProgressRecord {
  progress: number;
  completed: boolean;
}

export interface LectureProgress {
  id: number;
  userId: number;
}
export interface UserCourseV2 {
  id: number;
  title: string;
  topic: string;
  description: string;
  transcript: string;
  audioUrl: string;
  totalSeconds: number;
  courseId: number;
  lectureProgress: LectureProgress[];
}
export type UserPodcastDTO = {
  id: string;
  title: string;
  description: string | null;
  audioUrl: string;
  duration: number | null;
  createdAt: string; // ISO
};
