// app/_components/library/LibraryBackground.tsx
'use client';

export default function LibraryBackground() {
  return (
    <>
      {/* SVG gradient background */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 1920 1080"
        >
          <defs>
            <radialGradient id="libGlow1" cx="20%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="libGlow2" cx="80%" cy="70%" r="60%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="libGlow3" cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="libGlow4" cx="90%" cy="20%" r="40%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="#0a0a0a" />

          <g filter="url(#blur)" opacity="0.8">
            <ellipse
              cx="20%"
              cy="30%"
              rx="40%"
              ry="50%"
              fill="url(#libGlow1)"
            />
            <ellipse
              cx="80%"
              cy="70%"
              rx="50%"
              ry="40%"
              fill="url(#libGlow2)"
            />
            <ellipse
              cx="50%"
              cy="100%"
              rx="60%"
              ry="30%"
              fill="url(#libGlow3)"
            />
            <ellipse
              cx="90%"
              cy="20%"
              rx="30%"
              ry="40%"
              fill="url(#libGlow4)"
            />
          </g>
        </svg>
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
