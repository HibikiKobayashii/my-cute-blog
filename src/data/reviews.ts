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
  {
    id: 3, // IDが重複しないように変更 (1→2)
    brand: 'CIO',
    name: 'Polaris CUBE WALL',
    colors: '画像:Amazon',
    image: '/cio100.jpg', // publicフォルダに置いた画像のパス
    description: 'USB PD 65W タイプC [CIO独自技術 NovaIntelligence搭載] USBタップ コンセント 急速充電 iPhone Android Macbook iPad Galaxy S23 Ultra',
    articleSlug: '4.cio-prime', // この商品レビュー記事のファイル名
    amazonLink: 'https://amzn.to/3IOpxLx',
  },

  {
    id: 4, // IDが重複しないように変更 (1→2)
    brand: 'CIO',
    name: 'NovaPort SLIM QUAD for DESK',
    colors: '画像:Amazon',
    image: '/cio120.jpg', // publicフォルダに置いた画像のパス
    description: '最大67W出力 USB-C USB-A 4台同時充電可能 薄型卓上USB充電器',
    articleSlug: '4.cio-prime', // この商品レビュー記事のファイル名
    amazonLink: 'https://amzn.to/46IB7BR',
  },

  {
    id: 5, // IDが重複しないように変更 (1→2)
    brand: 'CIO',
    name: 'NovaPort SLIM QUAD for DESK',
    colors: '画像:Amazon',
    image: '/cio121.jpg', // publicフォルダに置いた画像のパス
    description: '最大65W 1ポート GaN急速充電器 USB-C スマホからノートPCまで充電可能 USB PD 超小型 NovaPort 第二世代',
    articleSlug: '4.cio-prime', // この商品レビュー記事のファイル名
    amazonLink: 'https://amzn.to/46Lvlzr',
  },


  {
    id: 6, // IDが重複しないように変更 (1→2)
    brand: 'CIO',
    name: 'スパイラルシリコンケーブル CtoC 1m',
    colors: '画像:Amazon',
    image: '/cio1233.jpg', // publicフォルダに置いた画像のパス
    description: 'しなやかで絡まらない、磁石でまとまる',
    articleSlug: '4.cio-prime', // この商品レビュー記事のファイル名
    amazonLink: 'https://amzn.to/4lYZTSS',
  },


  {
    id: 7, // IDが重複しないように変更 (1→2)
    brand: 'CIO',
    name: 'USB-C マグネット変換アダプタ I字',
    colors: '画像:Amazon',
    image: '/cio124.jpg', // publicフォルダに置いた画像のパス
    description: '磁石で脱着 タイプC 240W対応',
    articleSlug: '4.cio-prime', // この商品レビュー記事のファイル名
    amazonLink: 'https://amzn.to/4eP6SeA',
  },


  {
    id: 8, // IDが重複しないように変更 (1→2)
    brand: 'CIO Mate',
    name: 'Tap 001',
    colors: '画像:Amazon',
    image: '/ciomate.jpg', // publicフォルダに置いた画像のパス
    description: '壁コンセントをおしゃれに、便利に。最大20Wの急速充電が可能な、USB充電器内蔵電源タップ',
    articleSlug: '4.cio-prime', // この商品レビュー記事のファイル名
    amazonLink: 'https://amzn.to/46RlFmW',
  },





















































];