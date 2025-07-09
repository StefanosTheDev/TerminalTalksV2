import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import StatsCard from '../_components/dashboard/StatsCard';
import FreeLibrary from '../_components/dashboard/FreeLibrary';

export default async function DocsHome() {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }
  console.log(user.createdAt);
  return (
    <>
      <main className="flex-1 p-8">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user.username} 👋
            </h1>
            <p className="text-gray-300">
              Continue your learning journey with our audio courses
            </p>
          </div>

          <FreeLibrary />
        </div>
      </main>
    </>
  );
}
