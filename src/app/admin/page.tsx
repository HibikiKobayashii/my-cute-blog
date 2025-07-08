import { getServerSession } from "next-auth/next"
// ▼▼▼ 新しい設定ファイルをインポート ▼▼▼
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LogoutButton } from "../components/LogoutButton";

const ADMIN_EMAIL = "osomatsu287@gmail.com";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/admin');
  }

  if (session.user?.email !== ADMIN_EMAIL) {
    redirect('/error?error=AccessDenied');
  }

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