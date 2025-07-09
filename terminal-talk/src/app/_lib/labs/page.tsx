'use client';

import { useEffect } from 'react';

export default function ElevenLabsPlayer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/player/audioNativeHelper.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20 bg-[#0d152e] backdrop-blur-lg">
        <div
          id="elevenlabs-audionative-widget"
          data-height="120"
          data-width="100%"
          data-frameborder="no"
          data-scrolling="no"
          data-publicuserid="5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f"
          data-playerurl="https://elevenlabs.io/player/index.html"
          data-projectid="mkkShdBKcJmVQk3TJ8EL"
        />
      </div>
    </div>
  );
}
