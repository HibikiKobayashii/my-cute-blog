"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export function LikeButton({ slug }: { slug: string }) {
  const { data: session, status } = useSession();
  const [isLiked, setIsLiked] = useState(false);

  // ▼▼▼ ページ読み込み時に、いいね状態を取得する処理 ▼▼▼
  useEffect(() => {
    // ログインしていて、ユーザー情報が取得できたら実行
    if (status === 'authenticated' && session?.user?.email) {
      const userId = session.user.email;
      const apiUrl = `http://localhost:5053/api/likes/${slug}/status?userId=${userId}`;

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          setIsLiked(data.isLiked);
        })
        .catch(error => console.error("Failed to fetch like status:", error));
    }
  }, [slug, status, session]); // 依存配列にstatusとsessionを追加

  const handleLike = async () => {
    if (!session?.user?.email) {
      alert("いいねするにはログインが必要です。");
      return;
    }

    const apiUrl = `http://localhost:5053/api/likes/${slug}`;
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.email }),
    });
    
    // 見た目の状態をトグル（切り替え）
    setIsLiked(!isLiked);
  };

  if (!session) return null;

  return (
    <div className="fixed bottom-24 left-8 z-50">
      <button
        onClick={handleLike}
        className={`rounded-full w-20 h-20 flex flex-col items-center justify-center text-xs text-center shadow-lg transition-colors duration-200
          ${isLiked ? 'bg-pink-500 text-white' : 'bg-white border border-gray-400 hover:bg-gray-100'}`}
      >
        {/* ▼▼▼ いいね数の表示を削除 ▼▼▼ */}
        {isLiked ? (
          <>
            <span className="text-2xl">❤️</span>
            <span className="font-bold mt-1">いいね済</span>
          </>
        ) : (
          <>
            <span className="text-2xl">🤍</span>
            <span className="font-bold mt-1">いいね</span>
          </>
        )}
      </button>
    </div>
  );
}