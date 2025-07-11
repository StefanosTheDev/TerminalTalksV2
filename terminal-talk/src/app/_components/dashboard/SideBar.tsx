'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Crown, TrendingUp, Award } from 'lucide-react';

export default function SideBar() {
  const pathname = usePathname();

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
            <li>
              <Link
                href="/dashboard"
                className={getButtonStyles(pathname === '/dashboard')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>Free Library</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/premium"
                className={getButtonStyles(
                  pathname?.includes('/dashboard/premium')
                )}
              >
                <Crown className="h-4 w-4 mr-2" />
                <span>Premium Courses</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Certificates Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Certificates
          </h3>
          <Link
            href="/dashboard/certificates"
            className={getButtonStyles(
              pathname?.includes('/dashboard/certificates')
            )}
          >
            <Award className="h-4 w-4 mr-2" />
            <span>Certificates</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
