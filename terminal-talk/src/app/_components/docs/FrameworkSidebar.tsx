'use client';

import { useState } from 'react';
import {
  ChevronRight,
  Book,
  Code,
  Cloud,
  Database,
  Layout,
  Settings,
} from 'lucide-react';

import { Framework } from '@/app/types/types';
import { useRouter } from 'next/navigation';

export default function FrameworkSidebar() {
  const router = useRouter();

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    nextjs: false,
  });
  const [selectedItem, setSelectedItem] = useState<string>('nextjs-intro');

  const frameworks: Framework[] = [
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: <Layout size={18} />,
      items: [
        { id: 'nextjs-intro', name: 'Introduction' },
        { id: 'nextjs-routing', name: 'Routing' },
        { id: 'nextjs-data', name: 'Data Fetching' },
        { id: 'nextjs-styling', name: 'Styling' },
        { id: 'nextjs-deploy', name: 'Deployment' },
      ],
    },
    {
      id: 'aws-cfl02',
      name: 'AWS CFL02',
      icon: <Cloud size={18} />,
      items: [
        { id: 'aws-intro', name: 'Getting Started' },
        { id: 'aws-compute', name: 'Compute Services' },
        { id: 'aws-storage', name: 'Storage Services' },
        { id: 'aws-database', name: 'Database Services' },
        { id: 'aws-security', name: 'Security & IAM' },
      ],
    },
    {
      id: 'react',
      name: 'React',
      icon: <Code size={18} />,
      items: [
        { id: 'react-intro', name: 'Introduction' },
        { id: 'react-components', name: 'Components' },
        { id: 'react-hooks', name: 'Hooks' },
        { id: 'react-state', name: 'State Management' },
        { id: 'react-advanced', name: 'Advanced Patterns' },
      ],
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: <Database size={18} />,
      items: [
        { id: 'node-intro', name: 'Introduction' },
        { id: 'node-modules', name: 'Modules' },
        { id: 'node-express', name: 'Express.js' },
        { id: 'node-database', name: 'Database Integration' },
        { id: 'node-auth', name: 'Authentication' },
      ],
    },
  ];

  const toggleSection = (sectionId: string): void => {
    console.log(sectionId);
    setExpandedSections((prev) => {
      console.log(prev);
      const newValue = !prev[sectionId];
      console.log(`Toggling section "${sectionId}" to:`, newValue);

      return {
        ...prev,
        [sectionId]: newValue,
      };
    });
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 fixed left-0 top-16 bottom-0 overflow-y-auto">
      {/* Section Header */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Book size={24} />
          Frameworks
        </h2>

        {/* Once We Have Our Content We Can Do This To Dynamically Add To Our NavBar */}
        {/* each Framework gets its own div */}
        <nav className="space-y-1">
          {frameworks.map((framework) => (
            <div key={framework.id}>
              <button
                onClick={() => toggleSection(framework.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {framework.icon}
                  <span>{framework.name}</span>
                </div>
                <ChevronRight
                  size={16}
                  className={`transform transition-transform ${
                    expandedSections[framework.id] ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {expandedSections[framework.id] && (
                <div className="ml-4 mt-1 space-y-1">
                  {framework.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item.id);
                        router.push(`/docs/${item.id}`);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                        selectedItem === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-8 p-4">
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors">
          <Settings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}
