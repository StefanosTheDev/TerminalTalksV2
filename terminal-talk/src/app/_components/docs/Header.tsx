// import SearchButton from '@/components/SearchButton';

import { Terminal, FileText, Bookmark } from 'lucide-react';
export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left side */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">
                Terminal Talks
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <h2 className="text-sm font-medium">Documentation</h2>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <h2 className="text-sm font-medium">Blog</h2>
              </button>
            </nav>
          </div>

          {/* Right side - Search */}
          {/* <SearchButton /> */}
        </div>
      </div>
    </header>
  );
}
