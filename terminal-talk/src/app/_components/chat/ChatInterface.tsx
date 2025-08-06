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
    setTypingMessageId(null); // Reset typing for new messages
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

    // More flexible regex patterns
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
      // Call the podcast generation API
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

      // Add a system message with the generated podcast
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

      // Scroll to the new message
      setTimeout(() => {
        const messagesContainer = document.querySelector('.overflow-y-auto');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);

      // Optional: Save to localStorage or state for history
      const podcastHistory = JSON.parse(
        localStorage.getItem('podcastHistory') || '[]'
      );
      podcastHistory.push({
        id: result.podcastId,
        title: result.title,
        audioUrl: result.audioUrl,
        createdAt: new Date().toISOString(),
        conversationId: currentConversation.id,
      });
      localStorage.setItem('podcastHistory', JSON.stringify(podcastHistory));
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
          <h1 className="text-base font-medium">TT 1.0</h1>
        </div>
        <div className="flex-1">
          <ChatWelcome onSendMessage={handleWelcomeMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
        <h1 className="text-base font-medium">TT 1.0</h1>
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
                  className={`max-w-[70%] ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-gray-900 text-white'
                        : message.role === 'system'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {shouldType ? (
                      <TypingMessage
                        content={messageContent}
                        speed={15}
                        onComplete={() => {
                          // Optional: do something when typing completes
                        }}
                      />
                    ) : (
                      messageContent
                    )}

                    {/* Show audio player if message has audioUrl */}
                    {message.audioUrl && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
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
            <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">AI</span>
            </div>
            <div className="bg-gray-100 rounded-xl px-4 py-3">
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

      <div className="border-t border-gray-200 p-5">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            disabled={isLoading || isGenerating}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || isGenerating}
            className="px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
