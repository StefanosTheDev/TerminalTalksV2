import FrameworkSidebar from '@/app/_components/docs/client-ui/FrameworkSidebar';
import React from 'react';
import Header from '../_components/docs/client-ui/Header';
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Header />

      <FrameworkSidebar />
      <main className="flex-1 overflow-y-auto ml-64 bg-gray-100 text-gray-900">
        {children}
      </main>
    </div>
  );
}
