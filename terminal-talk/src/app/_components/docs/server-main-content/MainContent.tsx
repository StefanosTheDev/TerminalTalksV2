'use client';
import React, { useState } from 'react';
import {
  Play,
  Pause,
  ThumbsUp,
  ThumbsDown,
  Heart,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { useAuth, useClerk, useSignIn } from '@clerk/nextjs';

export const LectureDetailPlaceholder = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const transcript = `Welcome to this lecture on Next.js Installation & Setup. 
In this guide, we'll walk you through setting up your first Next.js app, installing dependencies, and understanding the basic folder structure. 
Let’s get started!`;
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk(); // programmatically open the sign-in modal

  const handleClick = () => {
    if (!isSignedIn) {
      openSignIn(); // opens Clerk modal
      return;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    // TEST
    <div className="max-w-4xl mx-auto px-20 pt-24 pb-10">
      <h1 id="nextjs-installation" className="text-3xl font-bold mb-4">
        Next.js Installation & Setup
      </h1>
      <p className="text-gray-600 mb-6">TLDR: About this Lecture</p>

      {/* Audio Player */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleClick}
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>
            <div>
              <p className="font-medium text-gray-900">
                Next.js Installation & Setup
              </p>
              <p className="text-sm text-gray-500">18:30</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert('Skipped Back 10s')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => alert('Skipped Forward 10s')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg transition-colors ${
                bookmarked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Progress Bar (static for now) */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: '20%' }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>3:45</span>
          <span>18:30</span>
        </div>
      </div>

      {/* Transcript */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {transcript}
        </p>
      </div>

      {/* Feedback */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Rate this lecture
        </h2>

        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => setFeedback('up')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              feedback === 'up'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>Helpful</span>
          </button>
          <button
            onClick={() => setFeedback('down')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              feedback === 'down'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
            <span>Not Helpful</span>
          </button>
        </div>

        {/* Comment box */}
        <textarea
          placeholder="Share your thoughts about this lecture (optional)"
          className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-3"
          rows={3}
        />

        <button
          onClick={() => alert('Thanks for your feedback!')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default LectureDetailPlaceholder;
