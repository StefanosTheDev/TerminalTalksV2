// app/chat/layout.tsx
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserConversations } from '@/app/_lib/services/chatService';
import { ChatProvider } from '@/app/_components/chat/ChatProvider';
import ChatSideBarV2 from '../_components/chat/ChatSideBarV2';
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
      <div className="flex h-screen bg-white">
        <ChatSideBarV2 />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </ChatProvider>
  );
}
