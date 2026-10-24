import { useState } from 'react';
import type { Post } from '../lib/api';
import PostCard from './PostCard';
import Filters from './Filters';

type ListPost = Omit<Post, 'content'> & { slug: string };

interface Props {
  posts: ListPost[];
  categories: string[];
}

export default function BlogList({ posts, categories }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const q = query.trim().toLowerCase();
  const shown = posts.filter((p) => {
    const matchesSearch = !q
      || p.title.toLowerCase().includes(q)
      || p.excerpt.toLowerCase().includes(q)
      || p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesSearch && (category === 'All' || p.categories.includes(category));
  });

  return (
    <>
      <div className="filter-bar">
        <input
          className="search-input"
          type="search"
          placeholder="Search articles…"
          aria-label="Search articles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Filters categories={categories} active={category} onChange={setCategory} label="Filter articles by category" />
      </div>

      {shown.length > 0 ? (
        <div className="post-grid">
          {shown.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      ) : (
        <p className="empty-state">No articles match your search.</p>
      )}
    </>
  );
}
