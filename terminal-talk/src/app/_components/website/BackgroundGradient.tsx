// components/BackgroundGradient.tsx
export function BackgroundGradient() {
  return (
    <>
      {/* Bolt-style Top Edge Gradient */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 1920 1080"
        >
          <defs>
            <radialGradient id="topGlow1" cx="50%" cy="-10%" r="80%">
              <stop offset="50%" stopColor="#0a33f9" stopOpacity="0.4" />
              <stop offset="120%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="topGlow3" cx="70%" cy="0%" r="40%">
              <stop offset="0%" stopColor="#0a33f9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0a33f9" stopOpacity="0" />
            </radialGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
            </filter>
          </defs>

          {/* Background */}
          <rect width="100%" height="100%" fill="#0a0a0a" />

          {/* Main gradient layers */}
          <g filter="url(#blur)" opacity="0.8">
            <ellipse cx="50%" cy="0%" rx="60%" ry="50%" fill="url(#topGlow1)" />
            <ellipse cx="0%" cy="20%" rx="40%" ry="40%" fill="url(#topGlow2)" />
            <ellipse
              cx="80%"
              cy="20%"
              rx="40%"
              ry="40%"
              fill="url(#topGlow3)"
            />
            <ellipse
              cx="50%"
              cy="100%"
              rx="80%"
              ry="40%"
              fill="url(#bottomGlow)"
            />
          </g>
        </svg>
      </div>

      {/* Very subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
