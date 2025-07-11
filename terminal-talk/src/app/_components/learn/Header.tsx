// Header.tsx
'use client';

import Link from 'next/link';
import { useLectureIndex } from '@/app/context/_lectureContext';
import { Lecture } from '@/app/types';
import { ChevronLeft } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/nextjs';
export default function Header({ lectures }: { lectures: Lecture[] }) {
  const { index } = useLectureIndex();
  const lecture = lectures[index];

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800/50 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard/library"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <ChevronLeft className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">Back to Dashboard</span>
        </Link>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-white truncate">
          {lecture.title}
        </h1>
        <p className="text-sm text-gray-400">
          Lesson {index + 1} of {lectures.length}
        </p>
      </div>
      {/* TOp Right Place Holder */}
      <div className="flex items-center space-x-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>{' '}
    </header>
  );
}
