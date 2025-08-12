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
    redirect('/dashboard/chat'); // Redirect to new chat page
  }

  // Get Current User
  const user = await currentUser();
  if (!user) {
    redirect('/auth/login');
  }

  try {
    // Load conversation with messages
    const conversation = await loadConversationMessages(id, user.id);

    if (!conversation) {
      notFound();
    }

    // Type the messages properly
    const typedMessages = conversation.messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role as 'user' | 'assistant' | 'system',
      createdAt: msg.createdAt,
    }));

    // Pass the server-loaded data to the client component
    return (
      <ChatInterface
        initialConversation={{
          id: conversation.id,
          title: conversation.title,
          updatedAt: conversation.updatedAt,
        }}
        initialMessages={typedMessages}
      />
    );
  } catch (error) {
    console.error('Error loading conversation:', error);
    notFound();
  }
}
