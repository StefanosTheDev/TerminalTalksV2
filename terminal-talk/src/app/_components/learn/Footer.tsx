// Footer.tsx
'use client';

import { useLectureIndex } from '@/app/context/_lectureContext';
import { Lecture } from '@/app/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Footer({ lectures }: { lectures: Lecture[] }) {
  const { index, setIndex } = useLectureIndex();

  function change(by: number) {
    setIndex((prev) => {
      const next = prev + by;
      if (next < 0) return 0;
      if (next >= lectures.length) return lectures.length - 1;
      return next;
    });
  }

  return (
    <footer className="border-t border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => change(-1)}
          disabled={index === 0}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous Lesson</span>
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Lesson {index + 1} of {lectures.length}
          </p>
        </div>

        <button
          onClick={() => change(+1)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <span>
            {index === lectures.length - 1 ? 'Complete Course' : 'Next Lesson'}
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
