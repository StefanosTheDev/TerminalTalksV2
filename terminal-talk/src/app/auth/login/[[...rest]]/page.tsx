'use client';

import { SignIn } from '@clerk/nextjs';

export default function Login() {
  return (
    <SignIn
      path="/auth/login"
      routing="path"
      signUpUrl="/auth/signup"
      afterSignInUrl="/dashboard"
    />
  );
}
