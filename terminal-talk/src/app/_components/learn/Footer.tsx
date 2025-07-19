'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCourse } from '@/app/context/courseContext';
import { useAuth } from '@clerk/nextjs';
import { updateProgress } from '../_actions/progress';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import CourseCompletionModal from './CourseCompletionModal';

export default function Footer() {
  const { course, index, setIndex, setCourse } = useCourse();
  const [showModal, setShowModal] = useState(false);

  const total = course.lectures.length;
  const { isLoaded, isSignedIn, userId } = useAuth();
  const uc = course.userCourses?.[0];
  const courseDone = uc?.completed;
  const lectureId = course.lectures[index].id;
  const lectureDone = course.lecProgress.includes(lectureId);

  const goToPrevious = () => index > 0 && setIndex(index - 1);

  const goToNext = async () => {
    if (!isLoaded || !isSignedIn || courseDone || lectureDone) return;

    const current = course.lectures[index];
    try {
      const { isCourseCompleted } = await updateProgress({
        clerkId: userId,
        courseId: course.id,
        lectureId: current.id,
      });

      // update local state
      const newLecProgress = [...course.lecProgress, current.id];
      const newPercent = Math.round((newLecProgress.length / total) * 100);
      setCourse((prev) => ({
        ...prev,
        lecProgress: newLecProgress,
        userCourses: [
          {
            ...prev.userCourses[0],
            progress: newPercent,
            completed: isCourseCompleted,
          },
        ],
      }));

      if (isCourseCompleted) {
        confetti();
        setShowModal(true);
      }
    } catch (e) {
      console.error(e);
    }

    setIndex((i) => Math.min(i + 1, total - 1));
  };

  return (
    <>
      {showModal && (
        <CourseCompletionModal onClose={() => setShowModal(false)} />
      )}

      <footer className="border-t border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={goToPrevious}
            disabled={index === 0}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg disabled:opacity-50 text-gray-300 hover:bg-gray-800/50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Lesson</span>
          </button>

          <p className="text-sm text-gray-400">
            Lesson {index + 1} of {total}
          </p>

          <button
            onClick={goToNext}
            disabled={lectureDone || courseDone}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 to-cyan-400 text-white rounded-lg disabled:opacity-50 hover:from-blue-600 hover:to-cyan-500 transition"
          >
            <span>Mark As Complete</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </>
  );
}
