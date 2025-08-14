import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getPodcastById } from '@/app/_lib/services/podcastService';

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

    const podcast = await getPodcastById(id, user.id);

    return NextResponse.json(podcast);
  } catch (error) {
    console.error('Error fetching podcast:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch podcast',
      },
      { status: 500 }
    );
  }
}
