'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { PiSidebarThin } from 'react-icons/pi';
import { useUser, SignedIn, UserButton } from '@clerk/nextjs';

export default function ChatSideBarV2() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
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
        setIsMobileOpen(false);
      } else if (window.innerWidth > 1024) {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = () => {
    router.push('/dashboardV2/chat');
    setIsMobileOpen(false);
  };

  const handleViewLibrary = () => {
    router.push('/dashboardV2/library');
    setIsMobileOpen(false);
  };

  const handleViewCourses = () => {
    router.push('/dashboardV2/courses');
    setIsMobileOpen(false);
  };

  const navigateToChat = (chatId: string) => {
    router.push(`/dashboardV2/chat/${chatId}`);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden bg-[#1a1a1a]/80 backdrop-blur p-2 rounded-lg border border-gray-800/50"
      >
        <svg
          className="w-5 h-5 text-white"
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

      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? 'w-[60px]' : 'w-[280px]'} 
          bg-[#0a0a0a] border-r border-gray-800/50 flex flex-col 
          transition-all duration-300 h-full
          fixed md:relative
          ${isMobileOpen ? 'left-0' : '-left-full md:left-0'}
          z-50 md:z-auto
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 md:hidden"
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo + App Info Section */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-9 h-9 bg-[#0a33f9] text-white rounded-lg flex items-center justify-center font-semibold text-lg flex-shrink-0">
            TT
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <h1 className="font-semibold text-base text-white">
                Terminal Talks
              </h1>
              <span className="text-sm text-gray-400">AI Assistant</span>
            </div>
          )}
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#1a1a1a]/80 backdrop-blur border border-gray-800/50 hover:bg-[#1a1a1a] hover:border-gray-700/50 transition-all ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
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
              <span className="text-sm font-medium text-white">New Chat</span>
            )}
          </button>
        </div>

        {/* Library & Courses Section */}
        <div className="px-3 pb-3 border-b border-gray-800/50">
          <button
            onClick={handleViewLibrary}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a]/50 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
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
              <span className="text-sm text-gray-200">My Library</span>
            )}
          </button>

          <button
            onClick={handleViewCourses}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1a1a1a]/50 transition-colors mt-1 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <path
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {!isCollapsed && (
              <span className="text-sm text-gray-200">Courses</span>
            )}
          </button>
        </div>

        {/* Recent Chats */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          {!isCollapsed && (
            <>
              <button
                onClick={() => setIsRecentsOpen(!isRecentsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Recents
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isRecentsOpen ? 'rotate-180' : ''
                  }`}
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
              </button>

              {isRecentsOpen && (
                <div className="mt-2 space-y-1">
                  {conversations.length > 0 ? (
                    conversations.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => navigateToChat(chat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all group ${
                          isActiveChat(chat.id)
                            ? 'bg-[#1a1a1a]/80 border border-gray-700/50'
                            : 'hover:bg-[#1a1a1a]/50'
                        }`}
                      >
                        <p
                          className={`text-sm truncate ${
                            isActiveChat(chat.id)
                              ? 'text-white font-medium'
                              : 'text-gray-300'
                          }`}
                        >
                          {chat.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(chat.updatedAt).toLocaleDateString()}
                        </p>
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

          {isCollapsed && (
            <div className="space-y-2 mt-4">
              {conversations.slice(0, 3).map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => navigateToChat(chat.id)}
                  className="w-full p-2 rounded-lg hover:bg-[#1a1a1a]/50 transition-colors"
                  title={chat.title}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-600 mx-auto"
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
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Toggle Button - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-[72px] w-6 h-6 bg-[#1a1a1a]/80 backdrop-blur border border-gray-800/50 rounded-full items-center justify-center hover:bg-[#1a1a1a] transition-colors shadow-sm z-10"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <PiSidebarThin
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* User Profile Section */}
        <SignedIn>
          <div className="border-t border-gray-800/50 p-3 mt-auto">
            <div
              className={`flex items-center gap-3 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <UserButton afterSignOutUrl="/auth/login" />
              {!isCollapsed && user && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.firstName || user.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              )}
            </div>
          </div>
        </SignedIn>
      </div>
    </>
  );
}
