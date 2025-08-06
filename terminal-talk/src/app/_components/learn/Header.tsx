'use client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { useCourse } from '@/app/context/courseContext';

// Consume The
export default function Header() {
  const { course, index } = useCourse(); // 1.  Use the hook to get course and index
  const lectures = course.lectures; //2. Get Lectures Array
  const currLecture = lectures[index]; // Get current lecture or fallback
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800/50 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      {/*  Dashboard Back Link */}
      <div className="flex items-center space-x-4">
        <Link
          href="/chat?view=classics"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <ChevronLeft className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">Back To Chat</span>
        </Link>
      </div>

      {/*  Title & Lesson Counter */}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-white truncate">
          {currLecture.title}
        </h1>
        <p className="text-sm text-gray-400">
          Lesson {index + 1} of {lectures.length}
        </p>
      </div>

      {/*  User Button*/}
      <div className="flex items-center space-x-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
