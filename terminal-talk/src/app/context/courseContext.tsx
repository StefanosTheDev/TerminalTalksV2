'use client';

import React, { createContext, useContext, useState } from 'react';
import { Course, CourseContextType } from '@/app/types';

const CourseContext = createContext<CourseContextType | null>(null);

export function CourseProvider({
  course: initialCourse,
  children,
}: {
  course: Course;
  children: React.ReactNode;
}) {
  const [course, setCourse] = useState(initialCourse);
  const [index, setIndex] = useState(0);

  return (
    <CourseContext.Provider value={{ course, setCourse, index, setIndex }}>
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
