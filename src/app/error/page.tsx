"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Suspense内で呼び出される、実際のページ内容コンポーネント
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = () => {
    if (error === 'AccessDenied') {
      return {
        title: 'アクセスが拒否されました',
        message: 'このページにアクセスする権限がありません。許可されたアカウントでログインしてください。',
      };
    }
    return {
      title: 'エラーが発生しました',
      message: 'ページの表示中に問題が発生しました。',
    };
  };

  const { title, message } = getErrorMessage();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center p-8 border border-black rounded-lg bg-gray-100 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link href="/" className="bg-accent text-base-light py-2 px-4 rounded-md text-sm hover:opacity-80">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}

// ページのエントリーポイントとなるコンポーネント
export default function ErrorPage() {
  return (
    // ▼▼▼ Suspenseで囲む ▼▼▼
    <Suspense fallback={<div>読み込み中...</div>}>
      <ErrorContent />
    </Suspense>
  );
}