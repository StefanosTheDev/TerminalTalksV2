import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/app/_lib/prisma';
import { TTPlayer } from '@/app/_components/library/TTplayer';
type Params = { params: { id: string } };

export default async function EpisodePage({ params }: Params) {
  const p = await prisma.podcast.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      description: true,
      audioUrl: true,
      createdAt: true,
      duration: true,
    },
  });

  console.log(p);

  if (!p) return notFound();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link href="/library" className="text-sm text-blue-600 hover:underline">
        ← Back to Library
      </Link>

      <div className="mt-4 rounded-2xl border bg-white/70 p-5 shadow-sm ring-1 ring-black/5 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={p.title}
            src="/placeholder-cover.png"
            className="h-24 w-24 rounded-xl object-cover ring-1 ring-black/10 dark:ring-white/10"
          />
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">{p.title}</h1>
            <div className="mt-1 text-xs text-gray-500">
              <time dateTime={p.createdAt.toISOString()}>
                {p.createdAt.toLocaleDateString()}
              </time>
              {typeof p.duration === 'number' ? (
                <> • {Math.floor(p.duration / 60)}m</>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <TTPlayer src={p.audioUrl} />
        </div>

        {p.description ? (
          <p className="mt-3 text-sm text-gray-600">{p.description}</p>
        ) : null}
      </div>
    </div>
  );
}
