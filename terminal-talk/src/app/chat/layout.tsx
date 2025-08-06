// app/chat/layout.tsx
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserConversations } from '@/app/_lib/services/chatService';
import { ChatProvider } from '@/app/_components/chat/ChatProvider';
import { ChatSidebar } from '@/app/_components/chat/ChatSideBar';

export default async function ChatLayout({
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
      <div className="flex h-screen bg-[#0a0a0a]">
        <ChatSidebar userName={user.username} />
        <div className="flex-1">{children}</div>
      </div>
    </ChatProvider>
  );
}
