// components/Button.tsx
'use client';
import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

// Define as a normal function instead of a const
export function Button({ onClick, className = '', children }: ButtonProps) {
  return (
    <button type="button" className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
