import { useState } from 'react';
import type { Project } from '../lib/api';
import ProjectCard from './ProjectCard';
import Filters from './Filters';
import EmptyState from './EmptyState';

interface Props {
  projects: (Project & { slug: string })[];
  categories: string[];
}

export default function PortfolioGrid({ projects, categories }: Props) {
  const [category, setCategory] = useState('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const hasFeatured = projects.some((p) => p.featured);

  if (projects.length === 0) {
    return <EmptyState title="Projects are on their way." text="We're adding our latest work. Check back soon." />;
  }

  const shown = projects.filter((p) =>
    (category === 'All' || p.categories.includes(category)) && (!featuredOnly || p.featured));

  return (
    <>
      <div className="filter-bar">
        <Filters categories={categories} active={category} onChange={setCategory} label="Filter projects by category" />
        {hasFeatured && (
          <label className="filter-toggle">
            <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} />
            Featured only
          </label>
        )}
      </div>

      {shown.length > 0 ? (
        <div className="project-grid">
          {shown.map((p) => <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} />)}
        </div>
      ) : (
        <p className="empty-state">No projects in this category yet.</p>
      )}
    </>
  );
}
