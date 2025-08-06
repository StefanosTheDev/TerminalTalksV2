import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ChatInterface } from '../_components/chat/ChatInterface';
import { ChatSidebar } from '../_components/chat/ChatSideBar';
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

  // Get the chats for the Side Interface.

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar />
      <div className="flex-1">
        <ChatInterface />
        {children}
      </div>
    </div>
  );
}
