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
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    // only refresh after sign-in, and if the username actually changed
    if (isSignedIn) {
      router.refresh();
    }
  }, [isLoaded, isSignedIn, user?.username, router]);

  if (!isLoaded) {
    return <div className="px-4 py-2">Loading…</div>;
  }
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

      <div className="ml-auto flex items-center">
        <div className="flex items-center space-x-2 bg-gray-800/40 px-3 py-2 rounded-lg">
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
              <div className="flex items-center space-x-2 flex-shrink-0">
                <UserButton afterSignOutUrl="/" />
                <span className="text-white whitespace-nowrap truncate max-w-xs">
                  {user?.username}
                </span>
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}
