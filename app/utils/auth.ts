import { NextAuthOptions } from 'next-auth';
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import db from './db';
import sendVerificationRequest from './sendVerificationRequest';

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          role: profile.role ?? 'USER',
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: +process.env.EMAIL_SERVER_PORT!,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: sendVerificationRequest,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;

      return session;
    },
  },
  pages: {
    signIn: '/auth/',
  },
} satisfies NextAuthOptions;
