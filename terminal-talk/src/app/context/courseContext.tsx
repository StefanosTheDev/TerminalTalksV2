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
      totalSeconds?: number;
      audioUrl?: string;
      description: string;
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
  const [index, setIndex] = useState(0);

  // reset index to 0 whenever we load a new course
  useEffect(() => {
    setIndex(0);
  }, [course.slug]);

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
