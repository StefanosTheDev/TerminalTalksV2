// app/library/page.tsx
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/app/_lib/prisma';
import { LibraryClient } from '../../_components/library/Library';
export default async function LibraryPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) redirect('/sign-in');

  // Fetch all podcasts for this user
  const podcasts = await prisma.podcast.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      audioUrl: true,
      duration: true,
      format: true,
      createdAt: true,
    },
  });

  return <LibraryClient podcasts={podcasts} />;
}
