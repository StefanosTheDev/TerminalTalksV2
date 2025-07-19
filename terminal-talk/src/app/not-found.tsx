import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4">
      {/* Big numeric headline */}
      <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
        404
      </h1>
      {/* Secondary copy */}
      <h2 className="mt-4 text-2xl lg:text-3xl font-semibold">
        Page not found
      </h2>
      <p className="mt-2 max-w-md text-center text-gray-400">
        The route you’re trying to reach doesn’t exist or has been moved.
      </p>

      {/* Call-to-action */}
      <Link
        href="/dashboard"
        className="group inline-flex items-center gap-2 mt-8 rounded-lg
                   border border-gray-700 bg-white/5 px-6 py-3 text-lg font-medium
                   backdrop-blur-sm transition hover:bg-white/10
                   focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <ArrowLeftCircle className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        Back to Dashboard
      </Link>
    </div>
  );
}
