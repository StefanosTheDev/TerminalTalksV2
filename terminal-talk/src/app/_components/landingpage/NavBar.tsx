// _components/landingpage/NavBar.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { FaTerminal } from 'react-icons/fa'; // Example from Font Awesome

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      {/* Logo / Title */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          <FaTerminal size={24} color="black" />
          Terminal Talks
        </span>
      </div>

      {/* Nav links + Auth */}
      <ul className="flex items-center space-x-6">
        <li>
          <Link href="/" className="text-gray-300 hover:text-white">
            How It Works
          </Link>
        </li>
        <li>
          <Link href="/" className="text-gray-300 hover:text-white">
            Beta Program
          </Link>
        </li>
        <SignedOut>
          <li>
            <Link
              className="text-gray-300 hover:text-white transition-colors"
              href="/auth/sign-in"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link href="/auth/sign-up">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                Sign Up
              </button>
            </Link>
          </li>
        </SignedOut>

        <SignedIn>
          <li>
            <UserButton />
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
}
