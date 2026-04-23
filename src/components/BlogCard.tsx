import Link from 'next/link';
import type { BlogSummary } from '@/data/types';
import RichText from './RichText';
import styles from '@/app/blogs/blogs.module.css';

type Props = {
  post: BlogSummary;
};

/**
 * One row in the /blogs archive list.
 * Lightweight: renders only summary fields, no content blocks.
 */
export default function BlogCard({ post }: Props) {
  return (
    <Link href={`/blogs/${post.slug}`} className={styles.post}>
      <div className={styles.num}>— {String(post.dispatch).padStart(3, '0')}</div>
      <div className={styles.main}>
        <RichText as="h4" html={post.title} />
        <RichText as="p" html={post.excerpt} />
      </div>
      <div className={styles.tagsR}>
        {post.tags.map((t) => (
          <span key={t} className={styles.tagS}>{t}</span>
        ))}
      </div>
      <div className={styles.metaR}>
        {post.dateLabel}
        <br />
        <b>{post.readingTime}</b>
      </div>
    </Link>
  );
}
