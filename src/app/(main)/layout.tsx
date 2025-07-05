import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto pt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* メインコンテンツエリア (左側) */}
        <div className="md:col-span-3 min-w-0">
          {children}
        </div>
        
        {/* サイドバーエリア (右側) */}
        <aside className="md:col-span-1">
          {/* ▼▼▼ この部分のスペーサーを小さくして、広告の位置を上に調整しました ▼▼▼ */}
          {/* 記事ページのタイトルと高さを合わせるための、見えないスペーサー */}
          <div className="text-center mb-10 invisible" aria-hidden="true">
            {/* pタグを削除してスペーサーの高さを減らしました */}
            <h1 className="text-3xl font-bold">.</h1>
          </div>
          
          {/* 広告エリア */}
          <div className="sticky top-28 h-[500px] flex items-center justify-center rounded-lg p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">工事中…</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
