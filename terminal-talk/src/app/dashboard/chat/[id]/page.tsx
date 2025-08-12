// app/dashboard/chat/[id]/page.tsx
import { ChatInterface } from '@/app/_components/chat/ChatInterface';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { loadConversationMessages } from '@/app/_lib/services/chatService';

export default async function ChatConversationPage({
  params,
}: {
  params: Promise<{ id: string }>; // Note: params is now a Promise in Next.js 15
}) {
  // Await params first (Next.js 15 requirement)
  const { id } = await params;

  // Check if ID is valid BEFORE making any database calls
  if (!id || id === 'undefined') {
    console.error('Invalid chat ID:', id);
    notFound();
  }

  // Get Current User
  const user = await currentUser();
  if (!user) {
    redirect('/auth/login');
  }

  try {
    // This returns ConversationWithMessages type
    const conversationData = await loadConversationMessages(id, user.id);

    // Just pass it straight through!
    return <ChatInterface conversationData={conversationData} />;
  } catch (error) {
    console.error('Failed to load conversation:', error);
    notFound();
  }
}
