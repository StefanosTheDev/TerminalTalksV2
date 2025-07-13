// app/learn/[slug]/layout.tsx   ← adjust the path to match your pages
import { redirect } from 'next/navigation';
import { fetchCourse } from '@/app/_lib/services/utilService';
import { currentUser } from '@clerk/nextjs/server';
import { CourseProviderClient } from '@/app/context/courseProviderClient';

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

  // 3) Shape the minimal “course” object
  const course = {
    id: courseData.id,
    slug: courseData.slug,
    title: courseData.title,
    lectures: courseData.lectures,
    userCourses: courseData.userCourses,
    clerkId: user.id, // Add for upsertProgress
  };

  // 4) Wrap children in the provider
  return (
    <CourseProviderClient course={course}>{children}</CourseProviderClient>
  );
}
