// app/layout.tsx
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'; // YOU NEED THIS!
import { ThemeProvider } from './_components/providers/ThemeProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
