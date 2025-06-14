// src/lib/nextAuth.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import prisma from '@/app/prisma/prismaClient';

export const authOptions: NextAuthOptions = {
  providers: [
    // This is the google button login built in. So when you call in SignIn('gogole" this gets triggered and Next Auth ahnldes the redirect to google tooken enchance and give the the info back)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        // const isValid = await compare(credentials.password, user.password);

        // if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.username ?? undefined,
        };
      },
    }),
  ],
  /* 🔽  tell NextAuth which page to use */
  pages: {
    signIn: '/login', // your AuthLayout-based login page
    error: '/login', // optional: show ?error=… on the same page
  },
};
