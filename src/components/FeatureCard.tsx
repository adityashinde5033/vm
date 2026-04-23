import Link from 'next/link';
import type { BlogSummary } from '@/data/types';
import RichText from './RichText';
import styles from '@/app/blogs/blogs.module.css';

type Props = {
  post: BlogSummary;
};

export default function FeatureCard({ post }: Props) {
  return (
    <Link href={`/blogs/${post.slug}`} className={styles.featureCard}>
      <div className={styles.featureImg} aria-hidden="true" />
      <div className={styles.featureBody}>
        <div className={styles.featureMeta}>
          <span className={styles.tagPill}>{post.primaryTag.toUpperCase()}</span>
          <span>{post.dateLabel}</span>
          <span className={styles.sep}>·</span>
          <span>{post.readingTime} READ</span>
        </div>
        <RichText as="h2" html={post.title} />
        <RichText as="p" html={post.dek ?? post.excerpt} />
        <div className={styles.byline}>
          <div className={styles.av} />
          <span>
            <b>{post.author.name}</b>
            {post.author.role ? ` · ${post.author.role.split('·')[0].trim()}` : null}
          </span>
        </div>
      </div>
    </Link>
  );
}
