import Link from 'next/link';
import Image from 'next/image';
import { reviewProducts } from '@/data/reviews'; 

export default function ReviewsPage() {
  return (
    <>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-base-dark tracking-wider">REVIEW PRODUCTS</h1>
        <p className="text-subtle mt-2"></p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {reviewProducts.map((product) => (
          <div key={product.id} className="border border-subtle rounded-md flex flex-col">
            <div className="aspect-square relative">
              <Image src={product.image} alt={product.name} fill className="object-cover rounded-t-md"/>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <p className="text-xs text-subtle">{product.brand.toUpperCase()}</p>
              <h2 className="text-lg font-bold text-accent">{product.name}</h2>
              <p className="text-sm text-subtle mb-4">{product.colors}</p>
              <p className="text-sm text-base-dark mb-4 flex-grow">
                {product.description}
                <Link href={`/posts/${product.articleSlug}`} className="text-blue-600 hover:underline ml-1">(記事で見る)</Link>
              </p>
              <a href={product.amazonLink} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-yellow-500 text-black py-2 px-4 rounded-md font-bold hover:bg-yellow-600 transition-colors">
                Amazon
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ▼▼▼ ここから広告エリアを追加 ▼▼▼ */}
      <div className="mt-16">
        <div className="flex items-center justify-center p-4 border border-subtle rounded-lg bg-gray-200 h-28">
          <p className="text-subtle text-lg">工事中…</p>
        </div>
      </div>
      {/* ▲▲▲ ここまで広告エリア ▲▲▲ */}
    </>
  );
}
