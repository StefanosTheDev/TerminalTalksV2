import { ChatBubble } from '@/app/_components/chat/ChatBubble';

export default function WelcomeChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <h1> What Do You Want To Hear </h1>

      <ChatBubble
        placeholder="Type your message..."
        width="w-full"
        maxWidth="max-w-2xl"
      />
    </div>
  );
}
