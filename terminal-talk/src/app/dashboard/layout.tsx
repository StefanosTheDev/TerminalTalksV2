import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  getMinimalConversationList,
  getUserConversations,
} from '@/app/_lib/services/chatService';
import { ChatProvider } from '@/app/_components/chat/ChatProvider';
import ChatSideBar from '../_components/chat/ChatSideBar';
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user || !user.username) {
    redirect('/auth/login');
  }

  // Server Side. Get User Conversations.
  const conversations = await getUserConversations(user.id);
  return (
    <ChatProvider initialConversations={conversations}>
      <div className="flex h-screen bg-white">
        <ChatSideBar />
        <main className="flex-1 overflow-hidden pl-0 md:pl-0">{children}</main>
      </div>
    </ChatProvider>
  );
}
