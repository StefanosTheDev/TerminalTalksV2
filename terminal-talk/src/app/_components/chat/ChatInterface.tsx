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
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Chat Interface
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Try clicking the theme toggle in the top right!
        </p>
      </div>
    </div>
  );
}
