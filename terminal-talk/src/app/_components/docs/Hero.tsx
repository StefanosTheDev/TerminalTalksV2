// Hero.tsx
import { ChevronRight, Zap } from 'lucide-react';
import { Button } from '../util/Button';

export function Hero() {
  return (
    <section className="mb-12">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
        <Zap className="w-4 h-4 text-blue-400" />
        <span className="text-blue-300 text-sm font-medium">
          AI-Powered Documentation
        </span>
      </div>

      <h1 className="text-4xl lg:text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          Audio Lectures For Developers
        </span>
      </h1>

      <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
        Terminal Talks is the easiest way to add AI-generated audio lectures to
        your learning workflow...
      </p>

      <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group">
        Get Started
        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </section>
  );
}
