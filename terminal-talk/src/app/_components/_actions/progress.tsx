// app/_actions/progress.ts
'use server';
import prisma from '@/app/_lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function updateProgress({
  courseId,
  newIndex,
  totalLectures,
  lectureId,
}: {
  courseId: number;
  newIndex: number;
  totalLectures: number;
  lectureId?: number;
}) {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized: No user found');

  // Lookup User.id using clerkId (matches utilService.ts pattern)
  const userRecord = await prisma.user.findUnique({
    where: { clerkId: user.id },
    select: { id: true },
  });
  if (!userRecord) throw new Error('User not found in database');

  const userId = userRecord.id;
  const newPercent = Math.round((newIndex / totalLectures) * 100); // Index 1 → 25% (1/4 completed)
  const completed = newPercent === 100;

  try {
    console.log('updateProgress inputs:', {
      userId,
      courseId,
      newIndex,
      totalLectures,
      lectureId,
      newPercent,
      completed,
    });

    // Update UserCourse
    await prisma.userCourse.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { progress: newPercent, completed, updatedAt: new Date() },
      create: { userId, courseId, progress: newPercent, completed },
    });

    // Create Certificate if completed
    if (completed) {
      await prisma.certificate.upsert({
        where: { userId_courseId: { userId, courseId } },
        update: {},
        create: { userId, courseId },
      });
    }

    revalidatePath(`/course/${courseId}`);
    return { success: true, newPercent };
  } catch (error) {
    console.error('Progress update error:', error);
    throw new Error(`Failed to update progress:`);
  }
}
