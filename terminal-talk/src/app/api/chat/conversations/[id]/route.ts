import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import {
  getConversationById,
  sendMessageToConversation,
} from '@/app/_lib/services/chatService';

// GET method to fetch a conversation by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conversation = await getConversationById(id, user.id);

    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch conversation',
      },
      { status: 500 }
    );
  }
}

// POST method to send a message
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
