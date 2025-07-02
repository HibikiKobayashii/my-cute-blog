import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import GoogleAnalytics from './components/GoogleAnalytics';

// ▼▼▼ ここにご自身の測定IDを設定してください ▼▼▼
const GA_MEASUREMENT_ID = "G-557KN30PNP"; 

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
    <html lang="ja" className={`${dotGothic16.className} bg-base-dark`} suppressHydrationWarning>
      <body className="m-4 min-h-[calc(100vh-2rem)] border-4 border-subtle rounded-2xl bg-base-light text-base-dark">
        {/* ▼▼▼ ここから追加 ▼▼▼ */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
        {/* ▲▲▲ ここまで追加 ▲▲▲ */}

          <Header />
          <main className="px-4 pb-8">{children}</main>
          <Footer />
          
        {/* ▼▼▼ ここから追加 ▼▼▼ */}
        </ThemeProvider>
        {/* ▲▲▲ ここまで追加 ▲▲▲ */}
      </body>
    </html>
  );
}