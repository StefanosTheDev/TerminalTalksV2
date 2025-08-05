// app/layout.tsx
import { ReactNode } from 'react';
import { ThemeProvider } from '@/app/_components/providers/ThemeProvider'; // next-themes wrapper
import { ClerkProvider } from '@clerk/nextjs';

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
