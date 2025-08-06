// app/library/_components/LibraryClient.tsx
'use client';

import { useState } from 'react';
import { Play, Pause, Clock } from 'lucide-react';

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
      // Pause current
      audio?.pause();
      setCurrentlyPlaying(null);
    } else {
      // Stop any current audio
      audio?.pause();

      // Play new
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">My Library</h1>
          <p className="text-sm text-gray-600 mt-1">
            {podcasts.length} {podcasts.length === 1 ? 'podcast' : 'podcasts'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {podcasts.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No podcasts created yet!
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Start a conversation and generate your first podcast episode.
            </p>
            <a
              href="/chat"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800"
            >
              Create Your First Podcast
            </a>
          </div>
        ) : (
          // Podcast list
          <div className="space-y-4">
            {podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {podcast.title}
                    </h3>
                    {podcast.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
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
                    className="ml-4 flex-shrink-0 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
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
                  <div className="mt-4 pt-4 border-t border-gray-200">
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
