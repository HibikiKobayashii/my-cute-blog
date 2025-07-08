import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// ▼▼▼ この行から export を削除しました ▼▼▼
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: { email?: string | null } }) {
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
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }