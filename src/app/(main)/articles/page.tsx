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
    emoji?: string;
    image?: string;
  };
};

export default function AllArticlesPage() {
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
  posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

  return (
    <>
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-base-dark tracking-wider">ALL ARTICLES</h1>
        <p className="text-subtle mt-2"></p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="bg-base-light border border-subtle rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="aspect-video relative">
                {post.frontmatter.image ? (
                  <Image src={post.frontmatter.image} alt={post.frontmatter.title} fill className="object-cover"/>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p className="text-subtle">No Image</p></div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-accent mb-2">{post.frontmatter.title}</h2>
                <time className="text-sm text-subtle">{post.frontmatter.date}</time>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* ▼▼▼ ここから修正 ▼▼▼ */}
      <div className="mt-16">
        <div className="flex items-center justify-center p-4 border border-subtle rounded-lg bg-gray-200 h-28">
          <p className="text-subtle text-lg">工事中…</p>
        </div>
      </div>
      {/* ▲▲▲ ここまで修正 ▲▲▲ */}
    </>
  );
}