'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { Send } from 'lucide-react';
import { ChatWelcome } from './ChatWelcome';

interface ChatInterfaceProps {
  conversationId?: string;
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(!conversationId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    sendMessage,
    loadConversation,
    isLoading,
    currentConversation,
    clearCurrentConversation,
  } = useChat();

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
      clearCurrentConversation();
    }
  }, [conversationId, loadConversation, clearCurrentConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const message = input;
    setInput('');
    setShowWelcome(false);
    await sendMessage(message);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleWelcomeMessage = async (message: string) => {
    setShowWelcome(false);
    await sendMessage(message);
  };

  // Show welcome screen
  if (!conversationId && showWelcome) {
    return (
      <div className="relative flex flex-col h-full bg-[#0a0a0a] overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0">
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1920 1080"
          >
            <defs>
              <radialGradient id="topGlow1" cx="50%" cy="-10%" r="80%">
                <stop offset="30%" stopColor="#0a33f9" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="topGlow2" cx="30%" cy="0%" r="40%">
                <stop offset="20%" stopColor="#0a33f9" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="topGlow3" cx="70%" cy="0%" r="40%">
                <stop offset="30%" stopColor="#0a33f9" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="bottomGlow" cx="50%" cy="100%" r="60%">
                <stop offset="30%" stopColor="#0a33f9" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
              </radialGradient>

              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
              </filter>
            </defs>

            <rect width="100%" height="100%" fill="#0a0a0a" />

            <g filter="url(#blur)" opacity="0.8">
              <ellipse
                cx="50%"
                cy="0%"
                rx="60%"
                ry="50%"
                fill="url(#topGlow1)"
              />
              <ellipse
                cx="30%"
                cy="20%"
                rx="40%"
                ry="40%"
                fill="url(#topGlow2)"
              />
              <ellipse
                cx="80%"
                cy="20%"
                rx="40%"
                ry="40%"
                fill="url(#topGlow3)"
              />
              <ellipse
                cx="50%"
                cy="100%"
                rx="80%"
                ry="40%"
                fill="url(#bottomGlow)"
              />
            </g>
          </svg>
        </div>

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.01] pointer-events-none z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-6">
          <ChatWelcome onSendMessage={handleWelcomeMessage} />
        </div>
      </div>
    );
  }

  // Regular chat interface
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a33f9]/5 via-transparent to-[#0a33f9]/5" />
      </div>

      {/* Chat Header */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-800/50 bg-[#0a0a0a]/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <h2 className="text-sm md:text-base font-medium text-white truncate max-w-[200px] md:max-w-none">
            {currentConversation?.title || 'New Podcast Creation'}
          </h2>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-6 fade-in">
              <div
                className={`flex gap-3 md:gap-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-medium ${
                    message.role === 'user'
                      ? 'bg-[#0a33f9] text-white'
                      : message.role === 'system'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
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
                  className={`max-w-[85%] md:max-w-[70%] ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2.5 rounded-xl text-sm md:text-base ${
                      message.role === 'user'
                        ? 'bg-[#0a33f9] text-white'
                        : 'bg-[#1a1a1a]/80 text-gray-100 border border-gray-800/50'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="mb-6 fade-in">
              <div className="flex gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700/50 flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-medium">
                  AI
                </div>
                <div className="bg-[#1a1a1a]/80 text-gray-100 border border-gray-800/50 px-4 py-2.5 rounded-xl">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-0 z-10 border-t border-gray-800/50 bg-[#0a0a0a]/95 backdrop-blur-xl p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your podcast..."
              className="w-full px-4 py-3 md:px-5 md:py-4 pr-12 md:pr-14 bg-[#1a1a1a]/80 border border-gray-800/50 rounded-xl md:rounded-2xl text-white placeholder-gray-500 resize-none focus:outline-none focus:border-gray-700/50 text-sm md:text-base"
              rows={1}
              style={{
                minHeight: '48px',
                maxHeight: '120px',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 md:right-3 md:bottom-3 w-8 h-8 md:w-10 md:h-10 bg-[#0a33f9] hover:bg-[#0829d4] disabled:bg-gray-700 text-white rounded-lg flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
