import { Brain } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../util/Button';

interface NavbarProps {
  currentPath?: string;
  user?: {
    name: string;
    initials: string;
  };
}

export default function Navbar({
  currentPath = '/dashboard',
  user = { name: 'John Doe', initials: 'JD' },
}: NavbarProps) {
  const isActive = (path: string) => currentPath === path;

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800/50 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Terminal Talks
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6 ml-8">
        <Link
          href="/dashboard"
          className={`font-medium transition-colors ${
            isActive('/dashboard')
              ? 'text-blue-400'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/courses"
          className={`transition-colors ${
            isActive('/courses')
              ? 'text-blue-400 font-medium'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          All Courses
        </Link>
        <Link
          href="/docs"
          className={`transition-colors ${
            isActive('/docs')
              ? 'text-blue-400 font-medium'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Documentation
        </Link>
      </nav>

      {/* User Profile & Settings */}
      <div className="ml-auto flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {user.initials}
            </span>
          </div>
          <span className="text-gray-300">{user.name}</span>
        </div>
      </div>
    </header>
  );
}
