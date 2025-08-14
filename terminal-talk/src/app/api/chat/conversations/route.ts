import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import {
  createConversation,
  getUserConversations,
} from '@/app/_lib/services/chatService';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Step 1. Get The Request From User.
    const { message } = await req.json();

    // Step 2: Create Conversation.
    const conversation = await createConversation(user.id, message);

    // Step 3: Return Convo
    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Step 1: Fetch Conversation.
    const conversations = await getUserConversations(user.id);
    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}
