// src/lib/nextAuth.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { db } from './firebase';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter({ firestore: db }),
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async session({ session, user }) {
      // Attach the user ID directly, using our extended Session type
      session.user.id = user.id;
      return session;
    },
  },
};
