// components/TTPlayer.tsx
'use client';

import { useRef, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function TTPlayer({
  src,
  title,
  author,
  cover,
}: {
  src: string;
  title: string;
  author?: string;
  cover?: string;
}) {
  const playerRef = useRef<AudioPlayer>(null);
  const [rate, setRate] = useState(1);

  const setPlaybackRate = (r: number) => {
    setRate(r);
    const audio = playerRef.current?.audio.current;
    if (audio) audio.playbackRate = r;
  };

  return (
    <div className="max-w-xl w-full rounded-2xl bg-[#121212] text-white shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex gap-4 p-4 items-center">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="h-16 w-16 rounded-lg object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-white/10" />
        )}
        <div className="min-w-0">
          <div className="truncate font-semibold">{title}</div>
          {author && (
            <div className="text-sm text-white/60 truncate">{author}</div>
          )}
        </div>

        {/* Speed dropdown */}
        <div className="ml-auto">
          <select
            aria-label="Playback speed"
            value={rate}
            onChange={(e) => setPlaybackRate(Number(e.target.value))}
            className="bg-white/10 text-white rounded-md px-2 py-1"
          >
            {[0.75, 1, 1.25, 1.5, 1.75, 2].map((r) => (
              <option key={r} value={r}>
                {r}×
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Player */}
      <AudioPlayer
        ref={playerRef}
        src={src}
        autoPlayAfterSrcChange={false}
        showJumpControls={true} // ±15s buttons
        showSkipControls={true} // next/prev (wire with onClickNext/Prev)
        customProgressBarSection={[
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.DURATION,
        ]}
        customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS]}
        className="tt-player"
      />
    </div>
  );
}
