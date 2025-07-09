'use client';

import Link from 'next/link';
import { Search, Brain } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800/50 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Terminal Talks
        </span>
      </Link>
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search Courses..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
          />
          {/* <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-gray-400 bg-gray-700/50 rounded border border-gray-600/50">
            Search
          </kbd> */}
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
          <nav className="flex items-center space-x-6">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 shadow-lg px-4 py-2 rounded-lg">
                  Create An Account
                </button>
              </SignUpButton>

              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 shadow-lg px-4 py-2 rounded-lg">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <h2> Stefanos Sophocleous</h2>
            </SignedIn>
          </nav>
        </div>
      </div>
      {/* Auth Buttons */}
    </header>
  );
}
