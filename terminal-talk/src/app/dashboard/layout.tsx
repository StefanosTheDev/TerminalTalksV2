import { SideNav } from '@/app/_components/dashboard/SideNav';
import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth/nextAuth';
import { redirect } from 'next/navigation';

import React from 'react';

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }
  return (
    <div className="flex min-h-screen">
      <aside className="w-[240px] bg-black text-white">
        <SideNav />
      </aside>
      {/* This is a seperation technique so we have the SIDE NAV THEN MAIN OVERVIEW PAGE SEPERATE STANDARD FLOW */}
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        {children}{' '}
        {/* This is the white space area where page content renders */}
      </main>
    </div>
  );
}
