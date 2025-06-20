// components/TechStack.tsx
import React from 'react';
import { SiReact, SiNextdotjs, SiVercel } from 'react-icons/si';

const logos = [
  { Icon: SiReact, label: 'React' },
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: SiVercel, label: 'Vercel' },
];

export default function TechStack() {
  return (
    <div className="mt-8 flex items-center justify-center space-x-8">
      {logos.map(({ Icon, label }) => (
        <div
          key={label}
          className="opacity-60 hover:opacity-100 transition-opacity duration-200"
          aria-label={label}
          title={label}
        >
          <Icon size={36} />
        </div>
      ))}
    </div>
  );
}
