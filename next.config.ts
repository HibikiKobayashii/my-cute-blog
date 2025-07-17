import type { NextConfig } from 'next';
// ▼▼▼ MDX用のモジュールをインポート ▼▼▼
import createMDX from '@next/mdx';

// MDXプラグインの設定
const withMDX = createMDX({
  // .md と .mdx の両方のファイルを処理できるようにする
  extension: /\.mdx?$/,
  options: {
    // ここにremark/rehypeプラグインを追加することも可能
  },
});

const nextConfig: NextConfig = {
  // ▼▼▼ Next.jsがページとして認識するファイルの拡張子を追加 ▼▼▼
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// ▼▼▼ MDXの設定とNext.jsの既存設定を結合してエクスポート ▼▼▼
export default withMDX(nextConfig);