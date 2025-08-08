import LibraryScreen from '@/app/_components/library/LibraryScreen';
import { loadUserPodcasts } from '@/app/_lib/services/libraryService';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
export default async function LibraryPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }
  const podcasts = await loadUserPodcasts(user.id);

  // Just need to get into this a bit more.
  const safePodcasts = podcasts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    duration: p.duration ? Number(p.duration) : null,
  }));

  return <LibraryScreen items={safePodcasts} />;
}
