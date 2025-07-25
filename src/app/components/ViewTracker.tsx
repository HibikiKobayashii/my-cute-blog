"use client";

import { useEffect } from 'react';
import { useSession } from "next-auth/react"; // useSessionをインポート

export function ViewTracker({ slug }: { slug: string }) {
  const { data: session } = useSession(); // セッション情報を取得

  useEffect(() => {
    const apiUrl = `http://localhost:5053/api/views/${slug}`;
    
    // ユーザーID（メールアドレス）を取得。ログインしていなければnull
    const userId = session?.user?.email;

    fetch(apiUrl, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // ▼▼▼ bodyにuserIdを追加 ▼▼▼
      body: JSON.stringify({ userId }),
    })
    .catch(error => {
      console.error("View tracking failed:", error); 
    });

  }, [slug, session]); // sessionも依存配列に追加

  return null;
}