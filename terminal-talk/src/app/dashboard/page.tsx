// src/app/dashboard/page.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/app/types/next-auth';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const res = await fetch('/api/accounts');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'unkown error');
        }
        setUsers(data.users);
      } catch (error) {
        //
      } finally {
        //
      }
    }
    fetchAccounts();
  }, []);

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

      {users.map((user) => (
        <li key={user.id}>
          {user.id}
          {user.name}
        </li>
      ))}
    </div>
  );
}
