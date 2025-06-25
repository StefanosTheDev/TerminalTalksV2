'use client';

import { useEffect } from 'react';

export type ElevenLabsProps = {
  publicUserId: string;
  size?: 'small' | 'large';
  textColorRgba?: string;
  backgroundColorRgba?: string;
  children?: React.ReactNode;
};

export const ElevenLabsAudioNative = ({
  publicUserId,
  size = 'large',
  textColorRgba = 'rgba(0,0,0,1)',
  backgroundColorRgba = 'rgba(255,255,255,1)',
  children,
}: ElevenLabsProps) => {
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
    <div
      id="elevenlabs-audionative-widget"
      data-height={size === 'small' ? '90' : '120'}
      data-width="100%"
      data-frameborder="no"
      data-scrolling="no"
      data-publicuserid={publicUserId}
      data-playerurl="https://elevenlabs.io/player/index.html"
      data-small={size === 'small' ? 'True' : 'False'}
      data-textcolor={textColorRgba}
      data-backgroundcolor={backgroundColorRgba}
    >
      {children ?? 'Elevenlabs AudioNative Player'}
    </div>
  );
};

export default ElevenLabsAudioNative;
