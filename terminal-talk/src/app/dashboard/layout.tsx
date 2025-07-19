import { Header } from '@/app/_components/dashboard/Header';
import Sidebar from '@/app/_components/dashboard/SideBar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect('/auth/login');

  // 4) Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 space-y-8">{children}</main>
      </div>
    </div>
  );
}
