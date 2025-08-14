'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="signup">
      <SignUp
        path="/auth/signup"
        routing="path"
        signInUrl="/auth/login"
        forceRedirectUrl="/dashboard/chat" // ← always send here
        fallbackRedirectUrl="/dashboard/chat" // ← if no redirect_url present
      />
    </div>
  );
}
