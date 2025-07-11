// import { NextRequest, NextResponse } from 'next/server';
// import {
//   createLecture,
//   getAllLectures,
// } from '@/app/_lib/services/adminService';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const data = await createLecture(body);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Lecture generation failed:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate lecture' },
//       { status: 500 }
//     );
//   }
// }
// export async function GET() {
//   try {
//     const data = await getAllLectures();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Lecture generation failed:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate lecture' },
//       { status: 500 }
//     );
//   }
// }
