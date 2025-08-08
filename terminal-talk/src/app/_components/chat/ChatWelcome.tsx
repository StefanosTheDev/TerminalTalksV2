// app/_components/chat/ChatWelcome.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

interface ChatWelcomeProps {
  onSendMessage: (message: string) => void;
}

export function ChatWelcome({ onSendMessage }: ChatWelcomeProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  const baseText = 'Ask Terminal Talks to create a podcast about ';
  const topics = [
    'startup failures and lessons learned',
    'the future of AI development',
    'debugging complex systems',
    'personal growth strategies',
    'interview techniques',
  ];

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
          }, 2000);
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
          setTimeout(typeEffect, 500);
          return;
        }
      }

      const speed = isDeleting ? 30 : 80;
      setTimeout(typeEffect, speed);
    };

    setCurrentPlaceholder(baseText);

    const timeout = setTimeout(() => {
      typeEffect();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

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
        <h1 className="text-3xl font-bold text-[#ececf1] text-center mb-2">
          What do you want to hear?
        </h1>
        <p className="text-[#8e8ea0] text-center mb-8">
          Create podcasts by chatting with AI
        </p>

        {/* Input container */}
        <div className="relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setIsTyping(true);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (e.target.value === '') setIsTyping(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={currentPlaceholder}
            className="w-full px-6 py-4 bg-transparent text-[#ececf1] placeholder-gray-500 focus:outline-none resize-none text-[15px]"
            rows={3}
            style={{ minHeight: '100px' }}
          />

          {/* Bottom controls */}
          <div className="flex items-center justify-between px-4 pb-2">
            <div className="flex items-center gap-2"></div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
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

        {/* Suggestions */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.title}
              onClick={() => setInput(suggestion.prompt)}
              className="text-left p-4 rounded-xl border border-[#565869]/30 bg-[#2a2b32]/50 hover:border-[#8e8ea0]/50 hover:bg-[#343541]/70 transition-all group backdrop-blur"
            >
              <p className="text-sm text-[#ececf1] font-medium">
                {suggestion.title}
              </p>
              <p className="text-xs text-[#8e8ea0] mt-1">
                {suggestion.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
