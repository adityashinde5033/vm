export type Author = {
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
};

export type TableCell = { text: string; numeric?: boolean };

export type BlogBlock =
  | { type: 'lede'; html: string }
  | { type: 'paragraph'; html: string; muted?: boolean }
  | { type: 'heading'; level: 2 | 3; html: string; num?: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'code'; filename: string; lang: string; html: string }
  | { type: 'pull'; quote: string; cite?: string }
  | {
      type: 'table';
      caption: string;
      captionNote?: string;
      headers: string[];
      rows: TableCell[][];
    }
  | { type: 'figure'; src: string; alt: string; captionBold?: string; caption?: string }
  | { type: 'callout'; tag: string; html: string }
  | { type: 'diagram'; nodes: Array<{ n: string; l: string }> }
  | { type: 'capabilities'; items: Array<{ name: string; html: string }> }
  | {
      type: 'metrics';
      items: Array<{ key: string; value: string; unit?: string; sub: string }>;
    }
  | {
      type: 'math';
      rows: Array<{ label: string; val: string; variant?: 'normal' | 'hr' | 'total' }>;
      note?: string;
    }
  | {
      type: 'cta';
      title: string;
      html: string;
      buttons: Array<{ label: string; href: string; variant?: 'primary' | 'ghost' }>;
    }
  | { type: 'hr' }
  | { type: 'signature'; html: string; name?: string; role?: string };

export type BlogSummary = {
  id: string;
  slug: string;
  dispatch: number;
  title: string;
  excerpt: string;
  dek?: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  tags: string[];
  primaryTag: string;
  author: Author;
  featured?: 'main' | 'side';
};

export type Blog = BlogSummary & {
  heroImage?: { src: string; caption?: string };
  content: BlogBlock[];
};

export type AdjacentBlog = { slug: string; title: string; dispatch: number };
