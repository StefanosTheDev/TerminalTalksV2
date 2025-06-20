// _components/landingpage/NavBar.tsx
import React from 'react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      {/* Logo / Title */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Terminal Talks
        </span>
      </div>

      {/* Nav links + Auth */}
      <ul className="flex items-center space-x-6">
        <li>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Our Mission
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Beta Program
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          ></a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            How It Works
          </a>
        </li>

        {/* Show these when NOT signed in */}
        <SignedOut>
          <li>
            <SignInButton mode="modal">
              <button className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </button>
            </SignInButton>
          </li>
          <li>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                Sign Up
              </button>
            </SignUpButton>
          </li>
        </SignedOut>

        {/* Show this when signed in */}
        <SignedIn>
          <li>
            <UserButton />
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
}
