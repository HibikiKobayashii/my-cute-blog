import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer'; // フッターをインポート

const dotGothic16 = DotGothic16({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'C1NOM3_',
    template: '%s | C1NOM3_',
  },
  description: 'C1N0M3_ - 夜明けのテックログ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html>に背景色を設定して、フレームの外側を色付け
    <html lang="ja" className={`${dotGothic16.className} bg-base-dark`} suppressHydrationWarning>
      {/* <body>にmarginとborderを設定してフレームを作成 */}
      <body className="m-4 min-h-[calc(100vh-2rem)] border-4 border-subtle rounded-2xl bg-base-light text-base-dark">
        <Header />
        {/* メインコンテンツエリアに上下のpaddingを追加 */}
        <main className="px-4 pb-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}