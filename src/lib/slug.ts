export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'item';
}

// Readable, unique slugs for a list of CMS items. On a title clash the item id is appended.
export function withSlugs<T extends { id: string; title: string }>(items: T[]): (T & { slug: string })[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const s = slugify(item.title);
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return items.map((item) => {
    const s = slugify(item.title);
    return { ...item, slug: counts.get(s)! > 1 ? `${s}-${slugify(item.id)}` : s };
  });
}

export function formatDate(date: string, style: 'short' | 'long' = 'short'): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-GB', style === 'long'
    ? { day: 'numeric', month: 'long', year: 'numeric' }
    : { day: 'numeric', month: 'short', year: 'numeric' });
}
