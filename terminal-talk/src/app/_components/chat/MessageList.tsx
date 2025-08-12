// app/_components/chat/MessageList.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '@/app/types';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className="flex flex-col space-y-4 p-4 max-w-4xl mx-auto">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="flex space-x-1">
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
          <span className="text-sm">AI is thinking...</span>
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message content */}
        <div
          className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`px-4 py-2 rounded-lg ${
              isUser
                ? 'bg-blue-600 text-white'
                : 'bg-[#1a1a1a] text-gray-100 border border-gray-800'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>

          {/* Timestamp */}
          <span className="text-xs text-gray-500 mt-1 px-1">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
