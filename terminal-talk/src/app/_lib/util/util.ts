import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/_lib/auth/nextAuth';
import { redirect } from 'next/navigation';

export async function checkAuthenticated() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }
  console.log(session);
  return session.user;
}
