// data/01reviews.ts

// 横長の商品ボックス用の型定義
export type HorizontalReviewProduct = {
  id: number;
  brand: string;
  name: string;
  bannerImage: string; // 横長のバナー画像
  articleSlug: string; // 関連する記事のスラッグ
  amazonLink: string;
};

// 横長の商品ボックス用データ配列
export const horizontalReviewProducts: HorizontalReviewProduct[] = [
  {
    id: 1,
    brand: 'グッドスマイルカンパニー',
    name: 'ブルーアーカイブ Blue Archive ユウカ 会計の日常 1/7スケール プラスチック製 塗装済み完成品フィギュア',
    bannerImage: '/yuuka101.jpg', // ※表示したい横長画像のパスを指定してください
    articleSlug: '2.figure-yuuka-buruaka',
    amazonLink: 'https://amzn.to/46ruu6N',
  },
  // 他の商品データをここに追加できます
];