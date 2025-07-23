'use client';

import { Clock, Play } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { startCourse } from '../_actions/progress';
import { CourseWithProgress } from '@/app/types';
import { Button } from '../util/Button';

export default function FreeLibrary({
  courses,
}: {
  courses: CourseWithProgress[];
}) {
  const { userId } = useAuth();
  const router = useRouter();

  const handleStart = async (slug: string, courseId: number) => {
    await startCourse(userId!, courseId);
    router.push(`/learn/${slug}`);
  };

  return (
    <div>
      {/* Course count header */}
      <div className="flex justify-end mb-6">
        <span className="text-sm text-gray-400">
          Courses Available: {courses.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => {
          const hasProgress = c.inUserCourse;
          const label = c.completed
            ? 'Review Course'
            : hasProgress
            ? 'Continue Course'
            : 'Start Course';

          return (
            <div
              key={c.id}
              className="flex flex-col h-full overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm"
            >
              {/* Header - Fixed height */}
              <div className="flex items-center justify-between p-4 flex-shrink-0">
                <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-400 truncate mr-2">
                  {c.category}
                </span>
                <span className="text-xs font-semibold text-green-400 flex-shrink-0">
                  FREE
                </span>
              </div>

              {/* Content - Flexible with consistent structure */}
              <div className="px-6 pb-6 flex flex-col flex-1">
                {/* Title - Fixed height container */}
                <div className="mb-2 h-14 flex items-start">
                  <h3 className="text-lg font-semibold text-white leading-tight break-words line-clamp-2">
                    {c.title}
                  </h3>
                </div>

                {/* Description - Fixed height container */}
                <div className="mb-4 h-16 flex items-start">
                  <p className="text-sm text-gray-400 leading-relaxed break-words line-clamp-3">
                    {c.description}
                  </p>
                </div>

                {/* Metadata - Fixed height */}
                <div className="mb-4 flex items-center space-x-4 text-xs text-gray-400 flex-shrink-0 h-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">20 minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{c.lecturesCount} lectures</span>
                  </div>
                </div>

                {/* Progress bar - Fixed height */}
                <div className="mb-4 flex-shrink-0">
                  <div className="mb-1 flex justify-between text-xs text-gray-400">
                    <span>{c.completed ? 'Completed' : 'Progress'}</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${c.progress}%`,
                        background:
                          'linear-gradient(to right, #3b82f6, #06b6d4)',
                      }}
                    />
                  </div>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-1"></div>

                {/* Button - Fixed at bottom */}
                <Button
                  className="w-full rounded-lg bg-blue-500 py-2 px-4 text-center font-medium text-white shadow-lg transition hover:bg-blue-600 hover:shadow-xl flex-shrink-0"
                  size="lg"
                  onClick={() => handleStart(c.slug, c.id)}
                >
                  <span className="break-words leading-tight">{label}</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
