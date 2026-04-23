import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BlogPost from '@/components/BlogPost';
import ReadingProgress from '@/components/ReadingProgress';
import {
  getAdjacentBlogs,
  getAllSlugs,
  getBlogBySlug,
} from '@/data/blogs';

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '');
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: 'Not found' };

  const title = stripTags(post.title);
  const description = stripTags(post.dek ?? post.excerpt);
  const url = `https://vm.ketoy.dev/blogs/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.heroImage
        ? [{ url: `https://vm.ketoy.dev${post.heroImage.src}` }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogDetailPage(
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const adjacent = getAdjacentBlogs(slug);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: stripTags(post.title),
    description: stripTags(post.dek ?? post.excerpt),
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    image: post.heroImage ? `https://vm.ketoy.dev${post.heroImage.src}` : undefined,
    mainEntityOfPage: `https://vm.ketoy.dev/blogs/${post.slug}`,
    keywords: post.tags.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'KetoyVM',
      url: 'https://vm.ketoy.dev',
    },
  };

  return (
    <>
      <ReadingProgress />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPost post={post} adjacent={adjacent} />
      <Footer variant="blog" />
    </>
  );
}
