// app/_components/chat/MessageList.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '@/app/types';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initial scroll to bottom without animation on first load
  useEffect(() => {
    if (!hasInitialized && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
      setHasInitialized(true);
    }
  }, [messages, hasInitialized]);

  // Auto-scroll for new messages
  useEffect(() => {
    if (hasInitialized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, hasInitialized]);

  // Guard against undefined messages
  if (!messages) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Bot className="w-12 h-12 mb-4 text-gray-600" />
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Bot className="w-12 h-12 mb-4 text-gray-600" />
        <p className="text-lg">No messages yet</p>
        <p className="text-sm">Send a message to start the conversation</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-4 pt-8 max-w-4xl mx-auto">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-start space-x-3 px-2">
          <div className="flex space-x-1 mt-2">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      )}

      {/* Invisible element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
}

// Individual message bubble component
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-800/50 text-gray-400 px-4 py-2 rounded-lg text-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-2`}>
      <div
        className={`flex items-start space-x-3 max-w-[85%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        {/* Message content */}
        <div
          className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-100'
            }`}
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
