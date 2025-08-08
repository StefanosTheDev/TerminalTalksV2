// components/AudibleSimple.tsx
'use client';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

function Rewind30Icon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M24 8a16 16 0 1 0 16 16" strokeLinecap="round" />
      <polyline points="24 4 20 8 24 12" strokeLinecap="round" />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
        fontWeight="bold"
      >
        30
      </text>
    </svg>
  );
}

function Forward30Icon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M24 8a16 16 0 1 1-16 16" strokeLinecap="round" />
      <polyline points="24 4 28 8 24 12" strokeLinecap="round" />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
        fontWeight="bold"
      >
        30
      </text>
    </svg>
  );
}

export default function AudibleSimple({
  src,
  cover,
  chapter = 'Chapter 1',
}: {
  src: string;
  cover: string;
  chapter?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  const toggle = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, time));
  };

  const changeSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 1.75, 2];
    const next = speeds[(speeds.indexOf(rate) + 1) % speeds.length];
    setRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const fmt = (sec: number) => {
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((sec / 60) % 60)
      .toString()
      .padStart(2, '0');
    const h = Math.floor(sec / 3600);
    return h ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setCurrent(audio.currentTime);
    const loaded = () => setDuration(audio.duration || 0);
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', loaded);
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', loaded);
    };
  }, []);

  return (
    <div className="max-w-sm mx-auto rounded-xl bg-white p-4 shadow-lg text-center">
      {/* Cover */}
      <img
        src={cover}
        alt=""
        className="w-60 h-60 mx-auto rounded-2xl object-cover mb-4"
      />

      {/* Chapter */}
      <div className="text-lg font-medium">{chapter}</div>

      {/* Seek bar */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={current}
        onChange={(e) => seek(Number(e.target.value))}
        className="w-full accent-orange-500 my-2"
      />

      {/* Times */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{fmt(current)}</span>
        <span>{fmt(Math.max(0, duration - current))} left</span>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-8 mt-4">
        {/* -30 */}
        <button
          onClick={() => seek(current - 30)}
          className="h-14 w-14 border-2 border-gray-800 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100"
          aria-label="Rewind 30 seconds"
        >
          <Rewind30Icon />
        </button>

        {/* Play/Pause */}
        <button
          onClick={toggle}
          className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-900 text-white"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause size={28} />
          ) : (
            <Play size={28} className="ml-1" />
          )}
        </button>

        {/* +30 */}
        <button
          onClick={() => seek(current + 30)}
          className="h-14 w-14 border-2 border-gray-800 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100"
          aria-label="Forward 30 seconds"
        >
          <Forward30Icon />
        </button>
      </div>

      {/* Narration speed */}
      <div className="mt-6">
        <button
          onClick={changeSpeed}
          className="flex flex-col items-center text-gray-900 hover:opacity-80"
        >
          <span className="text-lg font-bold">{rate.toFixed(1)}x</span>
          <span className="text-xs text-gray-500">Narration speed</span>
        </button>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
