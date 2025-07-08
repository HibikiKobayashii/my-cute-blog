import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// このファイルでauthOptionsを定義し、exportします
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: '/error', 
  },
};