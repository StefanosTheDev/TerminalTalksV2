// app/_components/chat/ChatInterface.tsx
'use client';

import { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { ChatWelcome } from './ChatWelcome';
import { GeneratePodcastButton } from './GeneratePodcastButton';
import { TypingMessage } from './TypingMessage';

export function ChatInterface({ conversationId }: { conversationId?: string }) {
  const [input, setInput] = useState('');
  const {
    messages,
    sendMessage,
    loadConversation,
    isLoading,
    currentConversation,
    clearCurrentConversation,
    setMessages,
  } = useChat();
  const [showWelcome, setShowWelcome] = useState(!conversationId);
  const [isGenerating, setIsGenerating] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
      clearCurrentConversation();
    }
  }, [conversationId, loadConversation, clearCurrentConversation]);

  // Set typing effect for new AI messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant' && !typingMessageId) {
      setTypingMessageId(lastMessage.id);
    }
  }, [messages, typingMessageId]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const message = input;
    setInput('');
    setShowWelcome(false);
    setTypingMessageId(null);
    await sendMessage(message);
  };

  const handleWelcomeMessage = async (message: string) => {
    setShowWelcome(false);
    setTypingMessageId(null);
    await sendMessage(message);
  };

  const extractPodcastDetails = (messages: any[]) => {
    const summaryMessage = messages
      .filter(
        (m) =>
          m.role === 'assistant' && m.content.includes('[READY_TO_GENERATE]')
      )
      .pop();

    if (!summaryMessage) {
      console.log('No message with [READY_TO_GENERATE] found');
      return null;
    }

    const content = summaryMessage.content;
    console.log('Parsing content:', content);

    const details = {
      topic:
        content.match(/\*\*Topic:\*\*\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        content.match(/Topic:\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        'Not specified',

      format:
        content.match(/\*\*Format:\*\*\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        content.match(/Format:\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        'Not specified',

      tone:
        content.match(/\*\*Tone:\*\*\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        content.match(/Tone:\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        'Not specified',

      audience:
        content
          .match(/\*\*Target Audience:\*\*\s*(.+?)(?:\n|$)/)?.[1]
          ?.trim() ||
        content.match(/Audience:\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        'Not specified',

      length:
        content.match(/\*\*Episode Length:\*\*\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        content.match(/Length:\s*(.+?)(?:\n|$)/)?.[1]?.trim() ||
        'Not specified',

      rawSummary: content.replace('[READY_TO_GENERATE]', '').trim(),
    };

    console.log('Extracted podcast details:', details);
    return details;
  };

  const handleGeneratePodcast = async () => {
    if (!currentConversation) {
      console.error('No current conversation');
      alert('No active conversation found');
      return;
    }

    setIsGenerating(true);

    const podcastDetails = extractPodcastDetails(messages);
    console.log('🎙️ Generating Podcast with details:', podcastDetails);

    if (!podcastDetails) {
      alert('Could not extract podcast details. Please try again.');
      setIsGenerating(false);
      return;
    }

    try {
      const response = await fetch('/api/podcast/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: currentConversation.id,
          podcastDetails,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to generate podcast');
      }

      const result = await response.json();
      console.log('Podcast generated:', result);

      const podcastMessage = {
        id: `podcast-${result.podcastId}`,
        role: 'system' as const,
        content: `🎙️ **Your podcast is ready!**\n\n**Title:** ${
          result.title
        }\n\nYour podcast has been generated successfully. Click play below to listen to your episode!\n\n**Duration:** ${Math.ceil(
          result.duration / 60
        )} minutes`,
        createdAt: new Date(),
        audioUrl: result.audioUrl,
      };

      setMessages((prev) => [...prev, podcastMessage]);

      setTimeout(() => {
        const messagesContainer = document.querySelector('.overflow-y-auto');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
    } catch (error) {
      console.error('Error generating podcast:', error);
      alert(
        `Failed to generate podcast: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (!conversationId && showWelcome) {
    return (
      <div className="flex flex-col h-screen bg-[#0a0a0a]">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-800">
          <h1 className="text-base font-medium text-white">TT 1.0</h1>
        </div>
        <div className="flex-1">
          <ChatWelcome onSendMessage={handleWelcomeMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-800">
        <h1 className="text-base font-medium text-white">TT 1.0</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;
          const shouldType =
            message.id === typingMessageId && message.role === 'assistant';
          const messageContent = message.content
            .replace('[READY_TO_GENERATE]', '')
            .trim();

          return (
            <div key={message.id}>
              <div
                className={`flex gap-4 mb-6 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-medium ${
                    message.role === 'user'
                      ? 'bg-white text-[#0a0a0a]'
                      : message.role === 'system'
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#2a2a2a] text-gray-300 border border-gray-700'
                  }`}
                >
                  {message.role === 'user'
                    ? 'U'
                    : message.role === 'system'
                    ? 'S'
                    : 'AI'}
                </div>

                <div
                  className={`max-w-[70%] ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-white text-[#0a0a0a]'
                        : message.role === 'system'
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                        : 'bg-[#1a1a1a] text-gray-300 border border-gray-800'
                    }`}
                  >
                    {shouldType ? (
                      <TypingMessage
                        content={messageContent}
                        speed={15}
                        onComplete={() => {}}
                      />
                    ) : (
                      messageContent
                    )}

                    {/* Show audio player if message has audioUrl */}
                    {message.audioUrl && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <audio controls className="w-full">
                          <source src={message.audioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Show generate button after typing completes */}
              {message.role === 'assistant' &&
                message.content.includes('[READY_TO_GENERATE]') &&
                (!shouldType || isLastMessage) && (
                  <div className="ml-12 mb-6">
                    <GeneratePodcastButton
                      onClick={handleGeneratePodcast}
                      isLoading={isGenerating}
                    />
                  </div>
                )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-4 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#2a2a2a] border border-gray-700 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-400">AI</span>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-800 p-5 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            disabled={isLoading || isGenerating}
            className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || isGenerating}
            className="px-5 py-3 bg-white text-[#0a0a0a] rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
