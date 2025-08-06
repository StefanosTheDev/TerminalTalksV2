// app/_components/chat/ChatWelcome.tsx
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

  const suggestions = [
    {
      title: 'Startup Stories',
      description: 'Share lessons from failed startups',
      prompt: 'I want to create a podcast about startup failures',
    },
    {
      title: 'Tech Tutorials',
      description: 'Explain complex tech simply',
      prompt: 'Help me create a tech tutorial podcast',
    },
    {
      title: 'Interview Show',
      description: 'Conversations with fascinating people',
      prompt: 'I want to interview interesting people',
    },
    {
      title: 'Personal Growth',
      description: 'Self-improvement and life lessons',
      prompt: 'Create a podcast about personal growth',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <div className="max-w-2xl w-full">
        {/* Main heading */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          What podcast do you want to create?
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Create podcasts by chatting with AI
        </p>

        {/* Input container */}
        <div
          className={`
          relative bg-white border rounded-2xl transition-all duration-200
          ${isFocused ? 'border-gray-400 shadow-lg' : 'border-gray-300'}
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
            className="w-full px-6 py-4 bg-transparent resize-none focus:outline-none text-gray-900 placeholder-gray-500"
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
            </div>

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Send
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.title}
              onClick={() => setInput(suggestion.prompt)}
              className="text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all group"
            >
              <p className="text-sm text-gray-900 font-medium">
                {suggestion.title}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {suggestion.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
