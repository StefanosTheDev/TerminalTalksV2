import 'server-only';
import prisma from '@/app/_lib/prisma';

export async function loadUserPodcasts(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return [];

  const podcasts = await prisma.podcast.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      audioUrl: true,
      duration: true, // Prisma.Decimal? Convert below
      format: true,
      createdAt: true,
    },
  });
  return podcasts;
}
