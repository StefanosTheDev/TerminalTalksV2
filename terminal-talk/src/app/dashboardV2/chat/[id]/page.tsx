import { ChatInterface } from '@/app/_components/chat/ChatInterface';

export default async function ChatConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChatInterface conversationId={id} />;
}
