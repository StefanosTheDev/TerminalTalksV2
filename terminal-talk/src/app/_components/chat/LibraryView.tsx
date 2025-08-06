// app/_components/chat/LibraryView.tsx
'use client';

import { useState, useEffect } from 'react';
import { LibraryClient } from '../library/Library';
export function LibraryView() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's podcasts
    fetch('/api/podcasts')
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data.podcasts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch podcasts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading your podcasts...</div>
      </div>
    );
  }

  return <LibraryClient podcasts={podcasts} />;
}
