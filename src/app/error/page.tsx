"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  // URLの?error=...部分を取得
  const error = searchParams.get('error');

  const getErrorMessage = () => {
    if (error === 'AccessDenied') {
      return {
        title: 'アクセスが拒否されました',
        message: 'このページにアクセスする権限がありません。',
      };
    }
    // その他の一般的なエラー
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