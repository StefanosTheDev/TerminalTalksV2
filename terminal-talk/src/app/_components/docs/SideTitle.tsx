// SideTitle.tsx
'use client';
import React, { useEffect, useState } from 'react';

export default function SideTitle() {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Collect all headings on mount
  useEffect(() => {
    const hTags = Array.from(document.querySelectorAll('h1, h2')).filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );

    const parsed = hTags.map((el) => {
      const id = el.id || el.innerText.toLowerCase().replace(/\s+/g, '-');
      el.id = id;
      return { id, text: el.innerText };
    });
    setHeadings(parsed);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentId: string | null = null;
      for (const heading of document.querySelectorAll('h1, h2')) {
        const element = heading as HTMLElement;
        if (element.offsetTop <= scrollPosition) {
          currentId = element.id;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className="w-64 hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto px-4 text-sm text-gray-600">
      <p className="text-gray-400 uppercase tracking-wide text-xs mb-2">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block transition-colors ${
                activeId === heading.id
                  ? 'text-blue-600 font-semibold'
                  : 'hover:text-blue-500'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
