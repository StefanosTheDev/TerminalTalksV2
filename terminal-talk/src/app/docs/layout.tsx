import React from 'react';
export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[240px] bg-black text-white"></aside>
      {/* This is a seperation technique so we have the SIDE NAV THEN MAIN OVERVIEW PAGE SEPERATE STANDARD FLOW */}
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        {children}
        {/* This is the white space area where page content renders */}
      </main>
    </div>
  );
}
