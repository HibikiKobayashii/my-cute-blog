"use client";

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  brand?: string;
  name?: string;
  image?: string;
  link?: string;
  buttonText?: string;
  description?: string;
};

export default function ProductBox({ brand, name, image, link, buttonText, description }: Props) {
  if (!image || !link) {
    return null;
  }

  return (
    <div className="border border-black rounded-lg p-4 flex flex-col md:flex-row items-center gap-x-6 gap-y-4 bg-gray-50 my-8">
      <div className="w-full md:w-1/4 flex justify-center items-center">
        <div className="relative w-48 h-48 md:w-48 md:h-48">
          <Image
            src={image}
            alt={name || 'Product Banner'}
            fill
            className="object-contain rounded-md"
          />
        </div>
      </div>
      <div className="w-full md:w-3/4 flex flex-col justify-between self-stretch py-2">
        <div className="w-full text-center md:text-left">
          {brand && <p className="text-base text-gray-500">{brand}</p>}
          {name && <h3 className="font-bold text-lg text-base-dark">{name}</h3>}
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        {/* ▼▼▼ このdivに、上の余白(mt-4)を追加しました ▼▼▼ */}
        <div className="w-full flex justify-center mt-4">
          <Link href={link} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md text-base hover:bg-yellow-600 transition-colors text-center max-w-xs transition-transform duration-75 active:translate-y-px">
            {buttonText || '詳細をみる'}
          </Link>
        </div>
      </div>
    </div>
  );
}