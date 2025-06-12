// src/lib/nextAuth.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // ✅ Use JWTs for sessions instead of DB
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

  callbacks: {
    // 🔐 Fired whenever JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    // 💾 What gets returned from useSession() or getServerSession()
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};
