import { NextRequest, NextResponse } from 'next/server';
import { createAccount, getAllAccounts } from '@/app/services/accountService';
import { createAccountSchema } from '@/app/middleware/schemas/accountSchema';
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
    const account = await getAllAccounts();
    return NextResponse.json({ account });
  } catch (error) {
    return NextResponse.json({ error: 'ERror Has Occured' }, { status: 500 });
  }
}
