// app/context/courseContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Course } from '../types';

interface CourseContextType {
  course: Course;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const CourseContext = createContext<CourseContextType | null>(null);

export function CourseProvider({
  course,
  children,
}: {
  course: Course;
  children: React.ReactNode;
}) {
  const savedPercent = course.userCourses[0]?.progress ?? 0;
  const maxIndex = Math.max(0, course.lectures.length - 1);
  const initialIndex = Math.min(
    Math.floor((savedPercent / 100) * maxIndex),
    maxIndex
  );

  // ❗ We do NOT reset this after mount
  const [index, setIndex] = useState(initialIndex);

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
