// app/context/courseContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface CourseContextType {
  course: {
    id: number;
    slug: string;
    title: string;
    lectures: Array<{
      id: number;
      title: string;
      totalSeconds?: number | null;
      audioUrl?: string;
      description: string;
    }>;
    userCourses: Array<{
      progress: number;
      completed: boolean;
    }>;
  };
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const CourseContext = createContext<CourseContextType | null>(null);

export function CourseProvider({
  course,
  children,
}: {
  course: CourseContextType['course'];
  children: ReactNode;
}) {
  // 1) Pull the saved count
  const savedProgress = course.userCourses[0]?.progress ?? 0;

  // 2) Compute the max valid index
  const maxIndex = Math.max(0, course.lectures.length - 1);

  // 3) Clamp savedProgress so it never exceeds maxIndex
  const initialIndex = Math.min(savedProgress, maxIndex);

  // 4) Seed your UI index
  const [index, setIndex] = useState(initialIndex);

  // 5) Reset on course change or if savedProgress updates
  useEffect(() => {
    setIndex(Math.min(course.userCourses[0]?.progress ?? 0, maxIndex));
  }, [course.slug, course.userCourses, maxIndex]);

  return (
    <CourseContext.Provider value={{ course, index, setIndex }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return ctx;
}
