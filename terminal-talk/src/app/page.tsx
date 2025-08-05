'use client';
import { BackgroundGradient } from './_components/website/BackgroundGradient';
import { ChatInput } from './_components/website/ChatInput';
import { Navbar } from './_components/website/NavBar';
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
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center leading-tight">
              What do you want to hear?
            </h1>
            <p className="text-sm md:text-base font-normal text-gray-400 text-center">
              Create podcasts by chatting with AI.
            </p>
          </div>

          {/* Chat Input Component */}
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
