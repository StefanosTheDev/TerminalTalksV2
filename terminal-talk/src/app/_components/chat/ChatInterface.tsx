// src/app/_components/chat/ChatInterface.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from './ChatProvider';
import { ConversationWithMessages } from '@/app/types';
import { ChatBubble } from './ChatBubble';
import MessageList from './MessageList';
import { Loader2, Mic, Library } from 'lucide-react';

// Utility function to generate unique message IDs
function generateMessageId(prefix: string = 'msg'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

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

  const router = useRouter();
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [generatedPodcast, setGeneratedPodcast] = useState<any>(null);

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
  }, [conversationData.id]);

  // Check if we should show the generate button
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage &&
      lastMessage.role === 'assistant' &&
      lastMessage.content.includes('[READY_TO_GENERATE]')
    ) {
      setShowGenerateButton(true);

      // Clean the message to remove the marker
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === lastMessage.id
            ? {
                ...msg,
                content: msg.content.replace('[READY_TO_GENERATE]', '').trim(),
              }
            : msg
        )
      );
    }
  }, [messages]);

  const handleGeneratePodcast = async () => {
    setIsGeneratingPodcast(true);
    setShowGenerateButton(false);

    // Add a loading message
    const loadingMessage = {
      id: generateMessageId('generating'),
      role: 'assistant' as const,
      content:
        '🎙️ Generating your podcast... This usually takes 30-60 seconds.',
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await fetch(
        `/api/chat/conversations/${conversationData.id}/generate-podcasts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate podcast');
      }

      const podcast = await response.json();
      setGeneratedPodcast(podcast);

      // Remove loading message and add success message
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== loadingMessage.id);
        return [
          ...filtered,
          {
            id: generateMessageId('podcast-ready'),
            role: 'assistant' as const,
            content: '✅ Your podcast is ready!',
            createdAt: new Date(),
          },
        ];
      });
    } catch (error) {
      console.error('Error generating podcast:', error);

      // Remove loading message and add error message
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== loadingMessage.id);
        return [
          ...filtered,
          {
            id: generateMessageId('podcast-error'),
            role: 'assistant' as const,
            content:
              '❌ Sorry, there was an error generating your podcast. Please try again.',
            createdAt: new Date(),
          },
        ];
      });
    } finally {
      setIsGeneratingPodcast(false);
    }
  };

  const handleViewPodcast = () => {
    // Navigate to library/podcasts section
    router.push('/dashboard/library');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} isLoading={isLoading} />

        {/* Generate Button */}
        {showGenerateButton && !isGeneratingPodcast && (
          <div className="flex justify-center p-4">
            <button
              onClick={handleGeneratePodcast}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Mic className="w-5 h-5" />
              <span>Ready to Generate Podcast</span>
            </button>
          </div>
        )}

        {/* Generating State */}
        {isGeneratingPodcast && (
          <div className="flex justify-center p-4">
            <div className="bg-gray-800 rounded-lg px-6 py-3 flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              <span className="text-gray-300">Generating your podcast...</span>
            </div>
          </div>
        )}

        {/* View Podcast Button */}
        {generatedPodcast && !isGeneratingPodcast && (
          <div className="flex justify-center p-4">
            <button
              onClick={handleViewPodcast}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Library className="w-5 h-5" />
              <span>View Podcast in Library</span>
            </button>
          </div>
        )}
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
