'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { PiSidebarThin } from 'react-icons/pi';
import {
  Plus,
  Library,
  Menu,
  X,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';
import ClientUserButton from './ClientUserButton';

export default function ChatSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { conversations, clearCurrentConversation } = useChat();

  const isActiveChat = (chatId: string) => {
    return (
      pathname === `/chat/${chatId}` || pathname === `/dashboard/chat/${chatId}`
    );
  };

  // Remove auto-collapse on mobile - let it be full width when open
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = () => {
    clearCurrentConversation();
    router.push('/dashboard/chat');
    setIsMobileOpen(false);
  };

  const handleViewLibrary = () => {
    router.push('/dashboard/library');
    setIsMobileOpen(false);
  };

  const navigateToChat = (chatId: string) => {
    router.push(`/dashboard/chat/${chatId}`);
    setIsMobileOpen(false);
  };

  const HomeButton = () => {
    clearCurrentConversation();

    router.push('/dashboard/chat');
    setIsMobileOpen(false);
  };
  return (
    <>
      {/* Mobile overlay - darker like Claude */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden bg-[#1a1a1a]/80 backdrop-blur p-2 rounded-lg border border-gray-800/50"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? 'w-[60px]' : 'lg:w-[280px] w-[85vw] max-w-[320px]'} 
          bg-[#0a0a0a] border-r border-gray-800/50 flex flex-col 
          transition-all duration-300 h-full
          fixed lg:relative
          ${isMobileOpen ? 'left-0' : '-left-full lg:left-0'}
          z-50 lg:z-auto
          shadow-2xl lg:shadow-none
        `}
      >
        {/* Header Section with Logo and Close Button */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              className="w-9 h-9 bg-[#0a33f9] text-white rounded-lg flex items-center justify-center font-semibold text-lg flex-shrink-0"
              onClick={HomeButton}
            >
              TT
            </button>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <h1 className="font-semibold text-base text-white">
                  Terminal Talks
                </h1>
                <span className="text-sm text-gray-400">AI Assistant</span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 hover:bg-[#1a1a1a]/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* New Chat Button - keeping your styling */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all ${
              isCollapsed ? 'justify-center' : ''
            } ${
              pathname === '/dashboard/chat'
                ? 'bg-[#1a1a1a]/80 border border-gray-700/50'
                : 'hover:bg-[#1a1a1a]/50'
            }`}
          >
            <Plus
              className={`w-5 h-5 ${
                pathname === '/dashboard/chat' ? 'text-white' : 'text-gray-400'
              }`}
            />
            {!isCollapsed && (
              <span
                className={`text-sm font-medium ${
                  pathname === '/dashboard/chat'
                    ? 'text-white'
                    : 'text-gray-300'
                }`}
              >
                New Chat
              </span>
            )}
          </button>
        </div>

        {/* Library & Courses Section */}
        <div className="px-3 pb-3 border-b border-gray-800/50">
          <button
            onClick={handleViewLibrary}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isCollapsed ? 'justify-center' : ''
            } ${
              pathname === '/dashboard/library'
                ? 'bg-[#1a1a1a]/80 border border-gray-700/50'
                : 'hover:bg-[#1a1a1a]/50'
            }`}
          >
            <Library
              className={`w-5 h-5 ${
                pathname === '/dashboard/library'
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
            />
            {!isCollapsed && (
              <span
                className={`text-sm ${
                  pathname === '/dashboard/library'
                    ? 'text-white font-medium'
                    : 'text-gray-200'
                }`}
              >
                My Library
              </span>
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
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isRecentsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isRecentsOpen && (
                <div className="mt-2 space-y-1">
                  {conversations.length > 0 ? (
                    conversations.map((chat, i) => (
                      <button
                        key={i}
                        onClick={() => navigateToChat(chat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all group relative ${
                          isActiveChat(chat.id)
                            ? 'bg-[#1a1a1a]/80 border border-gray-700/50'
                            : 'hover:bg-[#1a1a1a]/50'
                        }`}
                      >
                        {/* Active indicator */}
                        {isActiveChat(chat.id) && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gray-400 rounded-r-full" />
                        )}
                        <p
                          className={`text-sm truncate ${
                            isActiveChat(chat.id)
                              ? 'text-white font-medium'
                              : 'text-gray-300'
                          }`}
                        >
                          {chat.title}
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
                  className={`w-full p-2 rounded-lg transition-colors relative ${
                    isActiveChat(chat.id)
                      ? 'bg-[#1a1a1a]/80 border border-gray-700/50'
                      : 'hover:bg-[#1a1a1a]/50'
                  }`}
                  title={chat.title}
                >
                  {/* Active indicator for collapsed mode */}
                  {isActiveChat(chat.id) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-400 rounded-r-full" />
                  )}
                  <MessageSquare
                    className={`w-5 h-5 mx-auto ${
                      isActiveChat(chat.id) ? 'text-white' : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Section */}
        <ClientUserButton isCollapsed={isCollapsed} />

        {/* Sidebar Toggle Button - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-[72px] w-6 h-6 bg-[#1a1a1a]/80 backdrop-blur border border-gray-800/50 rounded-full items-center justify-center hover:bg-[#1a1a1a] transition-colors shadow-sm z-10"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <PiSidebarThin
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </>
  );
}
