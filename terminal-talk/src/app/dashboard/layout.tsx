import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserConversations } from '@/app/_lib/services/chatService';
import { ChatProvider } from '@/app/_components/chat/ChatProvider';
import ChatSideBar from '../_components/chat/ChatSideBar';
import { BackgroundGradient } from '../_components/website/BackgroundGradient';
// app/dashboard/layout.tsx

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user || !user.username) {
    redirect('/auth/login');
  }

  const conversations = await getUserConversations(user.id);

  return (
    <ChatProvider initialConversations={conversations}>
      <div className="flex h-screen bg-[#0a0a0a] relative">
        <BackgroundGradient />

        {/* Sidebar with higher z-index */}
        <div className="relative z-20">
          <ChatSideBar />
        </div>
        <main className="flex-1 overflow-hidden pl-0 md:pl-0 relative z-10">
          {children}
        </main>
      </div>
    </ChatProvider>
  );
}
