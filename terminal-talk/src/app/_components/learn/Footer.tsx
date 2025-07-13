'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCourse } from '@/app/context/courseContext';
import { updateProgress } from '../_actions/progress';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const { course, index, setIndex } = useCourse();
  const totalLectures = course?.lectures.length || 1;
  const isFirst = index === 0;
  const isLast = index === totalLectures - 1;
  const router = useRouter();

  const goToPrevious = () => {
    if (!isFirst) setIndex(index - 1);
  };

  const goToNext = async () => {
    if (!course) return;

    const newIndex = index + 1;
    const newPercent = Math.round((newIndex / totalLectures) * 100);
    const isCompleting = newPercent >= 100;

    // 1. Update local state first so UI is instant
    setIndex(Math.min(newIndex, totalLectures - 1));

    // 2. Fire & forget to server (no waiting to move UI)
    try {
      await updateProgress({
        courseId: course.id,
        newIndex,
        totalLectures,
        lectureId: course.lectures[index]?.id,
      });

      if (isCompleting) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Progress update failed:', err);
    }
  };

  return (
    <footer className="border-t border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={goToPrevious}
          disabled={isFirst}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous Lesson</span>
        </button>

        <p className="text-sm text-gray-400">
          Lesson {index + 1} of {totalLectures}
        </p>

        <button
          onClick={goToNext}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <span>{isLast ? 'Complete Course' : 'Next Lesson'}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
