// app/layout.tsx
import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'; // YOU NEED THIS!

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
