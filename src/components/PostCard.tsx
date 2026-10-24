import type { Post } from '../lib/api';
import { formatDate } from '../lib/slug';

interface Props {
  post: Pick<Post, 'title' | 'excerpt' | 'image' | 'categories' | 'publishDate' | 'readTime' | 'author'> & { slug: string };
}

export default function PostCard({ post }: Props) {
  const href = `/blog/${post.slug}/`;
  return (
    <article className="post-card">
      <a className="post-image" href={href} tabIndex={-1} aria-hidden="true">
        {post.image && <img src={post.image} alt="" loading="lazy" decoding="async" />}
      </a>
      <div className="post-body">
        <p className="project-type">{post.categories.join(' • ').toUpperCase()}</p>
        <h3><a href={href}>{post.title}</a></h3>
        <p>{post.excerpt}</p>
        <p className="post-meta">
          {post.author} · {formatDate(post.publishDate)} · {post.readTime} min read
        </p>
      </div>
    </article>
  );
}
