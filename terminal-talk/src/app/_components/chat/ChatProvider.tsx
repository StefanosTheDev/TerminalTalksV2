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
  useRef,
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
  cancelGeneration: () => void; // NEW: Cancel function

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
  const [conversations, setConversations] = useState(initialConversations);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // NEW: Keep track of the current request
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  // NEW: Cancel generation function
  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current && isLoading) {
      // Check if actually loading
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);

      // Add a system message to show cancellation
      const cancelMessage: Message = {
        id: `cancel-${Date.now()}`,
        role: 'system',
        content: 'Response generation was cancelled.',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, cancelMessage]);
    }
  }, []);

  const createNewConversation = useCallback(
    async (firstMessage: string) => {
      try {
        // Clear any existing abort controller
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setCurrentConversation(null);
        setIsLoading(true);

        const tempUserMessage: Message = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: firstMessage,
          createdAt: new Date(),
        };
        setMessages([tempUserMessage]);

        router.push('/dashboard/chat');
        const response = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: firstMessage }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to create conversation');
        }

        const data = await response.json();

        // Check if we got an error response
        if (data.error) {
          throw new Error(data.error);
        }

        // Now we can safely access the conversation
        setCurrentConversation(data);
        setMessages(data.messages || []); // Add fallback
        setConversations((prev) => [data, ...prev]);

        router.push(`/dashboard/chat/${data.id}`);
        return data.id;
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.log('Message was cancelled');
            return;
          }
          console.error('Error:', error.message);
        } else {
          console.error('Unknown error:', error);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'system',
            content: 'Failed to create conversation. Please try again.',
            createdAt: new Date(),
          },
        ]);
        throw error;
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
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

      try {
        // Clear any existing abort controller
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        if (!currentConversation) {
          await createNewConversation(content);
          return;
        }

        setIsLoading(true);

        const tempUserMessage: Message = {
          id: `temp-${Date.now()}`,
          role: 'user',
          content,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, tempUserMessage]);

        const response = await fetch(
          `/api/chat/conversations/${currentConversation.id}/messages`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
            signal: abortControllerRef.current.signal, // Add abort signal
          }
        );

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const { userMessage: savedUserMessage, assistantMessage } =
          await response.json();

        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== tempUserMessage.id);
          return [...filtered, savedUserMessage, assistantMessage];
        });

        setConversations((prev) => {
          const updated = prev.map((conv) =>
            conv.id === currentConversation.id
              ? { ...conv, updatedAt: new Date() }
              : conv
          );
          return updated.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });
      } catch (error: any) {
        // Handle abort separately
        if (error.name === 'AbortError') {
          console.log('Message was cancelled');
          return;
        }

        console.error('Error sending message:', error);
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'system',
            content: 'Failed to send message. Please try again.',
            createdAt: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
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

  const value: ChatContextType = {
    conversations,
    currentConversation,
    messages,
    isLoading,
    createNewConversation,
    loadConversation,
    sendMessage,
    refreshConversations,
    clearCurrentConversation,
    cancelGeneration, // NEW: Add to context
    setMessages,
    setCurrentConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
