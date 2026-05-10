import { getPublishedPosts } from './lib/posts';
import Card from './components/Card';

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <header className="flex flex-col items-center mb-16 gap-6">
          <h1 className="text-4xl font-medium text-zinc-900 dark:text-white tracking-tight">
            Minimal Blog
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <Card 
              key={post.slug}
              {...post}
              desc={post.description}
              date={post.publishedDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}