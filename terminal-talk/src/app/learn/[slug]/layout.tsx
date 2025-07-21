// src/app/learn/[slug]/layout.tsx
import { redirect } from 'next/navigation';
import { fetchCourse } from '@/app/_lib/services/utilService';
import { currentUser } from '@clerk/nextjs/server';
import { CourseProviderClient } from '@/app/context/courseProviderClient';

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  // resolve the dynamic slug
  const { slug } = await params;

  // 1) Ensure user is signed in
  const user = await currentUser();
  if (!user) redirect('/auth/login');

  // 2) Fetch the course + per-lecture progress
  const courseData = await fetchCourse(user.id, slug);
  if (!courseData) redirect('/not-found');

  // 3) Render
  return (
    <CourseProviderClient
      course={{
        id: courseData.id,
        slug: courseData.slug,
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        lectures: courseData.lectures,
        lecProgress: courseData.initialLectureProgress,
        userCourses: courseData.userCourses,
      }}
    >
      {children}
    </CourseProviderClient>
  );
}
