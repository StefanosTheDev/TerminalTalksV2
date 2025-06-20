import { NextRequest, NextResponse } from 'next/server';

import {
  createLecture,
  generateAudioFile,
} from '@/app/_lib/services/lectureService';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await createLecture(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Lecture generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate lecture' },
      { status: 500 }
    );
  }
}
