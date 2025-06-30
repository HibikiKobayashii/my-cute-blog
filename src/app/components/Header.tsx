import Link from 'next/link';
import { ThemeToggleButton } from './ThemeToggleButton'; // ThemeToggleButtonをインポート

export default function Header() {
  return (
    <header className="w-full p-4">
      {/* ▼▼▼ このコンテナのクラスを修正し、レスポンシブ対応にしました ▼▼▼ */}
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4">
        
        {/* 左側のセクション */}
        <div className="flex items-center gap-4">
          <Link href="/reviews" className="border border-subtle rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:translate-y-px whitespace-nowrap">
            REVIEW PRODUCTS
          </Link>
          <ThemeToggleButton />
        </div>
        
        {/* 中央のナビゲーション */}
        <nav className="border border-subtle rounded-md flex-none">
          <ul className="flex flex-wrap items-center justify-center">
            <li>
              <Link href="/" className="block py-2 px-3 bg-black text-white dark:bg-white dark:text-black font-bold transition-transform duration-75 active:translate-y-px">
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

        {/* 右側のSNSリンク */}
        <div className="flex items-center space-x-3">
          <a href="https://x.com/hitti12345678" target="_blank" rel="noopener noreferrer" className="bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-200 py-2 px-3 rounded-md text-sm hover:opacity-80 transition-transform duration-75 active:translate-y-px">
            X &gt;
          </a>
          <a href="https://www.instagram.com/sn_nn_nm/?__pwa=1" target="_blank" rel="noopener noreferrer" className="bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-200 py-2 px-3 rounded-md text-sm hover:opacity-80 transition-transform duration-75 active:translate-y-px">
            Instagram &gt;
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-200 py-2 px-3 rounded-md text-sm hover:opacity-80 transition-transform duration-75 active:translate-y-px">
            YouTube &gt;
          </a>
        </div>
      </div>
    </header>
  );
}