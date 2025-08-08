'use client';

import { useState } from 'react';
import Image from 'next/image';
import placeholder from '@/app/public/TT.png';
import { TTPlayer } from './TTplayer';
import SearchBar from './SearchBar';

type Item = {
  id: string;
  title: string;
  description: string | null;
  audioUrl: string;
  duration: number | null;
  createdAt: string; // ISO
};

export default function LibraryScreen({ items }: { items: Item[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const current = currentIndex == null ? null : items[currentIndex];

  return (
    <div className="relative h-[100dvh] bg-[#0a0a0a]">
      {/* Background Gradient - Same as landing page but different placement */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 1920 1080"
        >
          <defs>
            <radialGradient id="libGlow1" cx="20%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="libGlow2" cx="80%" cy="70%" r="60%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="libGlow3" cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="libGlow4" cx="90%" cy="20%" r="40%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>

            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
            </filter>
          </defs>

          {/* Background */}
          <rect width="100%" height="100%" fill="#0a0a0a" />

          {/* Main gradient layers */}
          <g filter="url(#blur)" opacity="0.8">
            <ellipse
              cx="20%"
              cy="30%"
              rx="40%"
              ry="50%"
              fill="url(#libGlow1)"
            />
            <ellipse
              cx="80%"
              cy="70%"
              rx="50%"
              ry="40%"
              fill="url(#libGlow2)"
            />
            <ellipse
              cx="50%"
              cy="100%"
              rx="60%"
              ry="30%"
              fill="url(#libGlow3)"
            />
            <ellipse
              cx="90%"
              cy="20%"
              rx="30%"
              ry="40%"
              fill="url(#libGlow4)"
            />
          </g>
        </svg>
      </div>

      {/* Very subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* App shell: header + scroll area + sticky footer */}
      <div className="relative z-10 flex h-full flex-col min-h-0">
        {/* Header (non-scrolling) */}
        <header className="flex-shrink-0 p-6">
          <div className="mb-8">
            <div className="flex gap-6 text-lg">
              <button className="text-white font-medium pb-2 border-b-2 border-white">
                Podcast Library
              </button>

              <SearchBar
                placeholder="Search your library..."
                onSearch={(query) => console.log('Searching for:', query)}
              />
            </div>
          </div>
        </header>

        {/* Scrollable episode list */}
        <main className="flex-1 min-h-0 overflow-y-auto px-6 pb-24">
          {!items.length ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-gray-800/50 bg-[#1a1a1a]/80 backdrop-blur-xl">
              <div className="text-center">
                <div className="mb-3 text-6xl">🎧</div>
                <p className="text-lg font-medium text-gray-300">
                  No episodes yet
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Start creating to build your library
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((p, i) => (
                <div key={p.id} className="group">
                  <div className="flex gap-4 pb-6 border-b border-gray-800/50">
                    {/* Album Art */}
                    <button
                      onClick={() => setCurrentIndex(i)}
                      className="relative flex-shrink-0 w-32 h-32 rounded-lg shadow-xl transition-transform hover:scale-105"
                    >
                      <Image
                        alt={p.title}
                        src={placeholder}
                        fill
                        className="object-cover"
                      />
                      {/* Play overlay */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                          hoveredId === p.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <span className="rounded-full bg-[#0a33f9] p-3 text-white shadow-xl">
                          ▶
                        </span>
                      </div>
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        By: Terminal Talks AI
                      </p>

                      {/* Description */}
                      <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                        {p.description ||
                          'An engaging podcast episode created with Terminal Talks AI. Listen to discover insights and explore new perspectives.'}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        {typeof p.duration === 'number'
                          ? `${Math.floor(p.duration / 60)}m ${
                              p.duration % 60
                            }s left`
                          : 'Duration unknown'}
                      </p>
                      <button
                        onClick={() => setCurrentIndex(i)}
                        className="mt-2 px-6 py-2 bg-[#ff9500] hover:bg-[#ff8000] text-black font-medium rounded-full transition-colors"
                      >
                        Listen now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Sticky footer */}
        {current && (
          <footer className="sticky bottom-0 z-20 border-t border-gray-800/50 bg-[#0a0a0a]/80 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-2 py-1">
              <TTPlayer src={current.audioUrl} />
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
