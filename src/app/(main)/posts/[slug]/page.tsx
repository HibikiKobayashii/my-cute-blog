import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PickUpPosts from '@/app/components/PickUpPosts';
import remarkSlug from 'remark-slug';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';
import { ViewTracker } from '@/app/components/ViewTracker';
import { LikeButton } from '@/app/components/LikeButton';
import ProductBox from '@/app/components/ProductBox';

// productの型定義
type Product = {
  id: string;
  brand?: string;
  name?: string;
  image?: string;
  link?: string;
  buttonText?: string;
};

// Frontmatterの型定義にproducts配列を追加
type Frontmatter = {
  title: string;
  date: string;
  emoji?: string;
  image?: string;
  products?: Product[];
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

    const processedContent = await remark()
        .use(remarkSlug)
        .use(() => (tree: Root) => {
        visit(tree, 'heading', (node) => {
            const text = node.children.map(child => (child.type === 'text' ? child.value : '')).join('');
            if (node.depth > 1 && node.depth < 5) {
                toc.push({
                    text,
                    id: (node.data as any)?.id as string || '',
                    depth: node.depth,
                });
            }
        });
        })
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .process(matterResult.content);
    
    const contentHtml = processedContent.toString();
    
    return { 
        slug, 
        contentHtml, 
        frontmatter: matterResult.data as Frontmatter,
        toc
    };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Post({ params }: any) {
  const postData = await getPostData(params.slug);
  if (!postData) { notFound(); }

  const { title, date, emoji, image, products } = postData.frontmatter;
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

  // ▼▼▼ ここから本文とコンポーネントを組み合わせるロジックを修正 ▼▼▼

  // 1. 本文をTOCとプロダクトの目印で分割する
  const contentParts = contentHtml.split(/(\[TOC\]|\[PRODUCT:.+?\])/g);

  const renderContent = () => {
    return contentParts.map((part, index) => {
      if (part === '[TOC]') {
        return <TocComponent key={`toc-${index}`} />;
      }
      if (part && part.startsWith('[PRODUCT:')) {
        // [PRODUCT:id] から "id" の部分だけを抽出
        const productId = part.replace('[PRODUCT:', '').replace(']', '');
        const product = products?.find(p => p.id === productId);
        if (product) {
          return <ProductBox key={`product-${productId}`} {...product} />;
        }
        return null; // もし商品が見つからなければ何も表示しない
      }
      // 通常のHTMLコンテンツ
      return <div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <>
      <ViewTracker slug={params.slug} />
      <LikeButton slug={params.slug} />

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
        
        <div className="prose prose-xl dark:prose-invert article-content">
          {renderContent()}
        </div>
      </article>

      <div className="mt-16 space-y-8">
        <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 h-28">
          <p className="text-gray-500 dark:text-gray-400 text-lg">工事中…</p>
        </div>
        <PickUpPosts currentPostSlug={params.slug} />
      </div>
    </>
  );
}

// generateStaticParams
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}