// app/_components/learn/Header.tsx
'use client';

import Link from 'next/link';
import { useCourse } from '@/app/context/courseContext';
import { ChevronLeft } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/nextjs';

export default function Header() {
  const { course, index } = useCourse();
  const lectures = course.lectures;

  // ────────────────────────────────────────────────────────────────────────────
  // 1) Prevent out-of-bounds access by clamping the index into a valid range.
  //    If `progress` ever equals the total lecture count, `index` could be too large.
  const maxIdx = Math.max(0, lectures.length - 1);
  const safeIndex = Math.min(Math.max(index, 0), maxIdx);
  // ────────────────────────────────────────────────────────────────────────────

  // 2) Use the clamped index—now guaranteed to point to an existing lecture
  const lecture = lectures[safeIndex];

  // (Optional) 3) Guard in case something still went wrong:
  if (!lecture) {
    return (
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800/50 bg-black/20 sticky top-0 z-50">
        <span className="text-gray-400">Loading…</span>
      </header>
    );
  }

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800/50 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      {/* ← Back link unchanged */}
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard/library"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <ChevronLeft className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">Back to Dashboard</span>
        </Link>
      </div>

      {/* ← Title and lesson count now use `lecture` and `safeIndex` */}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-white truncate">
          {lecture.title}
        </h1>
        <p className="text-sm text-gray-400">
          Lesson {safeIndex + 1} of {lectures.length}
        </p>
      </div>

      {/* ← User button unchanged */}
      <div className="flex items-center space-x-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
