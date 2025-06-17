import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/app/_lib/prisma/prismaClient';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt', // JWT in cookie; no DB sessions table
  },

  providers: [
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

  callbacks: {
    // Only upsert on Google sign-in
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            email: user.email!,
            username: user.name!,
          },
          create: {
            id: user.id,
            email: user.email!,
            username: user.name!,
          },
        });
      }
      return true;
    },

    // Persist user.id into the JWT
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },

    // Expose token.id as session.user.id
    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },
};
export const getAuthSession = () => getServerSession(authOptions);

export async function requireAuthUser() {
  const session = await getAuthSession();
  if (!session) {
    redirect('/auth/login');
  }
  return session.user; // typed { id, name, email, image }
}
