import {
  deleteAccountById,
  getAccountById,
} from '@/app/services/accountService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET({ params }: { params: { id: string } }) {
  try {
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
