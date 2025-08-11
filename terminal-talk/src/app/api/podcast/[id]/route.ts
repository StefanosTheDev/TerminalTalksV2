// src/app/api/podcasts/[id]/route.ts
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/app/_lib/prisma';

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

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get the podcast
    const podcast = await prisma.podcast.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
    });

    if (!podcast) {
      return NextResponse.json({ error: 'Podcast not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      audioUrl: podcast.audioUrl,
      duration: podcast.duration,
      createdAt: podcast.createdAt,
    });
  } catch (error) {
    console.error('Error fetching podcast:', error);
    return NextResponse.json(
      { error: 'Failed to fetch podcast' },
      { status: 500 }
    );
  }
}
