'use client';

import { useRef, useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  FileText,
} from 'lucide-react';

export default function AudioPlayer({
  topic,
  transcript,
  audioUrl,
}: {
  topic: string;
  transcript: string;
  audioUrl: string;
}) {
  console.log(transcript);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [len, setLen] = useState(0);
  const [vol, setVol] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Sync audio element state
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
  }, [audioUrl]);

  // Volume/mute handlers
  useEffect(() => {
    if (audio.current) audio.current.volume = vol;
  }, [vol]);
  useEffect(() => {
    if (audio.current) audio.current.muted = muted;
  }, [muted]);

  const fmt = (t: number) =>
    `${Math.floor(t / 60)}:${Math.floor(t % 60)
      .toString()
      .padStart(2, '0')}`;
  const toggle = async () =>
    playing ? audio.current!.pause() : await audio.current!.play();
  const seek = (s: number) => {
    const el = audio.current!;
    el.currentTime = Math.max(0, Math.min(el.currentTime + s, len));
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-8 border border-gray-700/40 backdrop-blur-md shadow-2xl w-full max-w-2xl mx-auto">
      <audio
        key={audioUrl}
        ref={audio}
        src={audioUrl}
        preload="metadata"
        crossOrigin="anonymous"
      />

      <h3 className="text-xl font-semibold text-white mb-2">{topic}</h3>

      {/* Progress */}
      <div className="flex items-center gap-4 mb-6">
        <span className="w-10 text-xs text-gray-400">{fmt(pos)}</span>
        <input
          type="range"
          min={0}
          max={len || 0}
          value={pos}
          onChange={(e) => (audio.current!.currentTime = +e.target.value)}
          className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-cyan-400 bg-gray-700/60"
          style={{
            background: `linear-gradient(to right,#3b82f6 0%,#06b6d4 ${
              len ? (pos / len) * 100 : 0
            }%,#374151 ${len ? (pos / len) * 100 : 0}%,#374151 100%)`,
          }}
        />
        <span className="w-10 text-xs text-gray-400">
          {len ? fmt(len) : '--:--'}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IconBtn onClick={() => seek(-10)}>
            <SkipBack size={20} />
          </IconBtn>
          <button
            onClick={toggle}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-lg flex items-center justify-center transition"
          >
            {playing ? (
              <Pause size={26} />
            ) : (
              <Play size={26} className="ml-0.5" />
            )}
          </button>
          <IconBtn onClick={() => seek(10)}>
            <SkipForward size={20} />
          </IconBtn>
        </div>

        <div className="flex items-center gap-2">
          <IconBtn onClick={() => setMuted((prev) => !prev)}>
            {muted || vol === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </IconBtn>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : vol}
            onChange={(e) => {
              const v = +e.target.value;
              setVol(v);
              if (v > 0) setMuted(false);
            }}
            className="w-24 h-1 rounded-lg appearance-none cursor-pointer accent-cyan-400 bg-gray-700/60"
          />
        </div>
      </div>

      {/* Transcript Toggle */}
      <button
        onClick={() => setShowTranscript(!showTranscript)}
        className="flex items-center gap-2 mt-6 text-sm text-blue-300 hover:text-white transition"
      >
        <FileText size={16} />
        Transcript
        {showTranscript ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Transcript Section */}
      {showTranscript && (
        <div className="mt-4 max-h-64 overflow-y-auto border-t border-gray-700/40 pt-4">
          <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-600/30 text-sm text-gray-300 leading-relaxed whitespace-pre-line custom-scrollbar">
            {transcript}
          </div>
        </div>
      )}

      {/* Custom Slider Style */}
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg bg-gray-700/60 hover:bg-gray-600/60 transition"
    >
      {children}
    </button>
  );
}
