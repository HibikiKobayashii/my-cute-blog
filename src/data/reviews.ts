// レビュー商品の型定義
export type ReviewProduct = {
  id: number;
  brand: string;
  name: string;
  colors: string;
  image: string;
  description: string;
  articleSlug: string;
  amazonLink: string;
};

// レビュー商品データの配列
export const reviewProducts: ReviewProduct[] = [
  // 1つ目の商品
  {
    id: 1,
    brand: 'グッドスマイルカンパニー',
    name: 'ブルーアーカイブ Blue Archive ユウカ 会計の日常 1/7スケール プラスチック製 塗装済み完成品フィギュア',
    colors: '画像:Amazon',
    image: '/yuuka101.jpg',
    description: '',
    articleSlug: '2.figure-yuuka-buruaka',
    amazonLink: 'https://amzn.to/46ruu6N',
  }, // ← 商品の区切りにカンマ(,)を忘れないでください

  // ▼▼▼ ここから2つ目の商品を追加 ▼▼▼
  {
    id: 2, // IDが重複しないように変更 (1→2)
    brand: 'Google',
    name: 'Pixel 9 Pro Fold',
    colors: '画像:価格com',
    image: '/pixel9.jpg', // publicフォルダに置いた画像のパス
    description: '',
    articleSlug: '3.Pixle9ProFold-review', // この商品レビュー記事のファイル名
    amazonLink: 'https://amzn.to/4klGiuD',
  },
  // ▲▲▲ ここまで追加 ▲▲▲

  // 3つ目を追加する場合は、ここにカンマを打って続けます...
];