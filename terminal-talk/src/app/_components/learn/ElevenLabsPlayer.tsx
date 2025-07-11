// app/_components/learn/ElevenLabsPlayer.tsx
'use client';

import { useCourse } from '@/app/context/courseContext';
import { useEffect } from 'react';
import { Clock, BookOpen, Users } from 'lucide-react';

export default function ElevenLabsPlayer() {
  const { course, index, setIndex } = useCourse();
  const lectures = course.lectures;

  // ─── 1) Clamp index into a valid range ────────────────────────────────────────
  const maxIdx = Math.max(0, lectures.length - 1);
  const safeIndex = Math.min(Math.max(index, 0), maxIdx);

  // ─── 2) Pick the lecture via safeIndex ──────────────────────────────────────
  const lecture = lectures[safeIndex];

  // ─── 3) Guard: if lecture is somehow missing, show a placeholder ────────────
  if (!lecture) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400">Loading lesson…</p>
      </div>
    );
  }

  // ─── 4) Load the ElevenLabs script on mount ─────────────────────────────────
  useEffect(() => {
    const scriptId = 'elevenlabs-audionative-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elevenlabs.io/player/audioNativeHelper.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Lesson Header */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="p-8">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Lesson {safeIndex + 1}
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-400">
                {lecture.totalSeconds
                  ? `${Math.ceil(lecture.totalSeconds / 60)} minutes`
                  : '—'}
              </span>
            </div>

            {/* ─── Use lecture.title safely ─────────────────────────────────────── */}
            <h1 className="text-3xl font-bold text-white mb-4">
              {lecture.title}
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              {lecture.description ||
                'Dive deep into this comprehensive lesson covering essential concepts and practical applications.'}
            </p>

            <div className="flex items-center space-x-6 mt-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>
                  {lecture.totalSeconds
                    ? `${Math.ceil(lecture.totalSeconds / 60)} minutes`
                    : '—'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Beginner Level</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>2,847 students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player Container */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-b border-gray-700/50 backdrop-blur-sm p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-6 border border-gray-700/50">
            <div
              id="elevenlabs-audionative-widget"
              data-height="120"
              data-width="100%"
              data-frameborder="no"
              data-scrolling="no"
              data-publicuserid="5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f"
              data-playerurl={lecture.audioUrl}
              data-projectid="ub4yXuSKV1Q5RwbAxmLL"
              className="text-gray-300 text-sm leading-relaxed"
            >
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-4"></div>
                  </div>
                  <p className="text-gray-400">
                    Loading the{' '}
                    <a
                      href="https://elevenlabs.io/text-to-speech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 underline hover:text-sky-300 transition-colors"
                    >
                      Elevenlabs Text to Speech
                    </a>{' '}
                    AudioNative Player...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
