// app/chat/page.tsx or ChatPageWrapper
import { ChatNavbar } from '../_components/chat/ChatNavBar';
import { ChatInterface } from '@/app/_components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <ChatNavbar />
      <ChatInterface />
    </div>
  );
}
