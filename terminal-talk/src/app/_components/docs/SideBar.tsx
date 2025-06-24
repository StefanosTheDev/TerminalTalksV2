'use client';
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-gray-900/50 to-black/50 border-r border-gray-800/50 backdrop-blur-sm">
      <div className="p-6 space-y-6">
        {[
          {
            title: 'Introduction',
            links: [
              'Introduction',
              'AI Models',
              'Voice Synthesis',
              'Content Libraries',
            ],
          },
          {
            title: 'Audio Routes',
            links: ['Generating Audio', 'Working with Lectures'],
          },
          {
            title: 'Getting Started',
            links: [
              'React Integration',
              'Next.js Setup',
              'Vue.js Integration',
              'Python SDK',
            ],
          },
          {
            title: 'AI Integrations',
            links: ['OpenAI', 'ElevenLabs', 'Custom Models'],
          },
          {
            title: 'Guides',
            links: [
              'Authentication & Security',
              'Error Handling',
              'Rate Limits & ACLs',
              'Theming',
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((label, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="flex items-center text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg transition-all"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
