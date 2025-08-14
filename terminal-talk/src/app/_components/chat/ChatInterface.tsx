// src/app/_components/chat/ChatInterface.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

// Utility function to generate unique message IDs
function generateMessageId(prefix: string = 'msg'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

interface ConversationData {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatInterfaceProps {
  conversationData: ConversationData;
}

export function ChatInterface({ conversationData }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(
    conversationData.messages
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [generatedPodcast, setGeneratedPodcast] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/chat/conversations/${conversationData.id}/messages`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: userInput }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();

      // Add messages to state
      setMessages((prev) => [
        ...prev,
        result.userMessage,
        result.assistantMessage,
      ]);

      // Check if the assistant indicated podcast generation is starting
      if (
        result.assistantMessage.content.includes('🎙️ Generating your podcast')
      ) {
        await generatePodcast();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId('error'),
          role: 'assistant',
          content: '❌ Sorry, there was an error. Please try again.',
          createdAt: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePodcast = async () => {
    try {
      setIsGeneratingPodcast(true);

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

      // Add success message with audio player
      setMessages((prev) => [
        ...prev,
        {
          id: `podcast-success-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          role: 'assistant',
          content: `✅ Your podcast is ready!`,
          createdAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error generating podcast:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `podcast-error-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          role: 'assistant',
          content:
            '❌ Sorry, there was an error generating your podcast. Please try again.',
          createdAt: new Date(),
        },
      ]);
    } finally {
      setIsGeneratingPodcast(false);
    }
  };

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';

    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-lg px-4 py-2 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-100 border border-gray-700'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          {!isUser &&
            message.content.includes('✅ Your podcast is ready!') &&
            generatedPodcast && (
              <div className="mt-3 p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold">
                    {generatedPodcast.title}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {Math.floor(generatedPodcast.duration / 60)}:
                    {(generatedPodcast.duration % 60)
                      .toString()
                      .padStart(2, '0')}
                  </span>
                </div>
                <audio controls className="w-full">
                  <source src={generatedPodcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-100">
          {conversationData.title}
        </h2>
        <p className="text-sm text-gray-400">Create your custom podcast</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map(renderMessage)}

        {isGeneratingPodcast && (
          <div className="flex items-center justify-center py-4">
            <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              <span className="text-gray-300">
                Generating your podcast... This may take 30-60 seconds
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-800 px-6 py-4"
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me about your podcast idea..."
            className="flex-1 bg-gray-800 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading || isGeneratingPodcast}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isGeneratingPodcast}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
