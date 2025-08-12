// app/_components/chat/ChatBubble.tsx
'use client';

import { useState } from 'react';
import { useChat } from './ChatProvider';
import { Send } from 'lucide-react';

interface ChatBubbleProps {
  // Sizing props
  width?: string;
  maxWidth?: string;
  minHeight?: string;
  rows?: number;

  // Styling props
  className?: string;
  containerClassName?: string;

  // Content props
  placeholder?: string;

  // Behavior props
  onSend?: (message: string) => void; // Optional override
  clearOnSend?: boolean;
}

export function ChatBubble({
  width = 'w-full',
  maxWidth = 'max-w-2xl',
  minHeight = '100px',
  rows = 3,
  className = '',
  containerClassName = '',
  placeholder = 'Type your message...',
  onSend,
  clearOnSend = true,
}: ChatBubbleProps) {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChat();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const message = input.trim();

    await sendMessage(message);

    // Clear input if specified
    if (clearOnSend) {
      setInput('');
    }
  };

  return (
    <div className={`${width} ${maxWidth} ${containerClassName}`}>
      {/* Input Bubble */}
      <div
        className={`relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl p-2 ${className}`}
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
          className="w-full px-6 py-4 bg-transparent text-[#ececf1] placeholder-gray-500 focus:outline-none resize-none text-[15px]"
          rows={rows}
          style={{ minHeight }}
          disabled={isLoading}
        />

        {/* Bottom controls */}
        <div className="flex items-center justify-between px-4 pb-2">
          <div className="flex items-center gap-2"></div>

          {/* Right side - Send button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
