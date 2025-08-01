import React from 'react';
import Footer from '@/app/_components/learn/Footer';
import Header from '@/app/_components/learn/Header';
import SideNav from '@/app/_components/learn/SideNav';
import { currentUser } from '@clerk/nextjs/server';
import ElevenLabsAudioNative from '@/app/_components/learn/ElevanLabs';

export default async function ViewCourse() {
  const user = await currentUser();
  if (!user) {
    return (
      <p className="text-red-500">Please sign in to see your certificates.</p>
    );
  }

  // Fetch Server Componenet.

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      <div className="flex h-[calc(100vh-8rem)]">
        <SideNav />
        <ElevenLabsAudioNative />
      </div>
      <Footer />
    </div>
  );
}
