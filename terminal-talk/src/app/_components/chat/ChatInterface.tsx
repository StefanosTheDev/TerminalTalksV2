'use client';
import { useEffect } from 'react';
import { useChat } from './ChatProvider';
import { ConversationWithMessages } from '@/app/types';
import { ChatBubble } from './ChatBubble';
import MessageList from './MessageList';
export function ChatInterface({
  conversationData,
}: {
  conversationData: ConversationWithMessages;
}) {
  const {
    messages,
    setMessages,
    currentConversation,
    setCurrentConversation,
    isLoading,
  } = useChat();

  // Sync server data with client state
  useEffect(() => {
    // Only update if it's a different conversation
    if (currentConversation?.id !== conversationData.id) {
      setCurrentConversation({
        id: conversationData.id,
        title: conversationData.title,
        updatedAt: conversationData.updatedAt,
      });
      setMessages(conversationData.messages);
    }
  }, [conversationData.id]); // Re-run when conversation changes

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800/50 py-2 px-4">
        <ChatBubble
          placeholder="Continue the conversation..."
          maxWidth="max-w-3xl"
          minHeight="33px"
          rows={1}
          containerClassName="mx-auto"
        />
      </div>
    </div>
  );
}
