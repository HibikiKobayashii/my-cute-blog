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

// レビュー商品データの配列 (サンプルデータを削除し、空の配列にしました)
export const reviewProducts: ReviewProduct[] = [
  // ここに、あなたがレビューした商品を追加していきます
];
