// app/chat/page.tsx - With blue gradient accents
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import {
  fetchCoursesWithProgressStatus,
  fetchStatsCardInfo,
} from '../_lib/services/utilService';
import StatsCard from '../_components/dashboard/StatsCard';
import FreeLibrary from '../_components/dashboard/FreeLibrary';
import { ChatInterface } from '../_components/chat/ChatInterface';
import { LibraryView } from '../_components/chat/LibraryView';

export default async function ChatPage({
  searchParams,
}: {
  searchParams: { view?: string };
}) {
  const view = searchParams.view || 'chat';
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Render different content based on the view
  switch (view) {
    case 'library':
      return <LibraryView />;

    case 'classics':
      const stats = await fetchStatsCardInfo(user.id);
      const courses = await fetchCoursesWithProgressStatus(user.id);

      return (
        <div className="h-full overflow-y-auto relative">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />

          {/* Header with gradient accent */}
          <div className="relative bg-[#0a0a0a] border-b border-gray-800 px-8 py-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent" />
            <div className="relative">
              <h1 className="text-2xl font-bold text-white">
                Terminal Talks Classics
              </h1>
              <p className="text-gray-400 mt-1">
                Professional e-learning courses designed for engineers
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="relative px-8 py-6 bg-[#0a0a0a]">
            <StatsCard
              completedCourses={stats.certificates}
              inProgress={stats.inProgressCount}
              certificates={stats.certificates}
            />
          </div>

          {/* Course Grid */}
          <div className="relative px-8 pb-8 bg-[#0a0a0a]">
            <h2 className="text-lg font-semibold text-white mb-4">
              Courses Available: {courses.length}
            </h2>
            <FreeLibrary courses={courses} />
          </div>
        </div>
      );

    case 'chat':
    default:
      return <ChatInterface />;
  }
}
