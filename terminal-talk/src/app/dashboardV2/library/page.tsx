import Link from 'next/link';
import prisma from '@/app/_lib/prisma';
import TT from '@/app/public/TT.png';
import Image from 'next/image';

export default async function LibraryPage() {
  const items = await prisma.podcast.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      audioUrl: true,
      createdAt: true,
      duration: true,
    },
  });

  if (!items.length) {
    return <div className="p-6 text-sm text-gray-500">No audio yet.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Library</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/dashboardV2/library${p.id}`}
            className="group rounded-2xl border bg-white/70 shadow-sm ring-1 ring-black/5 transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="p-4">
              <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  alt={p.title}
                  src={TT} // pass StaticImageData directly
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{p.title}</div>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {p.description ?? '—'}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  <time dateTime={p.createdAt.toISOString()}>
                    {p.createdAt.toLocaleDateString()}
                  </time>
                  {typeof p.duration === 'number' ? (
                    <> • {Math.floor(p.duration / 60)}m</>
                  ) : null}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
