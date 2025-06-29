import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider'; // 作成したThemeProviderをインポート
import GoogleAnalytics from './components/GoogleAnalytics';

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; 

const dotGothic16 = DotGothic16({
  weight: ['400'],
  subsets: ['latin', 'japanese'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'C1NOM3_',
    template: '%s | C1NOM3_',
  },
  description: 'C1N0M3_ - 夜明けのテックログ',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${dotGothic16.className} m-4 min-h-[calc(100vh-2rem)] border-4 border-subtle rounded-2xl bg-base-light text-base-dark dark:bg-base-dark dark:text-base-light flex flex-col`}>
        {/* ▼▼▼ ここから修正 ▼▼▼ */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
          <Header />
          <main className="px-4 pb-8 flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {/* ▲▲▲ ここまで修正 ▲▲▲ */}
      </body>
    </html>
  );
}