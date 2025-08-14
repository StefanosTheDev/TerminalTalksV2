// src/app/api/chat/conversations/[id]/messages/route.ts
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { sendMessageToConversation } from '@/app/_lib/services/chatService';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await req.json();

    // Call the service
    const result = await sendMessageToConversation(id, user.id, content);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in message route:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to send message',
      },
      { status: 500 }
    );
  }
}
