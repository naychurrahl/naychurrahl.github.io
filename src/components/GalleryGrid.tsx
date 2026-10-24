import { useEffect, useRef, useState } from 'react';
import type { GalleryImage } from '../lib/api';
import { formatDate } from '../lib/slug';
import Filters from './Filters';

interface Props {
  images: GalleryImage[];
  categories: string[];
}

export default function GalleryGrid({ images, categories }: Props) {
  const [category, setCategory] = useState('All');
  const [open, setOpen] = useState<GalleryImage | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const shown = images.filter((i) => category === 'All' || i.categories.includes(category));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="filter-bar">
        <Filters categories={categories} active={category} onChange={setCategory} label="Filter photos by category" />
      </div>

      {shown.length > 0 ? (
        <div className="gallery-grid">
          {shown.map((img) => (
            <figure key={img.id} className="gallery-item">
              <button type="button" onClick={() => setOpen(img)} aria-label={`View ${img.title}`}>
                <img src={img.image} alt={img.title} loading="lazy" decoding="async" />
              </button>
              <figcaption>
                <strong>{img.title}</strong>
                {img.photographer && <span>{img.photographer}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="empty-state">No photos in this category yet.</p>
      )}

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <button ref={closeRef} type="button" className="lightbox-close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={open.image} alt={open.title} />
            <figcaption>
              <strong>{open.title}</strong>
              <span>
                {[open.photographer, open.categories.join(', '), open.date && formatDate(open.date, 'long')]
                  .filter(Boolean).join(' · ')}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
