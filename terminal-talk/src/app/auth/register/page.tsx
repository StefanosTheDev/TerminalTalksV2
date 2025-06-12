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
    console.log('Clicked');
    // Example: await signInWithCredentials(email, password)
  };

  return (
    <AuthLayout
      title="Register Your Acocunt"
      description="Create A TerminalTalks account"
      onSubmit={handleLogin}
      footerText="Already Have An Account?"
      footerLinkHref="Sign In"
    >
      <Button onClick={() => signIn('google')} className={styles.googleBtn}>
        <FcGoogle size={20} />
        <span>Continue With Google</span>
      </Button>
    </AuthLayout>
  );
}
