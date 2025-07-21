'use client';
import {
  Play,
  Volume2,
  Headphones,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  TerminalIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './_components/util/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function Page() {
  const router = useRouter();

  // Ask clerk where the visitor is signed in
  const { isSignedIn, isLoaded } = useAuth();
  // (optional) wait for Clerk to finish loading
  if (!isLoaded) return null;
  // 2) Decide label + destination // What a great strategy this is.
  const label = isSignedIn ? 'View Dashboard' : 'Login';
  const target = isSignedIn ? '/dashboard' : '/auth/login';

  //
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-800/50 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
            <TerminalIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Terminal Talks
          </span>
        </Link>

        <Button
          onClick={() => router.push(target)}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          {label}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </header>

      {/* Hero Section */}
      <section className="px-4 lg:px-6 py-20 lg:py-32 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-400/10 blur-3xl"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">
                  AI-Powered Learning Platform
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Master Development
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Through Audio Learning
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Developers deserve audio lectures based off core documentation
                to help learn and expand their knowledge on difficult concepts.
                If you're on the go or prefer to listen to info this might be
                the learning solution you need!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push('/auth/signup')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Get Started For Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Enhanced Visual Element */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-400"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded w-1/2 animate-pulse delay-100"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded w-5/6 animate-pulse delay-200"></div>
                </div>
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg p-4 mt-6 border border-gray-600/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-600 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-1/3 animate-pulse"></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">12:34</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg p-3 shadow-lg animate-bounce">
              <Headphones className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg p-3 shadow-lg border border-gray-600">
              <Volume2 className="h-6 w-6 text-blue-400" />
            </div>
            <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-white to-gray-100 rounded-lg p-2 shadow-lg">
              <span className="text-black text-sm font-medium">React.js</span>
            </div>
            <div className="absolute top-1/4 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2 shadow-lg">
              <Brain className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 lg:px-6 py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-blue-600 text-sm font-medium uppercase tracking-wider">
                Our Mission
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black">
              Transforming how developers{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                learn
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're building the future of developer education through{' '}
              <span className="font-semibold text-blue-600">
                AI-powered audio experiences
              </span>
            </p>
          </div>

          {/* Enhanced Feature Boxes */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Box 1 - AI-Powered Content */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors">
                AI-Powered Content
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our advanced AI transforms complex documentation into engaging,
                personalized audio lectures tailored to your learning style and
                pace.
              </p>
              <div className="flex items-center text-blue-500 font-medium group-hover:text-blue-600 transition-colors">
                {/* <Link href="/dashboard">{/* <span>Get Started</span> </Link> */}
              </div>
            </div>

            {/* Box 2 - Multi-Platform Support */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-green-200 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-green-600 transition-colors">
                Supporting All Frameworks
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our goal is to support all major technologies and framweworks
                that developers need to master.
              </p>
              <div className="flex items-center text-green-500 font-medium group-hover:text-green-600 transition-colors">
                {/* <Link href="/dashboard">
                  <span>Universal Coverage</span>
                </Link>{' '} */}
              </div>
            </div>

            {/* Box 3 - On-the-Go Learning */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-purple-200 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-purple-600 transition-colors">
                Learn Anywhere
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Perfect for commutes, workouts, or any time you want to absorb
                knowledge. Turn dead time into productive learning sessions.
              </p>
              <div className="flex items-center text-purple-500 font-medium group-hover:text-purple-600 transition-colors">
                {/* <Link href="/dashboard">
                  <span>Mobile First</span>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Beta Program Section */}
      <section className="px-4 lg:px-6 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-400/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">
                Beta Program
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Help Shape the Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Developer Learning
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Join our exclusive beta community and be part of building the next
              generation of audio learning for developers. Your feedback on
              product direction, AI quality, and learning experience will
              directly influence how we evolve Terminal Talks to serve the
              developer community better.
            </p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={() =>
                window.open(
                  'https://discord.gg/3js8XxZV8E',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
              variant="outline"
              size="lg"
              className="bg-white/5 text-white border-gray-600 hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300"
            >
              Join The Community
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                <span>Early access to new features</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse delay-200"></div>
                <span>Direct feedback channel</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse delay-400"></div>
                <span>Community-driven development</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
