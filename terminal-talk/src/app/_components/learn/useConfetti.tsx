// app/_components/learn/useConfetti.ts
'use client';

import confetti from 'canvas-confetti';

export function launchConfetti() {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 },
    zIndex: 9999,
  });
}
