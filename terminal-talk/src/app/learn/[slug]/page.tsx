// app/course/[slug]/page.tsx
'use client';

import React from 'react';
import ElevenLabsPlayer from '@/app/_components/learn/ElevenLabsPlayer';
import Footer from '@/app/_components/learn/Footer';
import Header from '@/app/_components/learn/Header';
import SideNav from '@/app/_components/learn/SideNav';
// import { useCourse } from '@/app/context/courseContext';

export default function ViewCourse() {
  // Debate the best pre check Error handling
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      <div className="flex h-[calc(100vh-8rem)]">
        <SideNav />
        <ElevenLabsPlayer />
      </div>
      <Footer />
    </div>
  );
}
