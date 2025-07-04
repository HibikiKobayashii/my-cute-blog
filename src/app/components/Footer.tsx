import Link from 'next/link';

// フッターコンポーネント
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-16 px-4 pb-8">
      {/* 内側のコンテナ */}
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 border-t-2 border-base-dark pt-8">
        
        {/* ▼▼▼ このブロックをヘッダーと同じ構成に修正しました ▼▼▼ */}
        <div className="w-full flex flex-col items-center gap-4 md:flex-row md:justify-between">
          
          {/* 1. 左側のセクション */}
          <div className="flex-1 flex items-center gap-4">
            <Link href="/reviews" className="border border-subtle rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:translate-y-px whitespace-nowrap">
              REVIEW PRODUCTS
            </Link>
          </div>

          {/* 2. 中央のナビゲーション */}
          <nav className="border border-subtle rounded-md flex-none">
            <ul className="flex flex-wrap items-center justify-center">
              <li>
                <Link href="/" className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-75 active:translate-y-px">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/articles" className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-75 active:translate-y-px whitespace-nowrap">
                  ALL ARTICLES
                </Link>
              </li>
              <li>
                <Link href="/profile" className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-75 active:translate-y-px">
                  PROFILE
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-75 active:translate-y-px">
                  CONTACT
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* 3. 右側のSNSリンク */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="flex items-center space-x-3">
                <a href="https://x.com/hitti12345678" target="_blank" rel="noopener noreferrer" className="bg-accent text-base-light py-2 px-3 rounded-md text-sm hover:opacity-80 transition-transform duration-75 active:translate-y-px">
                  X &gt;
                </a>
                <a href="https://www.instagram.com/sn_nn_nm/?__pwa=1" target="_blank" rel="noopener noreferrer" className="bg-accent text-base-light py-2 px-3 rounded-md text-sm hover:opacity-80 transition-transform duration-75 active:translate-y-px">
                  Instagram &gt;
                </a>
                <a href="https://www.youtube.com/@Futuregame0920" target="_blank" rel="noopener noreferrer" className="bg-accent text-base-light py-2 px-3 rounded-md text-sm hover:opacity-80 transition-transform duration-75 active:translate-y-px">
                  YouTube &gt;
                </a>
            </div>
          </div>
        </div>
        
        {/* サイト情報 */}
        <div className="text-center text-subtle text-sm">
          <p>このサイトは React / Next.js / Tailwind CSS で制作しています。</p>
          <p className="mt-2">© {currentYear} C1NOM3_. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}