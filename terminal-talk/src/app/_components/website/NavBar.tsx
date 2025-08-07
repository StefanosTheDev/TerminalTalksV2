// components/Navbar.tsx
'use client';

import { JSX, useState } from 'react';
import { SocialIcons } from './SocialIcons';

import Link from 'next/link';
export function Navbar() {
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Prevent default click behavior
  const handleDisabledClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-4 md:px-8 z-20">
      {/* Logo/Brand */}
      <div className="flex items-center">
        <span className="text-white text-xl font-bold">Terminal Talks</span>
      </div>

      {/* Centered Navigation Links */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-6">
        <a
          href="/community"
          onClick={handleDisabledClick}
          className="text-gray-400 hover:text-gray-400 text-base font-bold transition-colors cursor-not-allowed opacity-60"
        >
          Community
        </a>
        <a
          href="/pricing"
          onClick={handleDisabledClick}
          className="text-gray-400 hover:text-gray-400 text-base font-bold transition-colors cursor-not-allowed opacity-60"
        >
          Pricing
        </a>

        <a
          href="/blog"
          onClick={handleDisabledClick}
          className="text-gray-400 hover:text-gray-400 text-base font-bold transition-colors cursor-not-allowed opacity-60"
        >
          Blog
        </a>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <SocialIcons />
        <div
          onClick={handleDisabledClick}
          className="px-4 py-2 bg-[#2a2a2a]/80 backdrop-blur-xl border border-gray-700/50 text-gray-400 text-[13px] font-medium rounded-lg cursor-not-allowed opacity-60"
        >
          Log in
        </div>

        <div
          onClick={handleDisabledClick}
          className="px-4 py-2 bg-gray-600 text-gray-300 text-[13px] font-semibold rounded-lg cursor-not-allowed opacity-60"
        >
          Get started
        </div>
      </div>
    </nav>
  );
}
