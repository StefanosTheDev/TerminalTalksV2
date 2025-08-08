'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="signup">
      <SignUp
        path="/auth/signup"
        routing="path"
        signInUrl="/auth/login"
        forceRedirectUrl="/dashboardV2" // ← always send here
        fallbackRedirectUrl="/dashboardV2" // ← if no redirect_url present
      />
    </div>
  );
}
