// app/chat/page.tsx
export default function ChatPage() {
  return (
    <div className="flex h-full items-center justify-center text-center text-gray-500">
      <div>
        <h2 className="text-xl font-semibold mb-2">No Conversation Selected</h2>
        <p className="text-sm">
          Start a new chat or select one from the sidebar.
        </p>
      </div>
    </div>
  );
}
