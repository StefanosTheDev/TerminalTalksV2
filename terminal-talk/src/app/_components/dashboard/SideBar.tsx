'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Crown,
  TrendingUp,
  Award,
  Search,
  Download,
} from 'lucide-react';

export default function SideBar() {
  const pathname = usePathname();

  const learningItems = [
    { id: '', label: 'Dashboard', icon: TrendingUp },

    { id: 'library', label: 'Free Library', icon: BookOpen },
    { id: 'premium', label: 'Premium Courses', icon: Crown },
  ];
  const certificate = [
    { id: 'certificates', label: 'Certificates', icon: Award },
  ];
  const getButtonStyles = (isActive: boolean) =>
    `w-full flex items-center text-left px-3 py-2 rounded-lg transition-all ${
      isActive
        ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-gray-900/50 to-black/50 border-r border-gray-800/50 backdrop-blur-sm">
      <div className="p-6 space-y-6">
        {/* Learning Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Learning
          </h3>
          <ul className="space-y-2">
            {learningItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.includes(item.id); // match current route

              return (
                <li key={item.id}>
                  <Link
                    href={`/dashboard/${item.id}`}
                    className={getButtonStyles(isActive)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Certificates
        </h3>

        <Link href={`/dashboard/${certificate[0].id}`}></Link>
      </div>
    </aside>
  );
}
