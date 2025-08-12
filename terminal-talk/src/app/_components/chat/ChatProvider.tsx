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
import { Message } from '@/app/types';

import { Conversation } from '@/app/types';
interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;

  // Actions
  createNewConversation: (firstMessage: string) => Promise<string>;
  loadConversation: (id: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  refreshConversations: () => Promise<void>;
  clearCurrentConversation: () => void;

  // Setters
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setCurrentConversation: (conversation: Conversation | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  initialConversations,
}: {
  children: ReactNode;
  initialConversations: Conversation[];
}) {
  // Conversations Get Loaded Minimalist
  const [conversations, setConversations] = useState(initialConversations);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createNewConversation = useCallback(
    async (firstMessage: string) => {
      try {
        // First, clear any existing conversation and set up the UI
        setCurrentConversation(null);
        setIsLoading(true);

        // Show the user message immediately
        const tempUserMessage: Message = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: firstMessage,
          createdAt: new Date(),
        };
        setMessages([tempUserMessage]);

        // Navigate to chat page immediately (no ID needed)
        router.push('/dashboard/chat');

        // Then create the conversation in the background
        const response = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: firstMessage }),
        });

        if (!response.ok) {
          throw new Error('Failed to create conversation');
        }

        const newConversation = await response.json();

        // Update with real data (this includes both user and AI messages)
        setConversations((prev) => [newConversation, ...prev]);
        setCurrentConversation(newConversation);
        setMessages(newConversation.messages);

        // Update URL to include the conversation ID
        router.push(`/dashboard/chat/${newConversation.id}`, { scroll: false });

        return newConversation.id;
      } catch (error) {
        console.error('Failed to create conversation:', error);
        // Keep the user message visible but show error
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
            createdAt: new Date(),
          },
        ]);
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
    async (content: string): Promise<void> => {
      if (!content.trim()) return;
      debugger;
      try {
        // Case 1: No current conversation - create one first
        if (!currentConversation) {
          await createNewConversation(content);
          return; // createNewConversation handles everything
        }

        // Case 2: Existing conversation - add message
        setIsLoading(true);

        // Add user message optimistically
        const tempUserMessage: Message = {
          id: `temp-${Date.now()}`,
          role: 'user',
          content,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, tempUserMessage]);

        // Send to backend
        const response = await fetch(
          `/api/chat/conversations/${currentConversation.id}/messages`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const { userMessage: savedUserMessage, assistantMessage } =
          await response.json();

        // Replace temp message with saved one and add AI response
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== tempUserMessage.id);
          return [...filtered, savedUserMessage, assistantMessage];
        });

        // Update conversation in sidebar (move to top)
        setConversations((prev) => {
          const updated = prev.map((conv) =>
            conv.id === currentConversation.id
              ? { ...conv, updatedAt: new Date() }
              : conv
          );
          // Sort by most recent first
          return updated.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });
      } catch (error) {
        console.error('Failed to send message:', error);
        // Remove optimistic message on error
        if (currentConversation) {
          setMessages((prev) => prev.filter((m) => !m.id.startsWith('temp-')));
        }
        throw error; // Re-throw so components can handle it
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
        setCurrentConversation,
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
