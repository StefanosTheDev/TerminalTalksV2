'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo + Language */}
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold">TerminalTalk</span>
          <span className="text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
            🌐 English
          </span>
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Safety</Link>
          <Link href="#">Cookies</Link>
          <Link href="#">Your Privacy Choices</Link>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800">
            🎧 Voice Chat
          </button>
          <div className="text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
            🇺🇸
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-4">
        © 2025 TerminalTalk. All rights reserved.
      </div>
    </footer>
  );
}
