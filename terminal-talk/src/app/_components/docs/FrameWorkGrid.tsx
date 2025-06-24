import Link from 'next/link';
import { Code, FileText } from 'lucide-react';

const frameworks = [
  {
    label: 'Next.js App Router',
    desc: "The Next.js App Router introduces a new model for building applications using React's latest features.",
    icon: <span className="text-white font-bold text-sm">N</span>,
    color: 'bg-black',
    hover: 'hover:border-blue-500/50',
    linkColor: 'text-blue-400 hover:text-blue-300',
  },
  {
    label: 'React',
    desc: 'The web framework for content-driven websites with React components and hooks.',
    icon: <Code className="h-5 w-5 text-white" />,
    color: 'bg-blue-500',
    hover: 'hover:border-blue-500/50',
    linkColor: 'text-blue-400 hover:text-blue-300',
  },
  {
    label: 'Vue.js',
    desc: 'Web development, streamlined with the progressive Vue.js framework.',
    icon: <span className="text-white font-bold text-sm">V</span>,
    color: 'bg-green-500',
    hover: 'hover:border-green-500/50',
    linkColor: 'text-green-400 hover:text-green-300',
  },
  {
    label: 'Python SDK',
    desc: 'Server-side JavaScript framework for building scalable applications.',
    icon: <span className="text-black font-bold text-sm">Py</span>,
    color: 'bg-yellow-500',
    hover: 'hover:border-yellow-500/50',
    linkColor: 'text-yellow-400 hover:text-yellow-300',
  },
  {
    label: 'Node.js',
    desc: 'The intuitive Node.js framework for server-side applications.',
    icon: <span className="text-white font-bold text-sm">N</span>,
    color: 'bg-green-600',
    hover: 'hover:border-green-500/50',
    linkColor: 'text-green-400 hover:text-green-300',
  },
  {
    label: 'REST API',
    desc: 'Direct API integration for custom implementations and advanced use cases.',
    icon: <FileText className="h-5 w-5 text-white" />,
    color: 'bg-purple-500',
    hover: 'hover:border-purple-500/50',
    linkColor: 'text-purple-400 hover:text-purple-300',
  },
];

export function FrameworkGrid() {
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
