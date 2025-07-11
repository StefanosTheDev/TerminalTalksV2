import { Clock, Play, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  fetchCoursesWithProgressStatus,
  secondsToLabel,
} from '@/app/_lib/services/utilService';

/* helper to turn seconds → “h m” or “m” */

export default async function FreeLibrary() {
  /* 1. authenticate */
  const user = await currentUser();
  if (!user) redirect('/auth/login');

  const courses = await fetchCoursesWithProgressStatus(user.id);
  return (
    <section className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center text-2xl font-bold text-white">
          <BookOpen className="mr-2 h-6 w-6 text-blue-400" />
          Free Library
        </h2>
        <span className="text-gray-400">
          {courses.length} courses available{' '}
        </span>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => {
          const uc = c.userCourses[0];
          const progress = uc?.progress ?? 0;
          const completed = uc?.completed ?? false;
          /* ── NEW: sum lecture durations ── */
          const totalSeconds = c.lectures.reduce(
            (sum, l) => sum + (l.totalSeconds ?? 0),
            0
          );
          const timeLabel = secondsToLabel(totalSeconds);
          return (
            <div
              key={c.id}
              className="overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm"
            >
              {/* badge row */}
              <div className="flex items-center justify-between p-4">
                <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-400">
                  {c.category}
                </span>
                <span className="text-xs font-semibold text-green-400">
                  FREE
                </span>
              </div>
              {/* body */}
              <div className="px-6 pb-6">
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {c.title}
                </h3>
                <p className="mb-4 text-sm text-gray-400 line-clamp-3">
                  {c.description}
                </p>
                {/* stats */}
                <div className="mb-4 flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{timeLabel}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="h-3 w-3" />
                    <span>{c.lectures.length} lectures</span>
                  </div>
                </div>

                {/* progress bar */}
                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-xs text-gray-400">
                    <span>{completed ? 'Completed' : 'Progress'}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                        background:
                          'linear-gradient(to right, #3b82f6, #06b6d4)',
                      }}
                    />
                  </div>
                </div>

                {/* CTA  Something to go back and review but u can stack these / multiple if else*/}
                <Link
                  href={`/learn/${c.slug}`}
                  className="block rounded-lg bg-blue-500 py-2 text-center font-medium text-white shadow-lg transition hover:bg-blue-600 hover:shadow-xl"
                >
                  {completed
                    ? 'Review Course'
                    : progress
                    ? 'Continue Course'
                    : 'Start Course'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
