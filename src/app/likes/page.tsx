"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

// 表示用の記事データの型
type LikedPost = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    image?: string;
  };
};

export default function LikesPage() {
  const { data: session, status } = useSession({ required: true });
  const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const userId = session.user.email;
      const likesApiUrl = `http://localhost:5053/api/likes/user/${userId}`;

      // 1. いいねした記事のスラッグリストを取得
      fetch(likesApiUrl)
        .then(res => res.json())
        .then((slugs: string[]) => {
          if (slugs.length === 0) return;

          // ▼▼▼ 2. API経由で記事データを取得するよう修正 ▼▼▼
          const postsApiUrl = `/api/posts?slugs=${slugs.join(',')}`;
          fetch(postsApiUrl)
            .then(res => res.json())
            .then(data => {
              setLikedPosts(data);
            });
        })
        .catch(error => console.error("Failed to fetch liked posts:", error));
    }
  }, [status, session]);

  if (status === "loading") {
    return <div className="max-w-4xl mx-auto py-8">読み込み中...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">いいねした記事</h1>
      <div className="space-y-4">
        {likedPosts.length > 0 ? (
          likedPosts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-100 transition-colors">
              <div className="relative w-32 h-20 flex-shrink-0">
                {post.frontmatter.image ? (
                  <Image src={post.frontmatter.image} alt={post.frontmatter.title} fill className="object-cover rounded-md" />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-md"></div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg">{post.frontmatter.title}</h2>
                <p className="text-sm text-gray-500">{post.frontmatter.date}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>まだ「いいね」した記事はありません。
          </p>
        )}
      </div>
    </div>
  );
}