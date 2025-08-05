// app/_components/providers/ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class" // ← Applies `dark` class on <html>
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
