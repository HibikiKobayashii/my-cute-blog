import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="text-center mb-12">
        {/* ▼▼▼ 「PROFILE」というタイトルの色を指定しています ▼▼▼ */}
        {/* ライトモードでは text-black (黒)、ダークモードでは dark:text-white (白) */}
        <h1 className="text-3xl font-bold text-base-dark tracking-wider">PROFILE</h1>
      </header>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-24">
        <div className="flex-shrink-0">
          {/* ▼▼▼ プロフィール画像の枠線の色を指定しています ▼▼▼ */}
          {/* ライトモードでは border-black (黒)、ダークモードでは dark:border-white (白) */}
              {/* ▼▼▼ この行を、色のHEXコードを直接指定する形に修正しました ▼▼▼ */}
              <div className="rounded-full border-[10px] border-[] dark:border-[#00000え]">
            <Image
              src="/p.png"
              alt="プロフィール画像"
              width={320}
              height={320}
              className="rounded-full"
            />
          </div>
        </div>
        
        <div className="text-left max-w-lg pt-4">
          {/* ▼▼▼ あなたの名前「しのののめ」の色を指定しています ▼▼▼ */}
          {/* ライトモードでは text-black (黒)、ダークモードでは dark:text-white (白) */}
          <h2 className="text-4xl font-bold text-base-dark tracking-wider">しのののめ</h2>
          <br></br>
          <div className="space-y-4 text-lg">
            <div className="flex items-center">
              {/* ▼▼▼ 「職業:」などの項目の色を指定しています ▼▼▼ */}
              {/* ライトモードでは text-gray-600 (濃いグレー)、ダークモードでは dark:text-gray-400 (薄いグレー) */}
              <span className=" font-bold text-base-dark tracking-wider">職業:</span>
              {/* ▼▼▼ 「大学生」などの内容の色を指定しています ▼▼▼ */}
              <span className=" font-bold text-base-dark tracking-wider">大学生</span>
            </div>
            <div className="flex items-center">
              <span className=" font-bold text-base-dark tracking-wider">趣味:</span>
              <span className=" font-bold text-base-dark tracking-wider">生き物飼育、YouTube、ネットショッピング</span>
            </div>
            <div className="flex items-center">
              <span className=" font-bold text-base-dark tracking-wider">所在:</span>
              <span className=" font-bold text-base-dark tracking-wider">新潟市</span>
            </div>
          </div>
          
          {/* ▼▼▼ 自己紹介文の段落の色を指定しています ▼▼▼ */}
          {/* ライトモードでは text-black (黒)、ダークモードでは dark:text-gray-300 (白に近いグレー) */}
          <p className=" font-bold text-base-dark tracking-wider">
            <br></br>
            はじめまして、しのののめです。新潟の大学に通いながら、日々の学びや趣味についてこのブログで発信しています。
            <br />
            プログラミングやガジェット、飼っているペットやファッション（スニーカー）など、雑多に書き綴っていきますので、どうぞよろしくお願いします。
          </p>
        </div>
      </div>
    </div>
  );
}
