// app/components/NavBar.tsx
'use client';
import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <Link
        href="/"
        className="text-black no-underline text-base font-semibold"
      >
        Terminal Talks
      </Link>

      {/* Nav Links */}
      <nav className="flex gap-4">
        <Link
          href="/how-it-works"
          className="text-black no-underline text-base"
        >
          How It Works
        </Link>
        <Link href="/resources" className="text-black no-underline text-base">
          Resources
        </Link>
        <Link href="/pricing" className="text-black no-underline text-base">
          Pricing
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-5 py-2.5 text-base rounded-md border-2 border-transparent cursor-pointer transition-colors duration-200 text-black hover:text-zinc-900"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-5 py-2.5 text-base rounded-md border-2 border-transparent cursor-pointer transition-colors duration-200 text-zinc-900 bg-zinc-100 hover:bg-zinc-200"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
