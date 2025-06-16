// src/app/login/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import AuthForm from '@/app/_components/auth/AuthForm';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  // why do we have thi s
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard/overview');
    }
  }, [status, router]);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      console.log('login failed');
      // OPtionally show an error message
    } else {
      // Let useEffect handle the redirect to dashboard
      console.log('login successful');
    }
  };

  return (
    <AuthForm
      title="Login To Your Account"
      description="Access Your TerminalTalks Account"
      onSubmit={handleLogin}
      footerText="Don't Have An Account?"
      footerLinkHref="Create Account"
      googleBtnText="Sign In With Google"
      submitBtnText="Login"
    ></AuthForm>
  );
}
