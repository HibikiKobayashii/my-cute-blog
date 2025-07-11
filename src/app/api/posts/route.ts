import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

function getPostDataBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return {
    slug,
    frontmatter: data,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugsParam = searchParams.get('slugs');

  if (!slugsParam) {
    return NextResponse.json({ error: 'Slugs are required' }, { status: 400 });
  }

  const slugs = slugsParam.split(',');
  const postsData = slugs
    .map(slug => getPostDataBySlug(slug))
    .filter(post => post !== null);

  return NextResponse.json(postsData);
}

// ▼▼▼ この一行を追加して、実行環境をNode.jsに固定します ▼▼▼
export const runtime = 'nodejs';