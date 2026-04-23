import Link from 'next/link';
import type { BlogSummary } from '@/data/types';
import RichText from './RichText';
import styles from '@/app/blogs/blogs.module.css';

type Props = {
  post: BlogSummary;
};

export default function SideCard({ post }: Props) {
  const shortDate = post.dateLabel.split('·')[0].trim();
  return (
    <Link href={`/blogs/${post.slug}`} className={styles.sideCard}>
      <div className={styles.meta}>
        <span className={styles.t}>{post.primaryTag.toUpperCase()}</span>
        <span>{shortDate}</span>
      </div>
      <RichText as="h3" html={post.title} />
      <div className={styles.by}>{post.author.name}</div>
    </Link>
  );
}
