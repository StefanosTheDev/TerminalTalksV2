// app/_components/chat/ChatSideBar.tsx - With blue gradients
'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useChat } from './ChatProvider';

interface ChatSidebarProps {
  userName: string;
}

export function ChatSidebar({ userName }: ChatSidebarProps) {
  const [isCollapsed] = useState(false);
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

  console.log(userName);
  return (
    <div
      className={`${
        isCollapsed ? 'w-[60px]' : 'w-[280px]'
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-200 h-full`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="w-8 h-8 bg-gray-900 text-white rounded-md flex items-center justify-center font-bold text-sm flex-shrink-0">
          TT
        </div>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full" />
              <span className="text-sm font-medium text-gray-900">Creator</span>
            </div>
            <span className="text-xs text-gray-500">Pro</span>
          </div>
        )}
      </div>

      {/* New Chat Button */}
      <div className="px-4 pt-4">
        <button
          onClick={handleNewChat}
          className={`w-full ${
            isCollapsed ? 'p-2' : 'px-4 py-2.5'
          } bg-gray-100 border border-gray-200 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-2`}
        >
          {isCollapsed ? '+' : 'New Chat'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 mt-4">
        <div className="space-y-1 pb-3">
          <button
            onClick={() => handleViewChange('classics')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              isActiveView('classics')
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
                d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12"
              />
            </svg>
            {!isCollapsed && <span className="text-sm">TT Classics</span>}
          </button>

          <button
            onClick={() => handleViewChange('library')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              isActiveView('library')
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              />
            </svg>
            {!isCollapsed && <span className="text-sm">My Library</span>}
          </button>
        </div>

        {/* Recent Podcasts Dropdown */}
        {!isCollapsed && (
          <div className="mt-2">
            <button
              onClick={() => setIsRecentsOpen(!isRecentsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">
                Recents
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
              <div className="mt-1 space-y-0.5">
                {conversations.slice(0, 10).map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => router.push(`/chat/${chat.id}`)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                      isActiveChat(chat.id)
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="truncate">{chat.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {new Date(chat.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
