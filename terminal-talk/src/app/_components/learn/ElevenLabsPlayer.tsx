'use client';

import { useLectureIndex } from '@/app/context/_lectureContext';
import { Lecture } from '@/app/types';
import { useEffect } from 'react';
import { Clock, BookOpen, Users } from 'lucide-react';

export default function ElevenLabsPlayer({
  lectures,
}: {
  lectures: Lecture[];
}) {
  const { index } = useLectureIndex();
  const lecture = lectures[index];

  useEffect(() => {
    const scriptId = 'elevenlabs-audionative-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elevenlabs.io/player/audioNativeHelper.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Lesson Header */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="p-8">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Lesson {index + 1}
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-400">{'15:00'}</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              {lecture.title}
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              {lecture.description ||
                'Dive deep into this comprehensive lesson covering essential concepts and practical applications.'}
            </p>

            <div className="flex items-center space-x-6 mt-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{'15 minutes'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Beginner Level</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>2,847 students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player Container */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-b border-gray-700/50 backdrop-blur-sm p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-6 border border-gray-700/50">
            <div
              id="elevenlabs-audionative-widget"
              data-height="120"
              data-width="100%"
              data-frameborder="no"
              data-scrolling="no"
              data-publicuserid="5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f"
              data-playerurl={lecture.audioURL}
              data-projectid="ub4yXuSKV1Q5RwbAxmLL"
              className="text-gray-300 text-sm leading-relaxed"
            >
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-4"></div>
                  </div>
                  <p className="text-gray-400">
                    Loading the{' '}
                    <a
                      href="https://elevenlabs.io/text-to-speech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 underline hover:text-sky-300 transition-colors"
                    >
                      Elevenlabs Text to Speech
                    </a>{' '}
                    AudioNative Player...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area (for transcript, resources, etc.)
      <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="h-full p-6">
          <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl h-full backdrop-blur-sm border border-gray-600/30 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Lesson Content
            </h4>
            <p className="text-gray-400">
              Additional content like transcripts, resources, or exercises will
              appear here.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
