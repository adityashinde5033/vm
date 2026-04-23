'use client';

import { useMemo, useState } from 'react';
import type { BlogSummary } from '@/data/types';
import BlogCard from './BlogCard';
import styles from '@/app/blogs/blogs.module.css';

type TagEntry = { name: string; count: number };

type Props = {
  posts: BlogSummary[];
  tags: TagEntry[];
};

const ALL_TAG = 'all';

export default function BlogArchiveList({ posts, tags }: Props) {
  const [active, setActive] = useState<string>(ALL_TAG);
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (active !== ALL_TAG && !p.tags.includes(active)) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.excerpt} ${p.author.name} ${p.tags.join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, active, query]);

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.tags}>
          <button
            type="button"
            className={`${styles.tag} ${active === ALL_TAG ? styles.on : ''}`}
            onClick={() => setActive(ALL_TAG)}
          >
            All <span className={styles.ct}>— {posts.length}</span>
          </button>
          {tags.map((t) => (
            <button
              key={t.name}
              type="button"
              className={`${styles.tag} ${active === t.name ? styles.on : ''}`}
              onClick={() => setActive(t.name)}
            >
              {t.name} <span className={styles.ct}>— {t.count}</span>
            </button>
          ))}
        </div>
        <div className={styles.search}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search field notes…"
            aria-label="Search"
          />
        </div>
      </div>

      <section className={styles.list}>
        <div className={styles.listHead}>
          <h3>
            The <em>archive</em>
          </h3>
          <div className={styles.count}>
            {filtered.length} DISPATCH{filtered.length === 1 ? '' : 'ES'} · NEWEST FIRST
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>No dispatches match this filter.</div>
        ) : (
          filtered.map((p) => <BlogCard key={p.slug} post={p} />)
        )}
      </section>
    </>
  );
}
