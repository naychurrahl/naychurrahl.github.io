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

function get<T>(path: string): Promise<T> {
  if (!cache.has(path)) {
    cache.set(path, (async () => {
      const res = await fetch(`${API_URL}${path}`, { headers: { Accept: 'application/json' } });
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

export const getPortfolio = () => get<Project[]>('/portfolio');
export const getBlog = () => get<Post[]>('/blog');
export const getGallery = () => get<GalleryImage[]>('/gallery');
export const getTestimonials = () => get<Testimonial[]>('/testimonials');
export const getSettings = () => get<Settings>('/settings');

export async function getCategories(type: CategoryType): Promise<string[]> {
  const rows = await get<{ id: string; name: string }[]>(`/categories?type=${type}`);
  return rows.map((c) => c.name);
}
