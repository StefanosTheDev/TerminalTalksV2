// app/_components/library/LibraryClient.tsx
'use client';

import { useState } from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import Link from 'next/link';

interface Podcast {
  id: string;
  title: string;
  description: string | null;
  audioUrl: string;
  duration: number;
  format: string;
  createdAt: Date;
}

interface LibraryClientProps {
  podcasts: Podcast[];
}

export function LibraryClient({ podcasts }: LibraryClientProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handlePlayPause = (podcast: Podcast) => {
    if (currentlyPlaying === podcast.id) {
      audio?.pause();
      setCurrentlyPlaying(null);
    } else {
      audio?.pause();

      const newAudio = new Audio(podcast.audioUrl);
      newAudio.play();
      newAudio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
      });

      setAudio(newAudio);
      setCurrentlyPlaying(podcast.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-white">My Library</h1>
          <p className="text-sm text-gray-400 mt-1">
            {podcasts.length} {podcasts.length === 1 ? 'podcast' : 'podcasts'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {podcasts.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No podcasts created yet!
            </h3>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
              Start a conversation and generate your first podcast episode.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-[#0a0a0a] bg-white hover:bg-gray-100"
            >
              Create Your First Podcast
            </Link>
          </div>
        ) : (
          // Podcast list
          <div className="space-y-4">
            {podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1">
                      {podcast.title}
                    </h3>
                    {podcast.description && (
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {podcast.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(podcast.duration)}
                      </span>
                      <span>•</span>
                      <span>{podcast.format}</span>
                      <span>•</span>
                      <span>{formatDate(podcast.createdAt)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayPause(podcast)}
                    className="ml-4 flex-shrink-0 w-12 h-12 bg-white hover:bg-gray-100 text-[#0a0a0a] rounded-full flex items-center justify-center transition-colors"
                  >
                    {currentlyPlaying === podcast.id ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Show audio player when playing */}
                {currentlyPlaying === podcast.id && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <audio
                      controls
                      className="w-full"
                      src={podcast.audioUrl}
                      autoPlay
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
