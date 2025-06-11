// src/app/login/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import AuthLayout from '@/app/auth/AuthLayout';

export default function RegisterPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  return (
    <AuthLayout
      title="Register In"
      description="Create A Terminal Talks Account"
    >
      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 border rounded"
      >
        Sign up with Google
      </button>
    </AuthLayout>
  );
}
