// app/learn/[slug]/layout.tsx
import React from 'react';
import { redirect } from 'next/navigation';
import { fetchCourse } from '@/app/_lib/services/utilService';
import { currentUser } from '@clerk/nextjs/server';
import { CourseProvider } from '@/app/context/courseContext';

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

  // 2) Await the dynamic API before using it
  const { slug } = await params;

  // 3) Fetch the course + your progress
  const courseData = await fetchCourse(user.id, slug);
  if (!courseData) redirect('/not-found');

  // 4) Shape the minimal “course” object the context needs
  const course = {
    id: courseData.id,
    slug: courseData.slug,
    title: courseData.title,
    lectures: courseData.lectures,
    userCourses: courseData.userCourses,
  };

  // 5) Wrap children in the provider
  return <CourseProvider course={course}>{children}</CourseProvider>;
}
