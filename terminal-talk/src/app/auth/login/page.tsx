// src/app/login/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/nextAuth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  // 1. Check for an existing session on the server:
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard'); // SERVER WAY OF SAYING WERE GOOD WE VALID TOKEn

  // 3. Otherwise render the client‐side form:
  return <LoginForm />;
}
