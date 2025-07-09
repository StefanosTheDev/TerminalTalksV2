// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 1) Define which paths should remain public
const isPublicRoute = createRouteMatcher([
  '/', // homepage
  '/auth/login(.*)', // all under /sign-in
  '/auth/signup(.*)', // all under /sign-up
  '/api/webhooks/clerk', // ✅ allow Clerk's webhook to pass through
]);

// 2) Centralized auth handler
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Allow public routes through
  if (isPublicRoute(req)) {
    return;
  }

  // Redirect unauthenticated users to our sign-in page
  if (!userId) {
    const signInUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Authenticated users fall through
});

// 🔒 Only invoke this middleware on the routes you actually want protected:
export const config = {
  matcher: [
    '/dashboard(.*)', // your dashboard
    '/app(.*)', // any other “app” routes
    '/trpc/(.*)', // tRPC, if used
  ],
};
