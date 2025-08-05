// app/chat/page.tsx or ChatPageWrapper
import { ChatInterface } from '../_components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <ChatInterface />
    </div>
  );
}
