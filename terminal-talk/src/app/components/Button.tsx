// components/Button.tsx
'use client';
import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

// Define as a normal function instead of a const
export function Button({
  onClick,
  className = '',
  children,
  startIcon,
  endIcon,
}: ButtonProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="mr-2">{endIcon}</span>}
    </button>
  );
}
