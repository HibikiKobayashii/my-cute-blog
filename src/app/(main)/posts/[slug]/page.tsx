import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// このページのprops(コンポーネントに渡されるデータ)の型を明確に定義します
type PageProps = {
  params: {
    slug: string;
  };
};

type Frontmatter = {
  title: string;
  date: string;
  emoji?: string;
  image?: string;
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

// ▼▼▼ この行の型指定を、上で定義したPagePropsに変更しました ▼▼▼
export default async function Post({ params }: PageProps) {
  const postData = await getPostData(params.slug);
  if (!postData) { notFound(); }
  const { title, date, emoji, image } = postData.frontmatter;

  return (
    <>
      <article>
        <header className="mb-8 text-center">
          {emoji && <p className="text-5xl mb-4">{emoji}</p>}
          <h1 className="text-4xl font-bold text-black dark:text-white">{title}</h1>
          <time className="text-gray-500 dark:text-gray-400 mt-2 block">{date}</time>
        </header>

        {image && (
          <div className="my-8">
            <Image src={image} alt={title} width={1200} height={675} className="w-full h-auto rounded-md" priority/>
          </div>
        )}

        <div 
          className="prose prose-lg dark:prose-invert max-w-none" 
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>

      <div className="mt-16">
        <div className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 h-28">
          <p className="text-gray-500 dark:text-gray-400 text-lg">工事中…</p>
        </div>
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
