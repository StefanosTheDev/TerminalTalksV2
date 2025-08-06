'use client';

import { Clock, Play, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { startCourse } from '../_actions/progress';
import { CourseWithProgress } from '@/app/types';

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

  // Category color mapping
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Backend Framework': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Problem Solving': 'bg-blue-50 text-blue-700 border-blue-200',
      Frontend: 'bg-purple-50 text-purple-700 border-purple-200',
      DevOps: 'bg-orange-50 text-orange-700 border-orange-200',
      Database: 'bg-rose-50 text-rose-700 border-rose-200',
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };
  return (
    <div>
      {/* Course count header with subtle accent */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-gray-400" />
          Available Courses
        </h2>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span className="text-sm text-gray-600">
            {courses.length} free courses
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => {
          const hasProgress = c.inUserCourse;
          const label = c.completed
            ? 'Review Course'
            : hasProgress
            ? 'Continue'
            : 'Start Learning';

          return (
            <div
              key={c.id}
              className="group flex flex-col h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all hover:border-gray-300"
            >
              {/* Header with dynamic category colors */}
              <div className="relative p-4 border-b border-gray-100">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent" />

                <div className="relative flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium border ${getCategoryColor(
                      c.category
                    )}`}
                  >
                    {c.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    FREE
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-5 flex flex-col flex-1">
                {/* Title with hover effect */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {c.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                  {c.description}
                </p>

                {/* Metadata with subtle colors */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5 group-hover:text-gray-700 transition-colors">
                    <div className="p-1 rounded bg-blue-50">
                      <Clock className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <span>20 min</span>
                  </div>
                  <div className="flex items-center gap-1.5 group-hover:text-gray-700 transition-colors">
                    <div className="p-1 rounded bg-green-50">
                      <Play className="h-3.5 w-3.5 text-green-500" />
                    </div>
                    <span>{c.lecturesCount} lectures</span>
                  </div>
                </div>

                {/* Progress bar with conditional styling */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-500">
                      {c.completed ? '✓ Completed' : 'Progress'}
                    </span>
                    <span
                      className={`font-medium ${
                        c.completed ? 'text-green-600' : 'text-blue-600'
                      }`}
                    >
                      {c.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        c.completed
                          ? 'bg-green-500'
                          : c.progress > 0
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>

                {/* Button with status-based styling */}
                <button
                  onClick={() => handleStart(c.slug, c.id)}
                  className={`w-full rounded-lg py-2.5 px-4 text-sm font-medium transition-all transform hover:scale-[1.02] ${
                    c.completed
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                      : hasProgress
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'
                  }`}
                >
                  {label}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
