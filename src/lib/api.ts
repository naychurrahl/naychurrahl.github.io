// Build-time access to the shared backend (same API the store uses).
// Any failure throws, so an outage fails the build instead of publishing empty pages.

const API_URL = (import.meta.env.API_URL || 'https://naystore.alwaysdata.net').replace(/\/+$/, '');

// Shapes mirror the backend mappers in naychurrahl/backend/Functions.php.
export interface Project {
  id: string;
  title: string;
  client: string;
  categories: string[];
  image: string | null;
  description: string;
  tags: string[];
  year: number;
  featured: boolean;
  // Built from CMS custom fields that hold a URL (see getPortfolio).
  links: ProjectLink[];
  liveUrl: string | null;
}

export interface ProjectLink {
  label: string;
  url: string;
}

interface FieldDef {
  key: string;
  label: string;
  type: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string | null;
  categories: string[];
  image: string | null;
  publishDate: string;
  readTime: number;
  tags: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  categories: string[];
  photographer: string;
  date: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  roleCompany: string;
  quote: string;
  avatar: string | null;
  rating: number | null;
}

interface Contact { id: string; label: string; value: string }

export interface Settings {
  companyName: string;
  tagline: string;
  description: string;
  emails: Contact[];
  phones: Contact[];
  addresses: Contact[];
  socialLinks: { id: string; platform: string; url: string }[];
}

export type CategoryType = 'portfolio' | 'blog' | 'gallery';

const cache = new Map<string, Promise<unknown>>();

// Retries network errors and 5xx twice (2s, then 5s) before giving up,
// so a brief hiccup on the API host doesn't fail a deploy.
async function fetchWithRetry(url: string): Promise<Response> {
  const delays = [2000, 5000];
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.status < 500 || attempt >= delays.length) return res;
    } catch (err) {
      if (attempt >= delays.length) throw err;
    }
    await new Promise((r) => setTimeout(r, delays[attempt]));
  }
}

function get<T>(path: string): Promise<T> {
  if (!cache.has(path)) {
    cache.set(path, (async () => {
      const res = await fetchWithRetry(`${API_URL}${path}`);
      if (!res.ok) throw new Error(`API ${path} failed: ${res.status} ${res.statusText}`);
      const data = await res.json();
      if (data && typeof data === 'object' && 'error' in data) {
        throw new Error(`API ${path} returned error: ${data.error}`);
      }
      return data;
    })());
  }
  return cache.get(path) as Promise<T>;
}

// Any portfolio custom field whose value is an http(s) URL becomes a link,
// labelled with the field's CMS label. "Live site"-like labels win liveUrl.
export async function getPortfolio(): Promise<Project[]> {
  const [rows, fields] = await Promise.all([
    get<Record<string, unknown>[]>('/portfolio'),
    get<FieldDef[]>('/builtin-type-fields/portfolio'),
  ]);
  return rows.map((row) => {
    const links: ProjectLink[] = [];
    for (const field of fields) {
      const value = row[field.key];
      if (typeof value === 'string' && /^https?:\/\/\S+$/i.test(value.trim())) {
        links.push({ label: field.label, url: value.trim() });
      }
    }
    const live = links.find((l) => /live|website|site/i.test(l.label)) ?? links[0];
    // Only known fields, so raw custom-field values never reach the browser.
    const { id, title, client, categories, image, description, tags, year, featured } = row as unknown as Project;
    return { id, title, client, categories, image, description, tags, year, featured, links, liveUrl: live?.url ?? null };
  });
}
export const getBlog = () => get<Post[]>('/blog');
export const getGallery = () => get<GalleryImage[]>('/gallery');
export const getTestimonials = () => get<Testimonial[]>('/testimonials');
export const getSettings = () => get<Settings>('/settings');

export async function getCategories(type: CategoryType): Promise<string[]> {
  const rows = await get<{ id: string; name: string }[]>(`/categories?type=${type}`);
  return rows.map((c) => c.name);
}
