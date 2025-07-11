import { Header } from '@/app/_components/dashboard/Header';
import Sidebar from '@/app/_components/dashboard/SideBar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/app/_lib/prisma';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect('/auth/login');

  // 2) Pull DB user + relations we need
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: {
      userCourses: true,
      certificates: true,
    },
  });
  if (!dbUser) redirect('/auth/login');

  // 4) Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 space-y-8">
          {/* <StatsCard
            completedCourses={completedCourses}
            inProgress={inProgress}
            certificates={certificates}
          /> */}
          {children}
        </main>
      </div>
    </div>
  );
}
