import Link from 'next/link';
// import { ThemeToggleButton } from './ThemeToggleButton'; // ボタンを非表示にするため、一時的にコメントアウト

export default function Header() {
  return (
    <header className="w-full p-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between border-b-2 border-base-dark dark:border-base-light pb-4">
        
        {/* ▼▼▼ 1. 左側のセクションにクラスを追加 ▼▼▼ */}
        <div className="flex-1 flex items-center gap-4">
          <Link href="/reviews" className="border border-subtle rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:translate-y-px whitespace-nowrap">
            REVIEW PRODUCTS
          </Link>
          {/* <ThemeToggleButton /> */}
        </div>
        
        {/* 中央のナビゲーション */}
        <nav className="border border-subtle rounded-md flex-none">
          <ul className="flex flex-wrap items-center justify-center">
            <li>
              <Link href="/" className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-75 active:translate-y-px">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/articles" className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-75 active:translate-y-px active:bg-gray-200 whitespace-nowrap">
                ALL ARTICLES
              </Link>
            </li>
            <li>
              <Link href="/profile" className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-75 active:translate-y-px active:bg-gray-200">
                PROFILE
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-75 active:translate-y-px active:bg-gray-200">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>

        {/* ▼▼▼ 2. 右側のSNSリンクにクラスを追加 ▼▼▼ */}
        <div className="flex-1 flex items-center justify-end space-x-3">
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
    </header>
  );
}