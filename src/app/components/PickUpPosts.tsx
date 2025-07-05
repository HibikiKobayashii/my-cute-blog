import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';

type Post = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    image?: string;
  };
};

// ファイルシステムから投稿データを取得する関数
function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const posts: Post[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      frontmatter: data as Post['frontmatter'],
    };
  });
  // 日付の新しい順に並び替え
  return posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

// ピックアップ記事を表示するコンポーネント
export default function PickUpPosts({ currentPostSlug }: { currentPostSlug: string }) {
  const allPosts = getPosts();
  
  // 現在表示している記事を除外し、最新の3件を取得
  const pickedPosts = allPosts
    .filter(post => post.slug !== currentPostSlug)
    .slice(0, 3);

  return (
    <section>
      <header className="text-center mb-10">
        <h2 className="text-2xl font-bold text-base-dark tracking-wider">PICK UP!</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pickedPosts.map((post) => (
          <article key={post.slug} className="bg-base-light border border-subtle rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/posts/${post.slug}`} className="block transition-transform duration-75 active:translate-y-0.5">
              <div className="aspect-video relative">
                {post.frontmatter.image ? (
                  <Image src={post.frontmatter.image} alt={post.frontmatter.title} fill className="object-cover"/>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p className="text-subtle">No Image</p></div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-accent mb-2">{post.frontmatter.title}</h3>
                <time className="text-sm text-subtle">{post.frontmatter.date}</time>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}