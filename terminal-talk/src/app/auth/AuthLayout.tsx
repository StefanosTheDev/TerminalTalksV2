// components/AuthLayout.tsx
'use client';
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  /** Main heading text */
  title: string;
  /** Optional subheading/description */
  description?: string;
  /** Slot for form elements or buttons */
  children: ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-600">{description}</p>}
        {children}
      </div>
    </div>
  );
}
