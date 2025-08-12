'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { PiSidebarThin } from 'react-icons/pi';
import {
  Plus,
  Library,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';

export default function ChatSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { conversations } = useChat();

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
    router.push('/dashboard/chat');
    setIsMobileOpen(false);
  };

  const handleViewLibrary = () => {
    router.push('/dashboard/library');
    setIsMobileOpen(false);
  };

  const handleViewCourses = () => {
    router.push('/dashboard/courses');
    setIsMobileOpen(false);
  };

  const navigateToChat = (chatId: string) => {
    router.push(`/dashboard/chat/${chatId}`);
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
        <Menu className="w-5 h-5 text-white" />
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
          <X className="w-5 h-5 text-gray-400" />
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
            <Plus className="w-5 h-5 text-white" />
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
            <Library className="w-5 h-5 text-gray-400" />
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
            <BookOpen className="w-5 h-5 text-gray-400" />
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
                  <MessageSquare className="w-5 h-5 text-gray-600 mx-auto" />
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
      </div>
    </>
  );
}
