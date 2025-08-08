import StatsCard from '@/app/_components/dashboard/StatsCard';
import FreeLibrary from '@/app/_components/dashboard/FreeLibrary';
import {
  fetchCoursesWithProgressStatus,
  fetchStatsCardInfo,
} from '@/app/_lib/services/utilService';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function CoursePage() {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }
  const stats = await fetchStatsCardInfo(user.id);
  const courses = await fetchCoursesWithProgressStatus(user.id);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Terminal Talks Classics
        </h1>
        <p className="text-gray-600 mt-1">
          Professional e-learning courses designed for engineers
        </p>
      </div>

      <div className="px-8 py-6">
        <StatsCard
          completedCourses={stats.certificates}
          inProgress={stats.inProgressCount}
          certificates={stats.certificates}
        />
      </div>

      <div className="px-8 pb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Courses Available: {courses.length}
        </h2>
        <FreeLibrary courses={courses} />
      </div>
    </div>
  );
}
