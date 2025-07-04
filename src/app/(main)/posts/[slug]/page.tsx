import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PickUpPosts from '@/app/components/PickUpPosts'; // ▼ 1. 作成したコンポーネントをインポート

type Frontmatter = {
  title: string;
  date: string;
  emoji?: string;
  image?: string;
  productBrand?: string;
  productName?: string;
  productBannerImage?: string;
  productAmazonLink?: string;
  productButtonText?: string;
};

async function getPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) { return null; }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return { slug, contentHtml, frontmatter: matterResult.data as Frontmatter };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Post({ params }: any) {
  const postData = await getPostData(params.slug);
  if (!postData) { notFound(); }

  const {
    title,
    date,
    emoji,
    image,
    productBrand,
    productName,
    productBannerImage,
    productAmazonLink,
    productButtonText
  } = postData.frontmatter;

  return (
    <>
      <article>
        <header className="mb-8 text-center">
          {emoji && <p className="text-5xl mb-4">{emoji}</p>}
          <h1 className="text-4xl font-bold text-base-dark tracking-wider">{title}</h1>
          <time className="text-gray-500 dark:text-gray-400 mt-2 block">{date}</time>
        </header>

        {image && (
          <div className="my-8">
            <Image src={image} alt={title} width={1200} height={675} className="w-full h-auto rounded-md" priority/>
          </div>
        )}

        <div
          className="prose prose-xl dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>

      <div className="mt-16 space-y-8">
        {productBannerImage && productAmazonLink && (
          <div className="border border-black rounded-lg p-4 flex flex-col md:flex-row items-center gap-x-6 gap-y-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="w-full md:w-1/6 flex justify-center items-center">
              <Image
                src={productBannerImage}
                alt={productName || 'Product Banner'}
                width={150}
                height={150}
                className="w-auto h-auto object-contain rounded-md"
                style={{ maxHeight: '120px' }}
              />
            </div>
            <div className="w-full md:w-5/6 flex flex-col justify-center gap-y-4">
              <div className="w-full text-center md:text-left">
                <p className="text-base text-gray-500">{productBrand}</p>
                <h3 className="font-bold text-lg text-base-dark dark:text-base-light">{productName}</h3>
              </div>
              <div className="w-full flex justify-center">
                <Link href={productAmazonLink} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md text-base hover:bg-yellow-600 transition-colors text-center max-w-xs transition-transform duration-75 active:translate-y-px">
                  {productButtonText || 'Amazonで詳細をみる'}
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 h-28">
          <p className="text-gray-500 dark:text-gray-400 text-lg">工事中…</p>
        </div>

        {/* ▼ 2. ここにピックアップ記事コンポーネントを追加 ▼ */}
        <PickUpPosts currentPostSlug={params.slug} />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}