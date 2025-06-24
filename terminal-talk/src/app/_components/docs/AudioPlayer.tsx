import { Zap } from 'lucide-react';

export function AudioPlayerSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Zap className="w-6 h-6 mr-2 text-blue-400" />
        Interactive Audio Player
      </h2>
    </section>
  );
}
