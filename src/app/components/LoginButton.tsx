"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const ADMIN_EMAIL = "osomatsu287@gmail.com";

export function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null; 
  }

  if (session) {
    const isAdmin = session.user?.email === ADMIN_EMAIL;

    return (
      <div className="flex flex-col gap-2">
        {isAdmin && (
          <Link href="/admin" className="bg-white border border-gray-400 rounded-full w-16 h-16 flex items-center justify-center text-xs text-center shadow-lg hover:bg-gray-200 transition-colors">
            管理<br />ページ
          </Link>
        )}
        <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-white border border-gray-400 rounded-full w-16 h-16 flex items-center justify-center text-xs text-center shadow-lg hover:bg-gray-200 transition-colors">
          ログ<br />アウト
        </button>
      </div>
    );
  }

  return (
    <button
      // ▼▼▼ callbackUrlを "/" (トップページ) に変更しました ▼▼▼
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-white border border-gray-400 rounded-full w-16 h-16 flex items-center justify-center text-xs text-center shadow-lg hover:bg-gray-200 transition-colors"
    >
      ログイン
    </button>
  );
}