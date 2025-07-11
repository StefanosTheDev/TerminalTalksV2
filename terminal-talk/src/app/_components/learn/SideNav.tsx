// SideNav.tsx
'use client';

import { Lecture } from '@/app/types';
import { Brain, List, PenTool, CheckCircle, Circle, Play } from 'lucide-react';
import { useState } from 'react';
import { useCourse } from '@/app/context/courseContext';

export default function SideNav() {
  const [showChapters, setShowChapters] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const { course, index, setIndex } = useCourse();

  // Mock progress - you can calculate this based on your data
  const progress = Math.round(((index + 1) / course.lectures.length) * 100);

  return (
    <aside className="w-80 h-full bg-gradient-to-b from-gray-900/95 to-black/95 border-r border-gray-800/50 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Course Progress */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{course.title}</h3>
              <p className="text-sm text-gray-400">by Terminal Talks</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Course Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => {
                setShowChapters(true);
                setShowNotes(false);
              }}
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
              onClick={() => {
                setShowNotes(true);
                setShowChapters(false);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm transition-all ${
                showNotes
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <PenTool className="h-4 w-4" />
              <span>Notes</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {showChapters && (
            <div className="h-full overflow-y-auto p-4 space-y-2">
              {course.lectures.map((lecture, idx) => (
                <div
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`group p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    idx === index
                      ? 'bg-blue-500/20 border border-blue-500/30'
                      : 'hover:bg-gray-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {idx < index ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : idx === index ? (
                        <Play className="h-5 w-5 text-blue-400" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm font-medium truncate ${
                          idx === index
                            ? 'text-blue-400'
                            : 'text-white group-hover:text-blue-400'
                        }`}
                      >
                        {lecture.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showNotes && (
            <div className="h-full p-4">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">
                    Lesson Notes
                  </h4>
                  <button className="text-xs text-blue-400 hover:text-blue-300">
                    View All Notes
                  </button>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes for this lesson..."
                  className="flex-1 w-full bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none"
                />
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-300">
                    Save Notes
                  </button>
                  <button className="px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors text-gray-400">
                    Export
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
