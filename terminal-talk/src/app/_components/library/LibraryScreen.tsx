'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import placeholder from '@/app/public/TT.png';
import SearchBar from './SearchBar';
import LibraryBackground from './LibraryBackground';
import { openPopup } from '@/app/_components/library/openPopup';

let playerWin: Window | null = null;

type Item = {
  id: string;
  title: string;
  description: string | null;
  audioUrl: string;
  duration: number | null; // seconds
  createdAt: string; // ISO
};

export default function LibraryScreen({ items }: { items: Item[] }) {
  const [search, setSearch] = useState('');

  const formatDuration = (duration: number | null) => {
    if (!duration) return 'Unknown duration';
    const m = Math.floor(duration / 60);
    const s = Math.floor(duration % 60)
      .toString()
      .padStart(2, '0');
    return `${m}m ${s}s`;
  };

  const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

  const openWebPlayer = (p: Item) => {
    try {
      localStorage.setItem('tt:webplayer:nowPlaying', JSON.stringify(p));
    } catch {}
    if (isMobile()) {
      window.location.href = '/webplayer';
    } else {
      if (!playerWin || playerWin.closed) {
        playerWin = openPopup('/webplayer', 'TTWebPlayer', 520, 760);
        if (!playerWin) window.open('/webplayer', '_blank', 'noopener');
      } else {
        playerWin.focus();
      }
    }
  };

  // 🔎 Title-only live filter + relevance sorting
  type Scored<T> = { p: T; score: number };

  const filtered: Item[] = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return [...items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const now = Date.now();

    return items
      .map<Scored<Item> | null>((p) => {
        const title = p.title.toLowerCase();
        const idx = title.indexOf(q);
        if (idx === -1) return null;

        let score = 0;
        if (title === q) score += 300; // exact title
        if (idx === 0) score += 200; // starts with
        score += Math.max(0, 80 - idx); // earlier position = better

        // Recency boost (~30 days)
        const ageDays = (now - new Date(p.createdAt).getTime()) / 86_400_000;
        score += Math.max(0, 30 - ageDays);

        return { p, score };
      })
      .filter((x): x is Scored<Item> => x !== null) // <- type guard
      .sort((a, b) => b.score - a.score)
      .map((x) => x.p);
  }, [items, search]);

  return (
    <div className="relative h-[100dvh] bg-[#0a0a0a]">
      <LibraryBackground />

      {/* App shell */}
      <div className="relative z-10 flex h-full flex-col min-h-0">
        {/* Header */}
        <header className="flex-shrink-0 p-4 md:p-6">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
              <h1 className="text-xl md:text-2xl text-white font-medium">
                Podcast Library
              </h1>

              <div className="flex-1 max-w-md">
                <SearchBar
                  placeholder="Search podcast by title..."
                  onChange={(q) => setSearch(q)} // 👈 live update
                  onSearch={(q) => setSearch(q)} // enter/submit still works
                />
              </div>
            </div>
            {search && (
              <p className="mt-2 text-xs text-white/60">
                Showing {filtered.length} of {items.length} for “{search}”
              </p>
            )}
          </div>
        </header>

        {/* Scrollable episode list */}
        <main className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 pb-32 md:pb-24">
          {!filtered.length ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                No matches
              </h3>
              <p className="text-sm text-gray-500">Try a different title.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#1a1a1a]/30 backdrop-blur-sm border border-gray-800/30 hover:bg-[#1a1a1a]/50 hover:border-gray-700/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:items-start">
                    {/* Thumbnail */}
                    <div className="w-full md:w-20 h-48 md:h-20 rounded-lg overflow-hidden bg-gray-800/50 flex-shrink-0">
                      <Image
                        src={placeholder}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-white mb-2 line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                        {p.description ||
                          'Listen to discover insights and explore new perspectives.'}
                      </p>

                      {/* Duration and play button */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-gray-500">
                          {formatDuration(p.duration)}
                        </span>
                        <button
                          onClick={() => openWebPlayer(p)}
                          className="px-4 py-2 bg-[#ff9500] hover:bg-[#ff8000] text-black text-sm font-medium rounded-full transition-colors"
                        >
                          Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
