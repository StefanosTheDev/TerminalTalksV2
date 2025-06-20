import AnimatedBackground from './_components/landingpage/AnimationBackground';
import Hero from './_components/landingpage/Hero';
import NavBar from './_components/landingpage/NavBar';

import React, { useState, useEffect } from 'react';
import StatsGrid from './_components/landingpage/StatsGrid';

import Footer from './_components/landingpage/Footer';
import Pricing from './_components/landingpage/Pricing';

const episodes = [
  {
    id: 1,
    title: 'Understanding React Server Components',
    duration: '45 min',
    level: 'Intermediate',
    description:
      'Deep dive into the revolutionary Server Components architecture',
    transcript:
      "Welcome to Terminal Talks! Today we're exploring React Server Components, a game-changing feature that fundamentally shifts how we think about React applications...",
    tags: ['RSC', 'Performance', 'Architecture'],
  },
  {
    id: 2,
    title: 'Next.js App Router: Complete Guide',
    duration: '38 min',
    level: 'Beginner',
    description:
      'Master the new App Router with practical examples and best practices',
    transcript:
      "The App Router represents a paradigm shift in how we build Next.js applications. Let's break down everything you need to know...",
    tags: ['Routing', 'App Router', 'Next.js 14'],
  },
  {
    id: 3,
    title: 'Advanced Data Fetching Patterns',
    duration: '52 min',
    level: 'Advanced',
    description:
      'Optimize your data fetching with Suspense, streaming, and parallel routes',
    transcript:
      "Data fetching in modern React applications has evolved significantly. Today, we'll explore cutting-edge patterns...",
    tags: ['Data Fetching', 'Suspense', 'Performance'],
  },
];

export default function TerminalTalks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <AnimatedBackground />
      <NavBar />
      <main className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <Hero />
        <StatsGrid />
        {/* <AudioVisualizer
          isPlaying={''}
          audioWave={''}
          showTranscript={''}
          onToggleTranscript={''}
        />
        <EpisodeList
          episodes={episodes}
          selectedEpisode={''}
          isPlaying={''}
          showTranscript={''}
          onSelect={''}
          onPlayPause={''}
        /> */}
      </main>
      <Footer />
    </div>
  );
}
