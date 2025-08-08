// src/app/chat/page.tsx

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import {
  fetchCoursesWithProgressStatus,
  fetchStatsCardInfo,
} from '../../_lib/services/utilService';
import StatsCard from '../../_components/dashboard/StatsCard';
import FreeLibrary from '../../_components/dashboard/FreeLibrary';
import { ChatInterface } from '../../_components/chat/ChatInterface';
import { LibraryView } from '../../_components/chat/LibraryView';

// For Next.js 15.4.2 - searchParams must be a Promise
type PageProps = {
  params: Promise<{ [key: string]: string | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ChatPage({ searchParams }: PageProps) {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <>
      <ChatInterface />
    </>
  );
}
