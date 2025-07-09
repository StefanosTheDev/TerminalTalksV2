'use client';

import { useEffect } from 'react';

export default function ElevenLabsPlayer() {
  useEffect(() => {
    const scriptId = 'elevenlabs-audionative-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elevenlabs.io/player/audioNativeHelper.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="rounded-3xl p-6 max-w-2xl mx-auto shadow-2xl bg-gradient-to-br from-[#0f1216] to-[#0d0f13] border border-gray-800">
      <div
        id="elevenlabs-audionative-widget"
        data-height="90"
        data-width="100%"
        data-frameborder="no"
        data-scrolling="no"
        data-publicuserid="5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f"
        data-playerurl="https://elevenlabs.io/player/index.html"
        data-projectid="ub4yXuSKV1Q5RwbAxmLL"
        className="text-gray-300 text-sm leading-relaxed"
      >
        Loading the{' '}
        <a
          href="https://elevenlabs.io/text-to-speech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 underline"
        >
          Elevenlabs Text to Speech
        </a>{' '}
        AudioNative Player...
      </div>
    </div>
  );
}
