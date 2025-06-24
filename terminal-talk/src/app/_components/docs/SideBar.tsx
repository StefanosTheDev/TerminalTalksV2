'use client';
import Link from 'next/link';
import { topics } from '@/app/_lib/data/topics'; // assumed to be a function returning an array
import { useState } from 'react';

export function Sidebar() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const sideNavOptions = topics();

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-gray-900/60 to-black/80 border-r border-gray-800/40 backdrop-blur-md">
      <div className="p-6 space-y-4">
        {sideNavOptions.map((element) => (
          <div key={element.id}>
            {/* Main Category Button */}
            <button
              onClick={() => toggleSection(element.id)}
              className="w-full text-left font-medium text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              {element.name}
            </button>

            {/* Dropdown Items */}
            {openSection === element.id && (
              <ul className="mt-2 pl-4 space-y-1">
                {element.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/docs/${item.id}`}
                      className="block text-sm text-gray-300 hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-all"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
