import {
  deleteAccountById,
  getAccountById,
} from '@/app/services/accountService';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';
// GET THE USER LOGGED IN WITH THE JWT.



export async function GET({ params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const account = await getAccountById(params);
    return NextResponse.json({ account });
  } catch (error) {
    return NextResponse.json({ error: 'Error Has Occurred' }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const account = await deleteAccountById(params);
    return NextResponse.json({ account });
  } catch (error) {
    return NextResponse.json({ error: 'Error Has Occured' }, { status: 500 });
  }
}
