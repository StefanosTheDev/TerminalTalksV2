// src/app/login/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import AuthLayout from '@/app/auth/layout';
import { Button } from '@/app/components/Button';
import styles from '@/app/auth/layout.module.css';
import { FcGoogle } from 'react-icons/fc';

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
      title="Register Page"
      description="Sign Up With Your Terminal  A Terminal Talks Account"
    >
      <Button onClick={() => signIn('google')} className={styles.googleBtn}>
        <FcGoogle size={20} />
        <h2> Sign in with google </h2>
      </Button>
      <Button onClick={() => signIn('google')} className={styles.submit}>
        Sign In
      </Button>
    </AuthLayout>
  );
}
