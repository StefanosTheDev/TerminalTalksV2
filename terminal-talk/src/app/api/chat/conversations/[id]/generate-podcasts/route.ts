// src/app/api/chat/conversations/[id]/generate-podcasts/route.ts
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { generatePodcastFromConversation } from '@/app/_lib/services/podcastService';

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: conversationId } = await context.params;

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // No need for lectureDetails anymore - we extract from conversation
    const podcast = await generatePodcastFromConversation({
      conversationId,
      clerkId: user.id,
    });

    return NextResponse.json(podcast);
  } catch (error) {
    console.error('Error generating podcast:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to generate podcast',
      },
      { status: 500 }
    );
  }
}
