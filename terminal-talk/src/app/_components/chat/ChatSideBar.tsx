'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useChat } from './ChatProvider';
import Link from 'next/link';
interface ChatSidebarProps {
  userName: string;
}

export function ChatSidebar({ userName }: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { conversations } = useChat();

  const handleNewChat = () => {
    router.push('/chat');
  };

  const isActiveChat = (chatId: string) => {
    return pathname === `/chat/${chatId}`;
  };

  return (
    <div
      className={`${
        isCollapsed ? 'w-[60px]' : 'w-[280px]'
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-200`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="w-8 h-8 bg-gray-900 text-white rounded-md flex items-center justify-center font-bold text-sm flex-shrink-0">
          TT
        </div>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-md font-semibold text-gray-900">
                {userName}
              </span>
            </div>
            {/* <span className="text-xs text-gray-500">Free</span> */}
          </div>
        )}
      </div>

      {/* New Chat Button */}
      <button
        onClick={handleNewChat}
        className={`m-4 ${
          isCollapsed ? 'p-2' : 'px-4 py-2'
        } bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium text-sm transition-colors`}
      >
        {isCollapsed ? '+' : 'New Chat'}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
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
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          Terminal Classics
        </Link>

        <Link
          href="/library"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
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
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          My Library
        </Link>
        {/* Recents Dropdown */}
        {!isCollapsed && (
          <div className="mt-4">
            <button
              onClick={() => setIsRecentsOpen(!isRecentsOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-sm text-gray-600">Recents</span>
              <svg
                className={`w-4 h-4 transition-transform text-gray-600 ${
                  isRecentsOpen ? 'rotate-180' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            {isRecentsOpen && (
              <div className="mt-1">
                {conversations.length > 0 ? (
                  conversations.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                      className={`w-full text-left px-4 py-2 pl-8 text-sm truncate transition-colors ${
                        isActiveChat(chat.id)
                          ? 'bg-gray-100 text-gray-900 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {chat.title}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 pl-8 text-sm text-gray-500">
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
