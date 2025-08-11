'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
    messages: chatMessages, // ✅ alias so we never shadow
    sendMessage,
    loadConversation,
    isLoading,
    currentConversation,
    clearCurrentConversation,
  } = useChat();

  // ✅ Always render from a safe array
  const messages = Array.isArray(chatMessages) ? chatMessages : [];

  // 🧠 Load/clear on conversationId change, with race-safety
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (conversationId) {
        setShowWelcome(false);
        await loadConversation(conversationId);
        if (cancelled) return;
      } else {
        setShowWelcome(true);
        clearCurrentConversation();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [conversationId, loadConversation, clearCurrentConversation]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]); // 👈 depend on length, not object identity

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const el = e.target;
      setInput(el.value);
      // Minimal layout thrash: use rAF
      requestAnimationFrame(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + 'px';
      });
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        void handleSend();
      }
    },
    []
  );

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const message = input;
    setInput('');
    setShowWelcome(false);
    // Optional: optimistic scroll
    await sendMessage(message);
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [input, isLoading, sendMessage]);

  const handleWelcomeMessage = useCallback(
    async (message: string) => {
      setShowWelcome(false);
      await sendMessage(message);
    },
    [sendMessage]
  );

  // Welcome screen
  if (!conversationId && showWelcome) {
    return (
      <div className="relative flex flex-col h-full bg-[#0a0a0a] overflow-hidden">
        {/* ... existing SVG background ... */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-6">
          <ChatWelcome onSendMessage={handleWelcomeMessage} />
        </div>
      </div>
    );
  }

  // Regular chat interface
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] relative">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-800/50 bg-[#0a0a0a]/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <h2 className="text-sm md:text-base font-medium text-white truncate max-w-[200px] md:max-w-none">
            {currentConversation?.title || 'New Podcast Creation'}
          </h2>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={String(message.id)} className="mb-6 fade-in">
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

                {/* Bubble */}
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
            <div className="mb-6 fade-in">{/* typing indicator ... */}</div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 z-10 border-t border-gray-800/50 bg-[#0a0a0a]/95 backdrop-blur-xl p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSend();
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
              style={{ minHeight: '48px', maxHeight: '120px' }}
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
