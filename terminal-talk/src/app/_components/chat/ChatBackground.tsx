'use client';

import clsx from 'clsx';

type Props = {
  className?: string;
  /** Hex color for the glow (no alpha). Default: #0a33f9 */
  glowColor?: string;
  /** Gaussian blur strength for the blobs. Default: 60 */
  blur?: number;
  /** Show grain overlay */
  grain?: boolean;
  /** Grain opacity (0–1). Default: 0.01 */
  grainOpacity?: number;
};

/**
 * Full-bleed gradient glow + optional grain texture.
 * Position this inside a relatively-positioned parent.
 */
export function BackgroundGradient({
  className,
  glowColor = '#0a33f9',
  blur = 60,
  grain = true,
  grainOpacity = 0.01,
}: Props) {
  // URL-encode the color for the SVG data URI
  const color = encodeURIComponent(glowColor);

  return (
    <div className={clsx('absolute inset-0', className)}>
      {/* Gradient blobs */}
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
      >
        <defs>
          <radialGradient id="topGlow1" cx="50%" cy="-10%" r="80%">
            <stop offset="30%" stopColor={glowColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="topGlow2" cx="30%" cy="0%" r="40%">
            <stop offset="20%" stopColor={glowColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="topGlow3" cx="70%" cy="0%" r="40%">
            <stop offset="30%" stopColor={glowColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bottomGlow" cx="50%" cy="100%" r="60%">
            <stop offset="30%" stopColor={glowColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>

          <filter id="bg-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="#0a0a0a" />

        <g filter="url(#bg-blur)" opacity="0.8">
          <ellipse cx="50%" cy="0%" rx="60%" ry="50%" fill="url(#topGlow1)" />
          <ellipse cx="30%" cy="20%" rx="40%" ry="40%" fill="url(#topGlow2)" />
          <ellipse cx="80%" cy="20%" rx="40%" ry="40%" fill="url(#topGlow3)" />
          <ellipse
            cx="50%"
            cy="100%"
            rx="80%"
            ry="40%"
            fill="url(#bottomGlow)"
          />
        </g>
      </svg>

      {/* Grain texture */}
      {grain && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: grainOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </div>
  );
}
