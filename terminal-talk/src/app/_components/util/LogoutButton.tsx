// app/_components/LogoutButton.tsx
'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: '/auth/login', // where to go after sign-out
        })
      }
      className="btn btnSecondary"
    >
      Sign Out
    </button>
  );
}
