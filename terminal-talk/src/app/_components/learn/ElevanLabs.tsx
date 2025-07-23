'use client';

import { useEffect, useState } from 'react';
import { useCourse } from '@/app/context/courseContext';
import { Clock, BookOpen, Users } from 'lucide-react';

export default function ElevenLabsAudioNative() {
  const { course, index } = useCourse();
  const lectures = course.lectures;

  const maxIdx = Math.max(0, lectures.length - 1);
  const safeIndex = Math.min(Math.max(index, 0), maxIdx);
  const lecture = lectures[safeIndex];

  const [widgetKey, setWidgetKey] = useState(() => Date.now());

  // Hardcoded public user ID
  const publicUserId =
    '5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f';
  const size = 'small';
  const textColorRgba = 'rgba(0, 0, 0, 1.0)'; // Black text for iframe
  const backgroundColorRgba = 'rgba(255, 255, 255, 1.0)'; // White background for iframe

  useEffect(() => {
    // Force remount by changing widget key when projectId changes
    setWidgetKey(Date.now());
  }, [lecture.projectId]);

  useEffect(() => {
    const scriptId = 'elevenlabs-audionative-script';

    // Clean up any existing script first
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Add the script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://elevenlabs.io/player/audioNativeHelper.js';
    script.async = true;

    script.onerror = () => {
      console.error('Failed to load ElevenLabs script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [widgetKey]);

  if (!lecture) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400">Loading lesson…</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Lesson Header */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="p-8 max-w-4xl">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Lesson {safeIndex + 1}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">
              {lecture.totalSeconds
                ? `${Math.ceil(lecture.totalSeconds / 60)} minutes`
                : '—'}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 break-words">
            {lecture.title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl break-words">
            {lecture.description}
          </p>
          <div className="flex items-center space-x-6 mt-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>
                {lecture.totalSeconds
                  ? `${Math.ceil(lecture.totalSeconds / 60)} minutes`
                  : '—'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Beginner Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Interactive</span>
            </div>
          </div>
        </div>
      </div>

      {/* ElevenLabs AudioNative Widget */}
      <div className="flex-1 p-4">
        <div key={widgetKey} className="w-full">
          <div
            id="elevenlabs-audionative-widget"
            className="w-full min-h-[90px] border border-gray-300 rounded bg-white"
            data-height={size === 'small' ? '90' : '120'}
            data-width="100%"
            data-frameborder="no"
            data-scrolling="no"
            data-publicuserid={publicUserId}
            data-playerurl="https://elevenlabs.io/player/index.html"
            data-projectid={lecture.projectId}
            data-small={size === 'small' ? 'True' : 'False'}
            data-textcolor={textColorRgba}
            data-backgroundcolor={backgroundColorRgba}
          >
            {/* Fallback content while loading */}
            <div className="flex items-center justify-center h-[90px] text-gray-500">
              Loading audio player... (Project ID: {lecture.projectId})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
