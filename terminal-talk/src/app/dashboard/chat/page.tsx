// app/dashboard/chat/page.tsx
'use client';

import { useChat } from '@/app/_components/chat/ChatProvider';
import { ChatBubble } from '@/app/_components/chat/ChatBubble';
import MessageList from '@/app/_components/chat/MessageList';

export default function WelcomeChatPage() {
  const { messages, isLoading } = useChat();

  // If there are messages, show the chat interface
  if (messages.length > 0) {
    return (
      <div className="flex flex-col h-full bg-[#0a0a0a]">
        <div className="flex-1 overflow-y-auto">
          <MessageList messages={messages} isLoading={isLoading} />
        </div>
        <div className="border-t border-gray-800/50 p-4">
          <ChatBubble
            placeholder="Continue the conversation..."
            maxWidth="max-w-4xl"
            containerClassName="mx-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <div className="max-w-xl w-full space-y-6">
        {/* Smaller, tighter heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-white text-center">
          What do you want to learn today?
        </h1>

        {/* Optional subtitle */}
        <p className="text-gray-400 text-center text-sm">
          Creating any podcasts you want by chatting to AI
        </p>

        {/* ChatBubble - now inside the div with space-y-6 */}
        <ChatBubble
          placeholder="Type your message..."
          width="w-full"
          maxWidth="max-w-xl"
        />
      </div>
    </div>
  );
}
