// Update src/app/_components/chat/ChatInterface.tsx

'use client';

import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Welcome to Terminal Talks! I'm here to help you create an amazing podcast. What topic are you passionate about discussing?",
      timestamp: new Date(),
    },
  ]);

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-900">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Terminal Talks
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          AI-powered podcast creation
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        {/* Your messages here with proper dark mode classes */}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-900">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-gray-100 
                     px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                     placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
    </div>
  );
}
