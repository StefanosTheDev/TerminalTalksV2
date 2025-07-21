// app/_components/learn/ElevenLabsPlayer.tsx
'use client';

import { useCourse } from '@/app/context/courseContext';
import { Clock, BookOpen, Users } from 'lucide-react';

export default function ElevenLabsPlayer() {
  const { course, index } = useCourse();
  const lectures = course.lectures;

  /* ── Index safety ─────────────────────────────────────────────── */
  const maxIdx = Math.max(0, lectures.length - 1);
  const safeIndex = Math.min(Math.max(index, 0), maxIdx);
  const lecture = lectures[safeIndex];

  if (!lecture) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400">Loading lesson…</p>
      </div>
    );
  }

  /* ── Inject ElevenLabs helper once ────────────────────────────── */

  return (
    <div className="flex-1 flex flex-col min-w-0 rounded-2xl overflow-hidden">
      {/* ═════════════ Header ═════════════ */}
      <div className="bg-gray-900/60 border-b border-gray-700/50 backdrop-blur-sm rounded-t-2xl">
        <div className="p-8 max-w-4xl">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-sky-600 bg-sky-600/10 px-3 py-1 rounded-full border border-sky-600/20">
              Lesson {safeIndex + 1}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">
              {lecture.totalSeconds
                ? `${Math.ceil(lecture.totalSeconds / 60)} minutes`
                : '—'}
            </span>
          </div>

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

      {/* ═════════════ Audio Player ═════════════ */}
      <div className="bg-gray-900/50 backdrop-blur-sm p-6 flex-1 rounded-b-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl ring-1 ring-gray-700/50 p-6 min-h-[120px] flex items-center justify-center">
            {/* ElevenLabs will replace this div with an iframe */}
            <div
              id="elevenlabs-audionative-widget"
              data-width="100%"
              data-height="120"
              data-scrolling="no"
              data-publicuserid="5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f"
              data-playerurl="https://elevenlabs.io/player/index.html"
              data-projectid="XHHtSSPbIYiMiYG6NyUU"
              className="w-full text-gray-300 text-sm leading-relaxed overflow-hidden rounded-2xl"
              data-title="Stefanos"
            >
              {/* Fallback while the script swaps in the iframe */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-sky-600 rounded-full animate-pulse mb-4" />
                <p className="text-gray-400 text-center">
                  Loading the{' '}
                  <a
                    href="https://elevenlabs.io/text-to-speech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-sky-600 hover:text-sky-500"
                  >
                    ElevenLabs Text-to-Speech
                  </a>{' '}
                  player…
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
