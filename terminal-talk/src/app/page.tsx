'use client';
import { BackgroundGradient } from './_components/website/BackgroundGradient';
import { ChatInput } from './_components/website/ChatInput';
import { Navbar } from './_components/website/NavBar';
import publicFace from '@/app/public/TT.png';
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Background Gradient Component */}
      <BackgroundGradient />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation Component */}
        <Navbar />

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          {/* Status Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-1 text-xs font-semibold text-white shadow-md animate-pulse">
              🚧 Currently in production – Coming soon!
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center leading-tight">
              What do you want to hear?
            </h1>
            <p className="text-sm md:text-base font-normal text-gray-400 text-center">
              Creating optimized developer podcasts by chatting with AI.
            </p>
          </div>

          {/* Chat Input Component */}
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
