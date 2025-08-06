// app/_components/chat/ChatInterface.tsx
'use client';

import { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { ChatWelcome } from './ChatWelcome';
import { GeneratePodcastButton } from './GeneratePodcastButton';
interface podcasttype {
  role: string;
  content: string;
}
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

  const extractPodcastDetails = (messages: podcasttype[]) => {
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
      <div className="flex flex-col h-screen bg-white">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
          <h1 className="text-base font-medium text-gray-900">TT 1.0</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <ChatWelcome onSendMessage={handleWelcomeMessage} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors md:hidden">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 className="text-base font-medium text-gray-900">
            {currentConversation?.title || 'New Podcast Creation'}
          </h2>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => {
            const messageContent = message.content
              .replace('[READY_TO_GENERATE]', '')
              .trim();

            return (
              <div key={message.id}>
                <div className="mb-6 fade-in">
                  <div
                    className={`flex gap-4 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-medium ${
                        message.role === 'user'
                          ? 'bg-gray-900 text-white'
                          : message.role === 'system'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {message.role === 'user'
                        ? 'U'
                        : message.role === 'system'
                        ? 'S'
                        : 'AI'}
                    </div>

                    {/* Message Content */}
                    <div
                      className={`max-w-[70%] ${
                        message.role === 'user' ? 'text-right' : ''
                      }`}
                    >
                      {message.role === 'user' ? (
                        <div className="inline-block px-4 py-3 rounded-xl bg-gray-900 text-white">
                          {messageContent}
                        </div>
                      ) : message.role === 'system' ? (
                        <div className="inline-block px-4 py-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-200">
                          {messageContent}
                          {/* Show audio player if message has audioUrl */}
                          {message.audioUrl && (
                            <div className="mt-3 pt-3 border-t border-blue-200">
                              <audio controls className="w-full">
                                <source
                                  src={message.audioUrl}
                                  type="audio/mpeg"
                                />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-900">{messageContent}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Show generate button after assistant messages with [READY_TO_GENERATE] */}
                {message.role === 'assistant' &&
                  message.content.includes('[READY_TO_GENERATE]') && (
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

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-4 mb-6 fade-in">
              <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">AI</span>
              </div>
              <div className="text-gray-900">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-2">
            <div className="flex items-center gap-2 px-2">
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-all">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && !e.shiftKey && handleSend()
              }
              placeholder="Reply to Terminal Talks..."
              className="flex-1 py-3 bg-transparent text-gray-900 placeholder-gray-400 outline-none"
            />

            <div className="flex items-center gap-2 px-2">
              <div className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md">
                Terminal Talks Pro
                <svg
                  className="inline-block w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
