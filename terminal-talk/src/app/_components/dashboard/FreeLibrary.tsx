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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => {
        const hasProgress = c.inUserCourse; // hasProgresss SHould Check If Its In UserCourse.iD
        const label = c.completed
          ? 'Review Course'
          : hasProgress
          ? 'Continue Course'
          : 'Start Course';

        return (
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
              <h3 className="mb-2 text-lg font-semibold text-white">
                {c.title}
              </h3>
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

              <Button
                className="block rounded-lg bg-blue-500 py-2 text-center font-medium text-white shadow-lg transition hover:bg-blue-600 hover:shadow-xl"
                size="lg"
                onClick={() => handleStart(c.slug, c.id)}
              >
                {label}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
