/* app/_components/AudioPlayer.tsx
   Drop this file into src/app/_components/ then:
   import AudioPlayer from '@/app/_components/AudioPlayer';
   in any client page (or server page that renders a client subtree).
*/
'use client';

import { useRef, useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Public API – use like: <AudioPlayer src="https://example.com/foo.mp3" /> */
/* ------------------------------------------------------------------ */
export default function AudioPlayer({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement>(null);

  /* UI state */
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [length, setLen] = useState(0);
  const [volume, setVol] = useState(1);
  const [muted, setMuted] = useState(false);

  /* element → state */
  useEffect(() => {
    const el = audio.current;
    if (!el) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setPos(el.currentTime);
    const onMeta = () => setLen(el.duration || 0);

    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);

    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
    };
  }, [src]); // re-attach on source change

  /* keep element props in sync */
  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    if (audio.current) audio.current.muted = muted;
  }, [muted]);

  /* helpers */
  const fmt = (t: number) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60)
      .toString()
      .padStart(2, '0')}`;

  const toggle = async () =>
    playing ? audio.current!.pause() : await audio.current!.play();

  const seek = (sec: number) => {
    const el = audio.current!;
    el.currentTime = Math.max(0, Math.min(el.currentTime + sec, length));
  };

  /* JSX */
  return (
    <div className="w-80 p-4 rounded-xl bg-gray-800 text-white flex flex-col gap-4 shadow-lg">
      {/* native element */}
      <audio
        key={src} /* fresh element when src changes */
        ref={audio}
        src={src}
        preload="metadata"
        crossOrigin="anonymous"
        muted={muted}
      />

      {/* timeline */}
      <input
        type="range"
        min={0}
        max={length || 0}
        value={pos}
        onChange={(e) => (audio.current!.currentTime = +e.target.value)}
        className="w-full accent-cyan-400"
      />
      <div className="flex justify-between text-xs">
        <span>{fmt(pos)}</span>
        <span>{length ? fmt(length) : '--:--'}</span>
      </div>

      {/* controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconBtn onClick={() => seek(-10)} title="Back 10">
            <SkipBack size={20} />
          </IconBtn>
          <IconBtn onClick={toggle}>
            {playing ? <Pause size={24} /> : <Play size={24} />}
          </IconBtn>
          <IconBtn onClick={() => seek(10)} title="Fwd 10">
            <SkipForward size={20} />
          </IconBtn>
        </div>

        <div className="flex items-center gap-2">
          <IconBtn
            onClick={() => {
              audio.current!.muted = !audio.current!.muted;
              setMuted(audio.current!.muted);
            }}
          >
            {muted || volume === 0 ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </IconBtn>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              const v = +e.target.value;
              setVol(v);
              if (v > 0) setMuted(false);
            }}
            className="w-24 accent-cyan-400"
          />
        </div>
      </div>
    </div>
  );
}

/* small internal helper */
function IconBtn({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
    >
      {children}
    </button>
  );
}
