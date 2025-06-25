import Link from 'next/link';
import { getFrameworks } from '@/app/_lib/data/topics';

export function FrameworkGrid() {
  const frameworks = getFrameworks();
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Frameworks</h2>
      <p className="text-gray-300 mb-8">
        Using a fullstack framework makes integrating Terminal Talks a breeze.
        No matter what framework you use, there's a good chance we have a first
        party adapter for it.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((fw, i) => (
          <div
            key={i}
            className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 ${fw.hover} transition-all duration-300 hover:shadow-lg backdrop-blur-sm`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`w-10 h-10 ${fw.color} rounded-lg flex items-center justify-center`}
              >
                {fw.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{fw.label}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{fw.desc}</p>
            <Link
              href="#"
              className={`${fw.linkColor} text-sm font-medium group-hover:underline`}
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
