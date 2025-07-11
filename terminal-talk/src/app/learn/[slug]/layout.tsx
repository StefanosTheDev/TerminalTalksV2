import React from 'react';
import { redirect } from 'next/navigation';
import { fetchCourse } from '@/app/_lib/services/utilService';
import { currentUser } from '@clerk/nextjs/server';
import { CourseProvider } from '../../context/courseContext';

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // 1) Ensure user is signed in
  const user = await currentUser();
  if (!user) redirect('/auth/login');

  // 2) Fetch the course + your progress
  const courseData = await fetchCourse(user.id, params.slug);
  if (!courseData) redirect('/not-found');

  // 3) Shape the minimal “course” object the context needs
  const course = {
    id: courseData.id,
    slug: courseData.slug,
    title: courseData.title,
    lectures: courseData.lectures,
  };

  // 4) Wrap children in the provider
  return <CourseProvider course={course}>{children}</CourseProvider>;
}
