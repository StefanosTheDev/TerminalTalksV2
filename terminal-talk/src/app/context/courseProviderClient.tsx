'use client';

import { ReactNode } from 'react';
import { CourseProvider } from '@/app/context/courseContext';

export function CourseProviderClient({
  course,
  children,
}: {
  course: Parameters<typeof CourseProvider>[0]['course'];
  children: ReactNode;
}) {
  return <CourseProvider course={course}>{children}</CourseProvider>;
}
