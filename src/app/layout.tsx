import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import GoogleAnalytics from './components/GoogleAnalytics';

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; 

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
    <html lang="ja" className={`${dotGothic16.className} bg-base-dark dark:white`} suppressHydrationWarning>
      
      {/* ▼▼▼ ここが外枠です ▼▼▼ */}
      {/* この<body>タグのクラスで、外枠自体のデザインを指定しています */}
      <body className="m-4 min-h-[calc(100vh-2rem)] rounded-2xl border-4 border-black dark:!border-white bg-gray-100 dark:bg-black flex flex-col">
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
      </body>
    </html>
  );
}
