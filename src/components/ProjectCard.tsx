import type { Project } from '../lib/api';

const tints = ['naystore', 'phindol', 'rachvic', 'hapy'];

interface Props {
  project: Project & { slug: string };
  index: number;
  featured?: boolean;
}

// Same markup as Alpha's original "Selected work" cards, fed from the CMS.
export default function ProjectCard({ project, index, featured = false }: Props) {
  const href = `/portfolio/${project.slug}/`;
  return (
    <article className={`project-card${featured ? ' featured' : ''}`}>
      <a className={`project-visual ${tints[index % tints.length]}`} href={href} tabIndex={-1} aria-hidden="true">
        <span>{project.client.toUpperCase()}</span>
        <strong>{project.title}</strong>
      </a>
      <div className="project-body">
        <p className="project-type">{project.categories.join(' • ').toUpperCase()}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.tags.length > 0 && (
          <div className="tags">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
        )}
        <a href={href}>View project ↗</a>
      </div>
    </article>
  );
}
