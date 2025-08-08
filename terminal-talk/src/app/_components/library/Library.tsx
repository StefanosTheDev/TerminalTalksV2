'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Clock,
  Calendar,
  Headphones,
  Download,
  MoreVertical,
} from 'lucide-react';

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
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const togglePlay = (podcastId: string) => {
    if (playingId === podcastId) {
      audioRefs.current[podcastId]?.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing audio
      if (playingId && audioRefs.current[playingId]) {
        audioRefs.current[playingId].pause();
      }

      // Play the selected audio
      audioRefs.current[podcastId]?.play();
      setPlayingId(podcastId);
    }
  };

  const handleTimeUpdate = (podcastId: string, time: number) => {
    setCurrentTime((prev) => ({ ...prev, [podcastId]: time }));
  };

  const handleAudioEnd = (podcastId: string) => {
    setPlayingId(null);
    setCurrentTime((prev) => ({ ...prev, [podcastId]: 0 }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              My Audio Library
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {podcasts.length}{' '}
              {podcasts.length === 1 ? 'recording' : 'recordings'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {podcasts.length === 0 ? (
          <div className="text-center py-12">
            <Headphones className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No recordings yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Create your first audio recording to see it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast) => {
              const progress = currentTime[podcast.id]
                ? (currentTime[podcast.id] / podcast.duration) * 100
                : 0;
              const isPlaying = playingId === podcast.id;

              return (
                <div
                  key={podcast.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Audio Thumbnail/Waveform Area */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    {/* Play Button Overlay */}
                    <button
                      onClick={() => togglePlay(podcast.id)}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-gray-900 ml-0.5" />
                        ) : (
                          <Play className="w-6 h-6 text-gray-900 ml-1" />
                        )}
                      </div>
                    </button>

                    {/* Waveform visualization (decorative) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="flex items-center gap-1">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-white rounded-full"
                            style={{
                              height: `${Math.random() * 60 + 20}px`,
                              opacity: isPlaying ? 1 : 0.5,
                              animation: isPlaying
                                ? `pulse ${
                                    Math.random() * 0.5 + 0.5
                                  }s ease-in-out infinite`
                                : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Format Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-black/20 backdrop-blur-sm text-white text-xs font-medium rounded">
                        {podcast.format.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {podcast.title}
                    </h3>
                    {podcast.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {podcast.description}
                      </p>
                    )}

                    {/* Progress Bar */}
                    {progress > 0 && (
                      <div className="mt-3">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(podcast.duration)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(podcast.createdAt)}
                        </span>
                      </div>

                      {/* Actions */}
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Hidden Audio Element */}
                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[podcast.id] = el;
                    }}
                    src={podcast.audioUrl}
                    onTimeUpdate={(e) =>
                      handleTimeUpdate(podcast.id, e.currentTarget.currentTime)
                    }
                    onEnded={() => handleAudioEnd(podcast.id)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.3);
          }
        }
      `}</style>
    </div>
  );
}
