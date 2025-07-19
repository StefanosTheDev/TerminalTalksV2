// app/context/courseProviderClient.tsx
'use client';

import { ReactNode } from 'react';
import { CourseProvider } from '@/app/context/courseContext';
import { Course } from '@/app/types';

export function CourseProviderClient({
  course,
  children,
}: {
  course: Course;
  children: ReactNode;
}) {
  return <CourseProvider course={course}>{children}</CourseProvider>;
}
