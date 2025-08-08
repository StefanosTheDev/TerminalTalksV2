// app/components/TTPlayer.tsx
'use client';

import dynamic from 'next/dynamic';
const Player = dynamic(() => import('react-h5-audio-player'), { ssr: false });
import 'react-h5-audio-player/lib/styles.css';
import './ttplayer-compact.css'; // <- add this file

export function TTPlayer({ src }: { src: string }) {
  return (
    <Player
      className="tt-compact tt-dark"
      src={src}
      autoPlay
      autoPlayAfterSrcChange
      showJumpControls={false}
    />
  );
}
