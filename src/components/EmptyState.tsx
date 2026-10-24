interface Props {
  title: string;
  text: string;
}

// Shown when a CMS collection has no published items yet.
export default function EmptyState({ title, text }: Props) {
  return (
    <div className="empty-panel">
      <h2>{title}</h2>
      <p>{text}</p>
      <p className="detail-cta">
        <a className="button primary" href="/#order">Start a project</a>
        <a className="button secondary" href="/">Back to home</a>
      </p>
    </div>
  );
}
