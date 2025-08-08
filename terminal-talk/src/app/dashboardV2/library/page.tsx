import prisma from '@/app/_lib/prisma';
import LibraryScreen from '@/app/_components/library/LibraryScreen';
export default async function LibraryPage() {
  const items = await prisma.podcast.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      audioUrl: true,
      duration: true,
      createdAt: true,
    },
  });

  // serialize Date for the client
  const safeItems = items.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
  }));

  return <LibraryScreen items={safeItems} />;
}
