// app/_components/CourseGrid.tsx
'use client';

import Link from 'next/link';
import { Clock, Play } from 'lucide-react';
import { CourseWithProgress } from '@/app/types';

export default function FreeLibrary({
  courses,
}: {
  courses: CourseWithProgress[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => (
        <div
          key={c.id}
          className="overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between p-4">
            <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-400">
              {c.category}
            </span>
            <span className="text-xs font-semibold text-green-400">FREE</span>
          </div>

          <div className="px-6 pb-6">
            <h3 className="mb-2 text-lg font-semibold text-white">{c.title}</h3>
            <p className="mb-4 text-sm text-gray-400 line-clamp-3">
              {c.description}
            </p>

            <div className="mb-4 flex items-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{c.timeLabel}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Play className="h-3 w-3" />
                <span>{c.lecturesCount} lectures</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1 flex justify-between text-xs text-gray-400">
                <span>{c.completed ? 'Completed' : 'Progress'}</span>
                <span>{c.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${c.progress}%`,
                    background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                  }}
                />
              </div>
            </div>

            <Link
              href={`/learn/${c.slug}`}
              className="block rounded-lg bg-blue-500 py-2 text-center font-medium text-white shadow-lg transition hover:bg-blue-600 hover:shadow-xl"
            >
              {c.completed
                ? 'Review Course'
                : c.progress
                ? 'Continue Course'
                : 'Start Course'}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
