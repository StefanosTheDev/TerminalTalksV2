'use client';
import { Terminal } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left side */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">
                Terminal Talks
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <h2 className="text-sm font-medium">Documentation</h2>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <h2 className="text-sm font-medium">Blog</h2>
              </button>
            </nav>
          </div>

          {/* Right side - Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/docs">
                <button className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-800 border border-gray-300 rounded-md transition">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton
                mode="modal"
                forceRedirectUrl="/docs"
                fallbackRedirectUrl="/docs"
              >
                <button className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition">
                  Register
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
