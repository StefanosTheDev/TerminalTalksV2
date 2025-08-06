// components/ChatInput.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export function ChatInput() {
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  const baseText = 'Ask Terminal Talks to create a podcast about ';
  const topics = [
    'EC2 in production',
    'useEffect in React',
    'the history of artificial intelligence',
    'debugging strategies for complex systems',
    'cloud architecture best practices',
  ];
  console.log(isTyping);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let currentTopic = topics[indexRef.current];

    const typeEffect = () => {
      if (!isDeleting && charIndex <= currentTopic.length) {
        setCurrentPlaceholder(baseText + currentTopic.slice(0, charIndex));
        charIndex++;

        if (charIndex > currentTopic.length) {
          setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, 2000); // Pause at end
          return;
        }
      } else if (isDeleting && charIndex >= 0) {
        setCurrentPlaceholder(baseText + currentTopic.slice(0, charIndex));
        charIndex--;

        if (charIndex < 0) {
          indexRef.current = (indexRef.current + 1) % topics.length;
          currentTopic = topics[indexRef.current];
          charIndex = 0;
          isDeleting = false;
          setTimeout(typeEffect, 500); // Small pause before next topic
          return;
        }
      }

      const speed = isDeleting ? 30 : 80;
      setTimeout(typeEffect, speed);
    };

    // Start with base text visible
    setCurrentPlaceholder(baseText);

    const timeout = setTimeout(() => {
      typeEffect();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <div className="relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl p-2">
        <textarea
          placeholder={currentPlaceholder}
          className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none text-[15px]"
          rows={3}
          style={{ minHeight: '100px' }}
          onFocus={() => setIsTyping(true)}
          onBlur={(e) => {
            if (e.target.value === '') setIsTyping(false);
          }}
        />

        {/* Bottom controls */}
        <div className="flex items-center justify-between px-4 pb-2">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <span className="text-xs">Attach</span>
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs">Public</span>
            </button>
          </div>

          {/* Send button */}
          <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
