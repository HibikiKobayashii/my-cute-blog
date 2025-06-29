// フッターコンポーネント
export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      // ▼▼▼ ここから修正 ▼▼▼
      // footerタグからborder-t-2を削除し、パディングを調整
      <footer className="w-full mt-16 px-4 pb-8">
        {/* 内側のコンテナにborder-tとpadding-topを追加 */}
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 border-t-2 border-base-dark pt-8">
          {/* SNSリンク */}
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
          
          {/* サイト情報 */}
          <div className="text-center text-subtle text-sm">
            <p>このサイトは React / Next.js / Tailwind CSS で制作しています。</p>
            <p className="mt-2">© {currentYear} C1NOM3_. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      // ▲▲▲ ここまで修正 ▲▲▲
    );
  }
  