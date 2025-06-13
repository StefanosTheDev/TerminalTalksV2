// src/app/login/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AuthLayout from '@/app/components/layouts/authLayout';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log('Submit to DB or Auth:', email, password);
    console.log('Clicked');
    // Example: await signInWithCredentials(email, password)
  };

  return (
    <AuthLayout
      title="Login To Your Account"
      description="Access Your TerminalTalks Account"
      onSubmit={handleLogin}
      footerText="Don't Have An Account?"
      footerLinkHref="Create Account"
      googleBtnText="Sign In With Google"
      submitBtnText="Login"
    ></AuthLayout>
  );
}
