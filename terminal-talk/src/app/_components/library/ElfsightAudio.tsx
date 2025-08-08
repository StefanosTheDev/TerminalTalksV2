'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function ElfsightAudio() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).eapps) {
      (window as any).eapps.init();
    }
  }, []);

  return (
    <>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="lazyOnload"
      />
      <div
        className="elfsight-app-4af7a6ad-a0bf-4e50-af71-f77b5a349a17"
        data-elfsight-app-lazy
      />
    </>
  );
}
