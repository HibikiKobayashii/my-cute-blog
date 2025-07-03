// レビュー商品の型定義
export type ReviewProduct = {
  id: number;
  brand: string;
  name: string;
  colors: string;
  image: string;
  description: string;
  articleSlug: string; // 商品を紹介した記事のURL slug
  amazonLink: string;
};

// レビュー商品データの配列
export const reviewProducts: ReviewProduct[] = [
  // ▼▼▼ ここから修正 ▼▼▼
  {
    id: 1,
    brand: 'グッドスマイルカンパニー',
    name: 'ブルーアーカイブ Blue Archive ユウカ 会計の日常 1/7スケール プラスチック製 塗装済み完成品フィギュア',
    colors: '', // フィギュアのため該当なし
    image: '/yuuka101.jpg',
    description: '',
    articleSlug: '2.figure-yuuka-buruaka', // 記事のファイル名から拡張子を除いたスラッグ
    amazonLink: 'https://amzn.to/46ruu6N',
  },
  // ▲▲▲ ここまで修正 ▲▲▲
  // ここに、あなたがレビューした商品を追加していきます
];