// app/_components/chat/ChatInterface.tsx
'use client';

import { useEffect } from 'react';
import { useChat } from './ChatProvider';
import { ChatBubble } from './ChatBubble';
import MessageList from './MessageList';

interface ChatInterfaceProps {
  initialConversation?: {
    id: string;
    title: string;
    updatedAt: Date;
  };
  initialMessages?: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt: Date;
  }>;
}

export function ChatInterface({
  initialConversation,
  initialMessages = [],
}: ChatInterfaceProps) {
  const {
    messages,
    setMessages,
    currentConversation,
    setCurrentConversation,
    isLoading,
  } = useChat();

  // Sync server data with client state on mount
  useEffect(() => {
    if (initialConversation && initialMessages) {
      // Only update if this is a different conversation
      if (currentConversation?.id !== initialConversation.id) {
        setCurrentConversation(initialConversation);
        setMessages(initialMessages);
      }
    }
  }, [initialConversation?.id]); // Only re-run if conversation ID changes

  // Use the messages from context (which starts with server data)
  // This allows real-time updates as new messages come in
  const displayMessages = messages.length > 0 ? messages : initialMessages;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={displayMessages} isLoading={isLoading} />
      </div>

      {/* Input Area */}
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
