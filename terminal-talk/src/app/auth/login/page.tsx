// src/app/login/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import AuthLayout from '@/app/auth/layout';
import { Button } from '@/app/components/Button';
import styles from '@/app/auth/layout.module.css';
import { FcGoogle } from 'react-icons/fc';

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
    // Example: await signInWithCredentials(email, password)
  };

  return (
    <AuthLayout
      title="Sign In "
      description="Access your TerminalTalks account"
      onSubmit={handleLogin}
      footerText="Don't Have an account?"
      footerLinkHref="Sign Up"
    >
      <Button onClick={() => signIn('google')} className={styles.googleBtn}>
        <FcGoogle size={20} />
        <span>Sign in with Google</span>
      </Button>
    </AuthLayout>
  );
}
