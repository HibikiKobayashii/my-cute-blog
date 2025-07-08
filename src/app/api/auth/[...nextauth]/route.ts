import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // ▼▼▼ このsignInコールバックを修正します ▼▼▼
    async signIn({ user }: { user: { email?: string | null } }) {
      // ログインしようとしたユーザーがいれば、とりあえずログインは許可する
      if (user) {
        return true;
      }
      return false; // ログイン失敗
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/error', 
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }