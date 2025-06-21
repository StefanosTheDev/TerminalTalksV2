'use client';
import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      {/* Left: Logo */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Terminal Talks V1.0
        </span>
      </div>

      {/* Center: Navigation Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              href="/docs"
              className="text-gray-300 hover:text-white font-semibold"
            >
              Documentation
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-gray-300 hover:text-white font-semibold"
            >
              Our Mission
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-gray-300 hover:text-white font-semibold"
            >
              Beta Program
            </Link>
          </li>
        </ul>
      </div>

      {/* Right: Get Started */}
      <div>
        <Link
          href="/docs"
          className=" px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
