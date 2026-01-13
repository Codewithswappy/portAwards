import { DefaultSession } from "next-auth";

/**
 * Module augmentation for Auth.js types
 * Extends the default session to include user ID
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
