import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { LogoutButton } from "../components/LogoutButton";

// ▼▼▼ 管理者として許可するメールアドレスを定義 ▼▼▼
const ADMIN_EMAIL = "osomatsu287@gmail.com";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);




  // 1. ログインしていない場合はログインページへ
  if (!session) {
    redirect('/login?callbackUrl=/admin');
  }

  // ▼▼▼ 2. ログインしているが、許可されたユーザーでない場合はエラーページへ ▼▼▼
  if (session.user?.email !== ADMIN_EMAIL) {
    redirect('/error?error=AccessDenied');
  }

  // 許可されたユーザーのみ以下のページ内容を表示
  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">管理者ページ</h1>
          <p className="text-subtle">ようこそ、{session.user?.name || session.user?.email}さん</p>
        </div>
        <LogoutButton />
      </header>

      <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 min-h-[400px]">
        <h2 className="text-2xl font-bold mb-4">サイト分析データ</h2>
        <p className="text-gray-600">ここに、記事ごとの閲覧数などを表示するグラフや表が追加されます。</p>
      </div>
    </div>
  );
}