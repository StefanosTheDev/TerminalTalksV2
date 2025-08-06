'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="signup">
      <SignUp
        path="/auth/signup"
        routing="path"
        signInUrl="/auth/login"
        forceRedirectUrl="/chat" // ← always send here
        fallbackRedirectUrl="/chat" // ← if no redirect_url present
      />
    </div>
  );
}
