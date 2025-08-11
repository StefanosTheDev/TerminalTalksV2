// src/app/_components/chat/ChatProvider.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  audioUrl?: string;
}

interface Conversation {
  id: string;
  title: string;
  updatedAt: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;

  // Actions - Update sendMessage return type
  createNewConversation: (firstMessage: string) => Promise<string>;
  loadConversation: (id: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  refreshConversations: () => Promise<void>;
  clearCurrentConversation: () => void;

  // Add setMessages to the interface
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  initialConversations,
}: {
  children: ReactNode;
  initialConversations: Conversation[];
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createNewConversation = useCallback(
    async (firstMessage: string) => {
      try {
        setIsLoading(true);

        // Send Request To Backend.
        const response = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: firstMessage }),
        });

        const newConversation = await response.json();

        // Update conversations list immediately
        setConversations((prev) => [newConversation, ...prev]); // Update Conversation Sidebar
        setCurrentConversation(newConversation); // Set as Current Conversation.
        setMessages(newConversation.messages); // Load Messages Into Chat View.

        // Navigate to the new conversation
        router.push(`/dashboardV2/chat/${newConversation.id}`);
        return newConversation.id;
      } catch (error) {
        console.error('Failed to create conversation:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const loadConversation = useCallback(async (id: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/chat/conversations/${id}`);
      const data = await response.json();

      setCurrentConversation(data);
      setMessages(data.messages);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!currentConversation) {
        await createNewConversation(content);
        return;
      }

      // Add user message optimistically
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/chat/conversations/${currentConversation.id}/messages`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
          }
        );

        const { userMessage: savedUserMessage, assistantMessage } =
          await response.json();

        // Replace temp message with saved one and add AI response
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== userMessage.id);
          return [...filtered, savedUserMessage, assistantMessage];
        });

        // Update conversation in sidebar
        setConversations((prev) =>
          prev
            .map((conv) =>
              conv.id === currentConversation.id
                ? { ...conv, updatedAt: new Date() }
                : conv
            )
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
        );
      } catch (error) {
        console.error('Failed to send message:', error);
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      } finally {
        setIsLoading(false);
      }
    },
    [currentConversation, createNewConversation]
  );

  const refreshConversations = useCallback(async () => {
    try {
      const response = await fetch('/api/chat/conversations');
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error('Failed to refresh conversations:', error);
    }
  }, []);

  const clearCurrentConversation = useCallback(() => {
    setCurrentConversation(null);
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversation,
        messages,
        isLoading,
        createNewConversation,
        loadConversation,
        sendMessage,
        refreshConversations,
        clearCurrentConversation,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
