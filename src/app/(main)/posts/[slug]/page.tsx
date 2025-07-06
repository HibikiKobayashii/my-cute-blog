import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
// ▼▼▼ 1. htmlの代わりに、新しいライブラリをインポート ▼▼▼
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PickUpPosts from '@/app/components/PickUpPosts';
import remarkSlug from 'remark-slug';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';

// 型定義
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

// 目次用の型
type TocItem = {
  text: string;
  id: string;
  depth: number;
};

// getPostData関数
async function getPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) { return null; }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);
  const toc: TocItem[] = [];

  // ▼▼▼ 2. remark処理のパイプラインを修正 ▼▼▼
  const processedContent = await remark()
    .use(remarkSlug)
    .use(() => (tree: Root) => {
      visit(tree, 'heading', (node) => {
        const text = node.children.map(child => (child.type === 'text' ? child.value : '')).join('');
        if (node.depth > 1 && node.depth < 4) {
          toc.push({
            text,
            id: (node.data as any)?.id as string || '',
            depth: node.depth,
          });
        }
      });
    })
    .use(remarkRehype) // remarkからrehypeへの変換
    .use(rehypeStringify) // rehypeからHTML文字列への変換
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  return { 
    slug, 
    contentHtml, 
    frontmatter: matterResult.data as Frontmatter,
    toc
  };
}

// Postコンポーネント
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
    productButtonText,
  } = postData.frontmatter;

  const { toc, contentHtml } = postData;

  const TocComponent = () => (
    <>
      {toc.length > 0 && (
        <nav className="mb-12 p-6 border border-black rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-900">目次</h2>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li key={item.id} style={{ marginLeft: `${(item.depth - 2) * 1.5}rem` }}>
                <a href={`#${item.id}`} className="text-gray-600 hover:underline">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );

  const tocPlaceholder = '<p>[TOC]</p>';
  const hasTocPlaceholder = contentHtml.includes(tocPlaceholder);
  const [beforeToc, afterToc] = hasTocPlaceholder
    ? contentHtml.split(tocPlaceholder)
    : [contentHtml, null];

  return (
    <>
      <article>
        <header className="mb-8 text-center">
          {emoji && <p className="text-5xl mb-4">{emoji}</p>}
          <h1 className="text-4xl font-bold text-base-dark tracking-wider">{title}</h1>
          <time className="text-gray-500 dark:text-gray-400 mt-2 block">{date}</time>
        </header>
        
        {image && (
          <div className="my-8 border border-black rounded-lg p-0">
            <Image src={image} alt={title} width={1200} height={675} className="w-full h-auto rounded-md" priority/>
          </div>
        )}
        
        {hasTocPlaceholder ? (
          <>
            <div className="prose prose-xl dark:prose-invert article-content" dangerouslySetInnerHTML={{ __html: beforeToc! }} />
            <TocComponent />
            {afterToc && <div className="prose prose-xl dark:prose-invert article-content" dangerouslySetInnerHTML={{ __html: afterToc }} />}
          </>
        ) : (
          <>
            <TocComponent />
            <div className="prose prose-xl dark:prose-invert article-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </>
        )}
      </article>

      {/* 記事下コンテンツ */}
      <div className="mt-16 space-y-8">
        {/* ▼▼▼ このブロックのクラスを修正しました ▼▼▼ */}
        {productBannerImage && productAmazonLink && (
          <div className="border border-black rounded-lg p-4 flex flex-col md:flex-row items-center gap-x-6 gap-y-4 bg-gray-50">
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
                {/* 商品名のテキストカラーからダークモード指定を削除 */}
                <h3 className="font-bold text-lg text-base-dark">{productName}</h3>
              </div>
              <div className="w-full flex justify-center">
                <Link href={productAmazonLink} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md text-base hover:bg-yellow-600 transition-colors text-center max-w-xs transition-transform duration-75 active:translate-y-px">{productButtonText || 'Amazon'}</Link>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 h-28"><p className="text-gray-500 dark:text-gray-400 text-lg">工事中…</p></div>
        <PickUpPosts currentPostSlug={params.slug} />
      </div>
    </>
  );
}

// generateStaticParams (変更なし)
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}