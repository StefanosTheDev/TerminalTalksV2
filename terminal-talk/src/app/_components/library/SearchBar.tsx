// components/SearchBar.tsx
'use client';

import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Search...',
  onSearch,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-lg ${className}`}>
      <div className="relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-[15px] pr-8"
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
