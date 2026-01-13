import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

/**
 * Auth.js (NextAuth v5) Configuration
 * Using Prisma Adapter with Neon PostgreSQL
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  
  // Trust the host header in production (required for Vercel/serverless)
  trustHost: true,
  
  session: { 
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login page
  },
  
  callbacks: {
    session: async ({ session, user }) => {
      // Add user id to session
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  
  // Debug mode for development
  debug: process.env.NODE_ENV === "development",
});

