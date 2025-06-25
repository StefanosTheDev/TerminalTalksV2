'use client';

import { useState } from 'react';

export default function ContentFooter() {
  const [boom, setBoom] = useState(false);
  if (boom) throw new Error('Simulated client-side crash');

  return (
    <div className="text-center mt-12">
      <h1 className="text-xl mb-4">Footer</h1>
      <button
        onClick={() => setBoom(true)}
        className="px-4 py-2 rounded bg-red-600 text-white"
      >
        💥 Crash me
      </button>
    </div>
  );
}
