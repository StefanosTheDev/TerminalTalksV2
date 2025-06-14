import { NextRequest, NextResponse } from 'next/server';
import { createAccount, getAllAccounts } from '@/app/services/accountService';
import { createAccountSchema } from '@/app/middleware/schemas/accountSchema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedObj = createAccountSchema.parse(body);
    const users = await createAccount(parsedObj);

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Error Has Occurred' }, { status: 500 });
  }
}
export async function GET() {
  try {
    // This does xyz learn
    // const session = await getServerSession(authOptions);

    // // Unauthorized.
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    const account = await getAllAccounts();
    return NextResponse.json({ account });
  } catch (error) {
    return NextResponse.json({ error: 'ERror Has Occured' }, { status: 500 });
  }
}
