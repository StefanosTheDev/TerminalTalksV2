import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import StatsCard from '../_components/dashboard/StatsCard';
import FreeLibrary from '../_components/dashboard/FreeLibrary';
import { fetchStatsCardInfo } from '../_lib/services/utilService';

export default async function DocsHome() {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }
  const { certificates, inProgressCount, completedCount } =
    await fetchStatsCardInfo(user.id);

  return (
    <>
      <main className="flex-1 p-8">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user.username}! 👋
            </h1>
            <p className="text-gray-200">
              Continue your learning journey with our audio courses
            </p>
          </div>
          <StatsCard
            completedCourses={completedCount}
            inProgress={inProgressCount}
            certificates={certificates}
          />
          <FreeLibrary />;
        </div>
      </main>
    </>
  );
}
