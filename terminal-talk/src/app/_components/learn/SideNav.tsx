'use client';

import React, { useState } from 'react';
import { Brain, List, StickyNote, CheckCircle } from 'lucide-react';
import { useCourse } from '@/app/context/courseContext';

export default function SideNav() {
  const { course, index, setIndex } = useCourse();
  const percent = course.userCourses[0]?.progress ?? 0;
  const [showChapters, setShowChapters] = useState(true);

  return (
    <aside className="w-80 h-full bg-gradient-to-b from-gray-900/95 to-black/95 border-r border-gray-800/50 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white leading-tight">
                {course.title}
              </h3>
              <p className="text-sm text-gray-400">
                {percent === 100 ? '🎉 Course completed' : ''}
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

          {/* Tab Toggle */}
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setShowChapters(true)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm transition-all ${
                showChapters
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
              <span>Chapters</span>
            </button>
            <button
              disabled
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-500 cursor-not-allowed"
            >
              <StickyNote className="h-4 w-4" />
              <span>Notes</span>
            </button>
          </div>
        </div>

        {/* Chapters List */}
        {showChapters && (
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {course.lectures.map((lecture, i) => {
              const isComplete = course.lecProgress.includes(lecture.id);
              return (
                <button
                  key={lecture.id}
                  onClick={() => setIndex(i)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-start justify-between min-h-0 ${
                    i === index
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="break-words leading-tight pr-2 flex-1 min-w-0">
                    {i + 1}. {lecture.title}
                  </span>
                  {isComplete && (
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
