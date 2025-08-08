// app/webplayer/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import placeholder from '@/app/public/TT.png';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

type NowPlaying = {
  id: string;
  title: string;
  description: string | null;
  audioUrl: string;
  duration: number | null;
  createdAt: string;
};

export default function WebPlayerPage() {
  const [track, setTrack] = useState<NowPlaying | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tt:webplayer:nowPlaying');
      if (raw) setTrack(JSON.parse(raw));
    } catch {}
  }, []);

  const handleClose = () => {
    if (window.opener && window.opener !== window) {
      window.close();
    } else {
      history.back();
    }
  };

  if (!track) {
    return (
      <main className="min-h-screen grid place-items-center bg-[#0a0a0a] text-white">
        <p>loading </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white p-6">
      <div className="relative w-full max-w-lg rounded-xl bg-black p-6 shadow-lg">
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          title="Close"
          className="absolute top-2 left-2 rounded-lg bg-black px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-white/20 hover:bg-neutral-900 transition-colors"
        >
          Close
        </button>

        {/* Cover Art */}
        <Image
          src={placeholder}
          alt={track.title}
          width={400}
          height={400}
          className="mb-4 rounded-lg"
        />

        {/* Title & Description */}
        <h2 className="mb-1 text-lg font-bold">{track.title}</h2>
        {track.description && (
          <p className="mb-4 text-sm text-white/60">{track.description}</p>
        )}

        {/* Speed toggle */}
        <SpeedToggle />

        {/* Audio Player */}
        {/* Audio Player */}
        <div className="flex justify-center mt-4">
          <AudioPlayer
            src={track.audioUrl}
            preload="metadata"
            showJumpControls={true}
            progressJumpSteps={{ backward: 30000, forward: 30000 }}
            progressJumpStep={30000}
            customControlsSection={[
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS,
            ]}
            customProgressBarSection={[
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.DURATION,
            ]}
            className="tt-player w-full max-w-sm" // limit width & keep centered
          />
        </div>
      </div>
    </main>
  );
}

function SpeedToggle() {
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const audio = document.querySelector<HTMLAudioElement>('.tt-player audio');
    if (audio) audio.playbackRate = rate;
  }, [rate]);

  const next = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 1.75, 2];
    const i = speeds.indexOf(rate);
    setRate(speeds[(i + 1) % speeds.length]);
  };

  return (
    <button
      onClick={next}
      className="mb-2 w-full rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15"
      aria-label="Change playback speed"
    >
      {rate.toFixed(2).replace(/\.00$/, '')}x • Narration speed
    </button>
  );
}
