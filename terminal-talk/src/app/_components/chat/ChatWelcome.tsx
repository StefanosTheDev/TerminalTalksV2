'use client';

import { useState } from 'react';

interface ChatWelcomeProps {
  onSendMessage: (message: string) => void;
}

export function ChatWelcome({ onSendMessage }: ChatWelcomeProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div className="max-w-2xl w-full px-4">
        {/* Main heading */}
        <h1 className="text-3xl font-light text-center text-gray-700 mb-8">
          What podcast do you want to create?
        </h1>

        {/* Input container */}
        <div
          className={`
          relative bg-white border rounded-2xl transition-all duration-200
          ${
            isFocused
              ? 'border-gray-400 shadow-lg'
              : 'border-gray-200 shadow-sm'
          }
        `}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask Terminal Talks anything..."
            className="w-full px-6 py-4 bg-transparent resize-none focus:outline-none text-gray-900 placeholder-gray-400"
            rows={1}
            style={{
              minHeight: '56px',
              maxHeight: '200px',
            }}
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-4 pb-3 pt-1">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5 text-gray-500"
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
              <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span className="text-sm text-gray-600">Tools</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-8 grid grid-cols-2 gap-3 max-w-xl mx-auto">
          <button
            onClick={() =>
              setInput('I want to create a podcast about startup failures')
            }
            className="text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <p className="text-sm text-gray-700 font-medium">Startup Stories</p>
            <p className="text-xs text-gray-500 mt-1">
              Share lessons from failed startups
            </p>
          </button>
          <button
            onClick={() => setInput('Help me create a tech tutorial podcast')}
            className="text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <p className="text-sm text-gray-700 font-medium">Tech Tutorials</p>
            <p className="text-xs text-gray-500 mt-1">
              Explain complex tech simply
            </p>
          </button>
          <button
            onClick={() => setInput('I want to interview interesting people')}
            className="text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <p className="text-sm text-gray-700 font-medium">Interview Show</p>
            <p className="text-xs text-gray-500 mt-1">
              Conversations with fascinating people
            </p>
          </button>
          <button
            onClick={() => setInput('Create a podcast about personal growth')}
            className="text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <p className="text-sm text-gray-700 font-medium">Personal Growth</p>
            <p className="text-xs text-gray-500 mt-1">
              Self-improvement and life lessons
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
