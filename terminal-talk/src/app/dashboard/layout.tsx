'use client';
import SideNav from './SideNav';

import React from 'react';

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <SideNav />
      {children}
    </div>
  );
}
