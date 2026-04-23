import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import SideCard from '@/components/SideCard';
import BlogArchiveList from '@/components/BlogArchiveList';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllTags, getBlogList, getFeatured } from '@/data/blogs';
import styles from './blogs.module.css';

export const metadata: Metadata = {
  title: 'Field Notes · KetoyVM',
  description:
    'Dispatches from the KetoyVM engine room. Compiler internals, bytecode spec, runtime benchmarks, Compose semantics, and the occasional postmortem.',
  alternates: { canonical: 'https://vm.ketoy.dev/blogs' },
  openGraph: {
    title: 'Field Notes · KetoyVM',
    description:
      'Deep technical writing on compilers, runtimes and Compose. Written weekly, edited lightly, dispatched from the island.',
    url: 'https://vm.ketoy.dev/blogs',
  },
};

export default function BlogsPage() {
  const posts = getBlogList();
  const tags = getAllTags();
  const { main, sides } = getFeatured();

  return (
    <>
      <Nav />

      <header className={styles.masthead}>
        <div className={styles.mastheadTop}>
          <div>
            <div className={styles.issueChip}>
              <span className={styles.issueDot} />
              Vol. 01 · Issue 07 · Dispatched from the island
            </div>
            <h1>
              Field <em>Notes.</em>
            </h1>
            <p className={styles.mastheadLede}>
              Dispatches from the KetoyVM engine room. Compiler internals,
              bytecode spec, runtime benchmarks, Compose semantics, and the
              occasional postmortem, written by the people building the runtime.
            </p>
          </div>
          <div className={styles.dateline}>
            <span><b>EST.</b> 2025</span>
            <span><b>PUBLISHED</b> WEEKLY</span>
            <span><b>LAT</b> 47°20′N</span>
            <span><b>LON</b> 152°28′E</span>
          </div>
        </div>
      </header>

      {main && (
        <div className={styles.featured}>
          <FeatureCard post={main} />
          <div className={styles.featureSide}>
            {sides.map((p) => <SideCard key={p.slug} post={p} />)}
          </div>
        </div>
      )}

      <div className={styles.pullquote}>
        <blockquote>
          The compiler is the hardest thing we will ever ship, and the least thing our users will ever see.
        </blockquote>
        <cite>— Anya Voronova, Compiler lead · Field note #14</cite>
      </div>

      <BlogArchiveList posts={posts} tags={tags} />

      <section className={styles.news}>
        <div className={styles.newsInner}>
          <div className="eyebrow">SUBSCRIBE · WEEKLY · FROM THE ISLAND</div>
          <h2>
            One dispatch, <em>every Thursday</em>.
          </h2>
          <p>
            Deep technical writing on compilers, runtimes and Compose. Often a
            code walkthrough. Sometimes a postmortem. Never a product email.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <Footer variant="blog" />
    </>
  );
}
