import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function SideNav() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <Link href="/dashboard" className="text-black no-underline text-base">
        OverView
      </Link>

      <Link
        href="/dashboard/create"
        className="text-black no-underline text-base"
      >
        Create Lecture
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
      >
        Logout
      </button>
    </header>
  );
}
