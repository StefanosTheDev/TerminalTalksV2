import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/app/_components/providers/ThemeProvider';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is logged in
  const user = await currentUser();
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {children}
    </div>
  );
}
