// app/_components/chat/ChatBubble.tsx
'use client';

import { useState } from 'react';
import { useChat } from './ChatProvider';
import { Send, Square } from 'lucide-react';

interface ChatBubbleProps {
  width?: string;
  maxWidth?: string;
  minHeight?: string;
  rows?: number;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  onSend?: (message: string) => void;
  clearOnSend?: boolean;
}

export function ChatBubble({
  width = 'w-full',
  maxWidth = 'max-w-2xl',
  minHeight = '50px',
  rows = 1,
  className = '',
  containerClassName = '',
  placeholder = 'Type your message...',
  clearOnSend = true,
}: ChatBubbleProps) {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading, cancelGeneration } = useChat();

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const message = input.trim();

    // Clear input IMMEDIATELY - this is synchronous
    if (clearOnSend) {
      setInput('');
    }

    // Send message asynchronously - don't await
    sendMessage(message).catch((error) => {
      console.error('Failed to send message:', error);
    });
  };

  const handleStop = () => {
    cancelGeneration();
  };

  return (
    <div className={`${width} ${maxWidth} ${containerClassName}`}>
      <div
        className={`relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl p-1.5 ${className}`}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-12 bg-transparent text-[#ececf1] placeholder-gray-500 focus:outline-none resize-none text-[15px]"
          rows={rows}
          style={{ minHeight }}
          disabled={isLoading}
        />

        {isLoading ? (
          <button
            onClick={handleStop}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors group flex items-center justify-center"
            aria-label="Stop generation"
          >
            <Square className="w-3 h-3 text-white fill-current" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center"
            aria-label="Send message"
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
        )}
      </div>
    </div>
  );
}
