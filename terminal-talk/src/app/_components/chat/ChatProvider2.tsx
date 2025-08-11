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

// Define the message interface.
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
