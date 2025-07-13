// app/_components/learn/SideNav.tsx
'use client';
import React from 'react';
import { Brain } from 'lucide-react';
import { useCourse } from '@/app/context/courseContext';

export default function SideNav() {
  // State Variables.
  const { course } = useCourse();
  const percent = course.userCourses[0]?.progress ?? 0;
  return (
    <aside className="w-80 h-full bg-gradient-to-b from-gray-900/95 to-black/95 border-r border-gray-800/50 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>

            {/* GRAB TITLE & CURRENT PERCENT*/}
            <div>
              <h3 className="font-semibold text-white truncate">
                {course.title}
              </h3>
              <p className="text-sm text-gray-400">
                {percent === 100 ? '🎉 Course completed' : ' '}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Course Progress</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
