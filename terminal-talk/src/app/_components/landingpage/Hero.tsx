import React from 'react';
import { Sparkles } from 'lucide-react';
import TechStack from './TechStack';

export default function Hero() {
  return (
    <section className="text-center mb-16">
      <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
        <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
        <span className="text-sm text-purple-300">
          AI-Powered Documentation Learning
        </span>
      </div>
      <h2 className="text-5xl font-bold mb-6 leading-tight">
        Master Technical Concepts Through
        <br />
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Intelligent Audio Lectures
        </span>
      </h2>
      <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Transform complex documentation into digestible podcast-style lectures.{' '}
        <br />
        Learn at your pace with AI-crafted content tailored to your skill level.
      </p>
      <TechStack />
    </section>
  );
}
