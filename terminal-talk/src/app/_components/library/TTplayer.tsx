// app/components/TTPlayer.tsx
'use client';
import dynamic from 'next/dynamic';
const Player = dynamic(() => import('react-h5-audio-player'), { ssr: false });
import 'react-h5-audio-player/lib/styles.css';

export function TTPlayer({ src }: { src: string }) {
  return (
    <Player src={src} autoPlayAfterSrcChange={false} showJumpControls={false} />
  );
}
