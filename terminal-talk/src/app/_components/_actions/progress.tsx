'use server';
import {
  checkStartCourse,
  updateProgressInDB,
} from '@/app/_lib/services/utilService';
/**
 * Upsert a record when a user starts a course,
 * looked up by courseId rather than slug.
 */
export async function startCourse(clerkId: string, courseId: number) {
  return checkStartCourse(clerkId, courseId);
}

export async function updateProgress({
  clerkId,
  courseId,
  lectureId,
}: {
  clerkId: string;
  courseId: number;
  lectureId: number;
}) {
  return updateProgressInDB({
    clerkId,
    courseId,
    lectureId,
  });
}
