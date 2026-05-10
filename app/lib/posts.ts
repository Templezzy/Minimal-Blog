import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface BlogPost {
  image: string;
  title: string;
  slug: string;
  description: string;
  publishedDate: string;
  author: string;
  content?: string;
}

export function getPublishedPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames.map((filename) => {
    const fileContents = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
    const { data } = matter(fileContents);

    const actualSlug = data.slug || filename.replace(/\.(md|mdx)$/, '');
    
    return {
      image: data.image || '',
      title: data.title || 'Untitled Post',
      slug: actualSlug,
      description: data.description || '',
      publishedDate: data.publishedDate || data.date || new Date().toISOString(),
      author: data.author || 'Admin',
    };
  });

  return posts.sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  let filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(postsDirectory, `${slug}.md`);
  }

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    image: data.image || '',
    title: data.title || 'Untitled Post',
    slug: data.slug || slug,
    description: data.description || '',
    publishedDate: data.publishedDate || data.date || '',
    author: data.author || 'Admin',
    content: content,
  };
}