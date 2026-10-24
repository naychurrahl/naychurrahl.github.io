interface Props {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  label: string;
}

export default function Filters({ categories, active, onChange, label }: Props) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {['All', ...categories].map((cat) => (
        <button
          key={cat}
          type="button"
          className={`filter-pill${active === cat ? ' active' : ''}`}
          aria-pressed={active === cat}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// Categories that are actually used by at least one item, in the CMS order.
export function usedCategories(order: string[], items: { categories: string[] }[]): string[] {
  const used = new Set(items.flatMap((i) => i.categories));
  const ordered = order.filter((c) => used.has(c));
  const extra = [...used].filter((c) => !order.includes(c)).sort();
  return [...ordered, ...extra];
}
