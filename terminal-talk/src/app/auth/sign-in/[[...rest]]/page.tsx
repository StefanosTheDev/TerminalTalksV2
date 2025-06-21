// app/sign-in/page.tsx
'use client';

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import Footer from '@/app/_components/landingpage/Footer';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
          <SignIn
            routing="path"
            path="/auth/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/docs"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
