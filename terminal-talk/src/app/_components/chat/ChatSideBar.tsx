// app/_components/chat/ChatSideBar.tsx - With blue gradients
'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useChat } from './ChatProvider';

interface ChatSidebarProps {
  userName: string;
}

export function ChatSidebar({ userName }: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { conversations } = useChat();

  const currentView = searchParams.get('view') || 'chat';

  const handleNewChat = () => {
    router.push('/chat');
  };

  const handleViewChange = (view: string) => {
    if (view === 'chat') {
      router.push('/chat');
    } else {
      router.push(`/chat?view=${view}`);
    }
  };

  const isActiveChat = (chatId: string) => {
    return pathname === `/chat/${chatId}`;
  };

  const isActiveView = (view: string) => {
    if (view === 'chat' && pathname === '/chat' && !searchParams.get('view')) {
      return true;
    }
    return currentView === view;
  };

  return (
    <div
      className={`${
        isCollapsed ? 'w-[60px]' : 'w-[280px]'
      } bg-[#1a1a1a] border-r border-gray-800 flex flex-col transition-all duration-200 h-full relative`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none" />

      {/* Logo Section */}
      <div className="relative flex items-center gap-3 p-4 border-b border-gray-800">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-md flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg shadow-blue-500/25">
          TT
        </div>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-md font-semibold text-white">
              Terminal Talks
            </span>
          </div>
        )}
      </div>

      {/* New Chat Button */}
      <button
        onClick={handleNewChat}
        className={`m-4 ${
          isCollapsed ? 'p-2' : 'px-4 py-2'
        } bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25`}
      >
        {isCollapsed ? '+' : 'New Chat'}
      </button>

      {/* Navigation */}
      <nav className="relative flex-1 overflow-y-auto px-4">
        <div className="space-y-1 pb-4 border-b border-gray-800">
          {/* Create Podcast */}
          <button
            onClick={() => handleViewChange('chat')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              isActiveView('chat')
                ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]/50'
            }`}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {!isCollapsed && (
              <span className="text-sm font-medium">Create Podcast</span>
            )}
          </button>

          {/* TT Classics */}
          <button
            onClick={() => handleViewChange('classics')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              isActiveView('classics')
                ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]/50'
            }`}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {!isCollapsed && (
              <span className="text-sm font-medium">TT Classics</span>
            )}
          </button>

          {/* My Library */}
          <button
            onClick={() => handleViewChange('library')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              isActiveView('library')
                ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]/50'
            }`}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            {!isCollapsed && (
              <span className="text-sm font-medium">My Library</span>
            )}
          </button>
        </div>

        {/* Recent Podcasts */}
        {!isCollapsed && (
          <div className="mt-4">
            <button
              onClick={() => setIsRecentsOpen(!isRecentsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">
                Recent Podcasts
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isRecentsOpen ? 'rotate-180' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            {isRecentsOpen && (
              <div className="mt-2 space-y-1">
                {conversations.length > 0 ? (
                  conversations.slice(0, 10).map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                        isActiveChat(chat.id)
                          ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-400 hover:text-gray-300 hover:bg-[#2a2a2a]/50'
                      }`}
                    >
                      <div className="truncate">{chat.title}</div>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-600 italic">
                    No conversations yet
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
