// src/app/dashboard/page.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading your session…</p>;
  }
  if (!session) {
    return (
      <p style={{ textAlign: 'center', marginTop: '4rem' }}>
        You’re not signed in. <Link href="/auth/login">Sign in</Link>
      </p>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {session.user?.name}!</h1>
      <p>Your email: {session.user?.email}</p>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
      >
        Logout
      </button>
    </div>
  );
}
