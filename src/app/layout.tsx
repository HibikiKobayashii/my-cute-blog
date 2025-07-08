import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import GoogleAnalytics from './components/GoogleAnalytics';
// ▼▼▼ ログイン状態を管理するプロバイダーをインポート ▼▼▼
import { AuthProvider } from './AuthProvider';

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
        {/* ▼▼▼ AuthProviderで全体を囲みます ▼▼▼ */}
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
            <Header />
            <main className="px-4 pb-8">{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
        {/* ▲▲▲ ここまで ▲▲▲ */}
      </body>
    </html>
  );
}