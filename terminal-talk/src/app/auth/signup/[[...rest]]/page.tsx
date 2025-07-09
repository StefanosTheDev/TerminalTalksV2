'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <SignUp
      path="/auth/signup"
      routing="path"
      signInUrl="/auth/login"
      forceRedirectUrl="/dashboard" // ← always send here
      fallbackRedirectUrl="/dashboard" // ← if no redirect_url present
    />
  );
}
