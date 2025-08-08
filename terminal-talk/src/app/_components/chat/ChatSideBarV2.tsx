'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { PiSidebarThin } from 'react-icons/pi';
import { useUser, SignedIn, UserButton } from '@clerk/nextjs';

export default function ChatSideBarV2() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { conversations } = useChat();

  // Check if current chat is active
  const isActiveChat = (chatId: string) => {
    return pathname === `/chat/${chatId}`;
  };

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else if (window.innerWidth > 1024) {
        setIsCollapsed(false);
      }
    };

    // Check initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = () => {
    router.push('/dashboardV2/chat');
  };

  const handleViewLibrary = () => {
    router.push('/dashboardV2/library');
  };

  const handleViewCourses = () => {
    router.push('/dashboardV2/courses');
  };

  return (
    <div
      className={`relative ${
        isCollapsed ? 'w-[60px]' : 'w-[280px]'
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-full`}
    >
      {/* Logo + App Info Section */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        {/* TT Logo */}
        <div className="w-9 h-9 bg-[#1a2332] text-white rounded-lg flex items-center justify-center font-semibold text-lg flex-shrink-0">
          TT
        </div>

        {/* App Info - Only show when not collapsed */}
        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <h1 className="font-semibold text-base text-gray-900">
              Terminal Talks
            </h1>
            <span className="text-sm text-gray-500">AI Assistant</span>
          </div>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={handleNewChat}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600"
          >
            <path
              d="M10 4V16M4 10H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!isCollapsed && (
            <span className="text-sm font-medium text-gray-700">New Chat</span>
          )}
        </button>
      </div>

      {/* Library & Courses Section */}
      <div className="px-3 pb-3 border-b border-gray-100">
        <button
          onClick={handleViewLibrary}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!isCollapsed && (
            <span className="text-sm text-gray-700">My Library</span>
          )}
        </button>

        <button
          onClick={handleViewCourses}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors mt-1 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600"
          >
            <path
              d="M2 3H8C9.10457 3 10 3.89543 10 5V17C10 16.4477 9.55228 16 9 16H3C2.44772 16 2 16.4477 2 17V3Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 3H12C10.8954 3 10 3.89543 10 5V17C10 16.4477 10.4477 16 11 16H17C17.5523 16 18 16.4477 18 17V3Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!isCollapsed && (
            <span className="text-sm text-gray-700">View Courses</span>
          )}
        </button>
      </div>

      {/* Recent Chats Section */}
      <div className="flex-1 overflow-y-auto px-3">
        {!isCollapsed && (
          <>
            <button
              onClick={() => setIsRecentsOpen(!isRecentsOpen)}
              className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>Recent Chats</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`text-gray-400 transition-transform ${
                  isRecentsOpen ? '' : '-rotate-90'
                }`}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Chat List */}
            {isRecentsOpen && (
              <div className="space-y-0.5 pb-3">
                {conversations && conversations.length > 0 ? (
                  conversations.slice(0, 10).map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => router.push(`/chat/${chat.id}`)}
                      className={`w-full flex items-start gap-3 px-2 py-2 rounded-lg transition-all text-left group ${
                        isActiveChat(chat.id)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`mt-0.5 flex-shrink-0 ${
                          isActiveChat(chat.id)
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}
                      >
                        <path
                          d="M7 9H13M7 13H10M6 17H14C15.1046 17 16 16.1046 16 15V5C16 3.89543 15.1046 3 14 3H6C4.89543 3 4 3.89543 4 5V15C4 16.1046 4.89543 17 6 17Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm truncate ${
                            isActiveChat(chat.id) ? 'font-medium' : ''
                          }`}
                        >
                          {chat.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(chat.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-2 py-4 text-sm text-gray-500 text-center">
                    No conversations yet
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Collapsed state - show icons only */}
        {isCollapsed && (
          <div className="space-y-2 mt-4">
            <button
              className="w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Recent chat: React Best Practices"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400 mx-auto"
              >
                <path
                  d="M7 9H13M7 13H10M6 17H14C15.1046 17 16 16.1046 16 15V5C16 3.89543 15.1046 3 14 3H6C4.89543 3 4 3.89543 4 5V15C4 16.1046 4.89543 17 6 17Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-[72px] w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm z-10"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <PiSidebarThin
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* User Profile Section */}
      <SignedIn>
        <div className="border-t border-gray-200 p-3 mt-auto">
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                  userButtonTrigger: 'focus:shadow-none',
                },
              }}
              afterSignOutUrl="/"
            />
            {!isCollapsed && user && (
              <div className="flex flex-col text-left min-w-0">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {user.username}
                </span>
              </div>
            )}
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
