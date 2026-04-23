import { Fragment } from 'react';
import Link from 'next/link';
import type { AdjacentBlog, Blog, BlogBlock } from '@/data/types';
import RichText from './RichText';
import ShareBar from './ShareBar';
import styles from '@/app/blogs/[slug]/post.module.css';

const SITE = 'https://vm.ketoy.dev';

type Props = {
  post: Blog;
  adjacent: { prev?: AdjacentBlog; next?: AdjacentBlog };
};

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'lede':
      return <RichText as="p" className={styles.lede} html={block.html} />;

    case 'paragraph':
      return <RichText as="p" html={block.html} />;

    case 'heading': {
      const Tag = block.level === 2 ? 'h2' : 'h3';
      return (
        <Tag>
          {block.num && <span className={styles.num}>{block.num}</span>}
          <RichText html={block.html} />
        </Tag>
      );
    }

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag>
          {block.items.map((item, i) => (
            <RichText key={i} as="li" html={item} />
          ))}
        </Tag>
      );
    }

    case 'code':
      return (
        <div className={styles.code}>
          <div className={styles.codeHead}>
            <div className={styles.dots}>
              <i /><i /><i />
            </div>
            <span>{block.filename}</span>
            <span className={styles.lang}>{block.lang}</span>
          </div>
          <div className={styles.codeBody}>
            <pre dangerouslySetInnerHTML={{ __html: block.html }} />
          </div>
        </div>
      );

    case 'pull':
      return (
        <div className={styles.pull}>
          <blockquote>{block.quote}</blockquote>
          {block.cite && <cite>— {block.cite}</cite>}
        </div>
      );

    case 'table':
      return (
        <div className={styles.tableWrap}>
          <div className={styles.cap}>
            <span>{block.caption}</span>
            {block.captionNote && <span className={styles.n}>{block.captionNote}</span>}
          </div>
          <table>
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={cell.numeric ? styles.num : undefined}>
                      {cell.text}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'figure':
      return (
        <div className={styles.figure}>
          <div className={styles.frame}>
            <div
              className={styles.imgInner}
              role="img"
              aria-label={block.alt}
              style={{ backgroundImage: `url(${block.src})` }}
            />
          </div>
          <figcaption>
            {block.captionBold && <b>{block.captionBold}</b>}
            {block.caption && <span>{block.caption}</span>}
          </figcaption>
        </div>
      );

    case 'callout':
      return (
        <div className={styles.callout}>
          <span className={styles.calloutTag}>{block.tag}</span>
          <RichText as="p" html={block.html} />
        </div>
      );

    case 'diagram':
      return (
        <div className={styles.diagram} aria-label="Diagram">
          {block.nodes.map((n, i) => (
            <Fragment key={i}>
              <div className={styles.node}>
                <span className={styles.n}>{n.n}</span>
                <span className={styles.l}>{n.l}</span>
              </div>
              {i < block.nodes.length - 1 && (
                <div className={styles.arrow}>→</div>
              )}
            </Fragment>
          ))}
        </div>
      );

    case 'capabilities':
      return (
        <div className={styles.caps}>
          {block.items.map((it, i) => (
            <div key={i} className={styles.cap}>
              <div className={styles.capName}>{it.name}</div>
              <RichText as="div" className={styles.capDesc} html={it.html} />
            </div>
          ))}
        </div>
      );

    case 'metrics':
      return (
        <div className={styles.metrics}>
          {block.items.map((m, i) => (
            <div key={i} className={styles.metric}>
              <div className={styles.metricK}>{m.key}</div>
              <div className={styles.metricV}>
                {m.value}
                {m.unit && <small>{m.unit}</small>}
              </div>
              <RichText as="div" className={styles.metricSub} html={m.sub} />
            </div>
          ))}
        </div>
      );

    case 'math':
      return (
        <div className={styles.math}>
          {block.rows.map((r, i) => {
            const cls =
              r.variant === 'hr' ? `${styles.mathRow} ${styles.mathRowHr}`
              : r.variant === 'total' ? `${styles.mathRow} ${styles.mathRowTotal}`
              : styles.mathRow;
            return (
              <div key={i} className={cls}>
                <span className={styles.mathLabel}>{r.label}</span>
                <span className={styles.mathVal}>{r.val}</span>
              </div>
            );
          })}
          {block.note && <RichText as="div" className={styles.mathNote} html={block.note} />}
        </div>
      );

    case 'cta':
      return (
        <div className={styles.ctaBox}>
          <h3>{block.title}</h3>
          <RichText as="p" html={block.html} />
          <div className={styles.ctaBtns}>
            {block.buttons.map((b, i) => (
              <a
                key={i}
                href={b.href}
                className={`${styles.ctaBtn} ${b.variant === 'ghost' ? styles.ctaBtnGhost : ''}`}
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>
      );

    case 'hr':
      return <hr />;

    case 'signature':
      return (
        <div className={styles.signatureBlock}>
          <RichText as="span" html={block.html} />
          {block.name && <span className={styles.signatureName}>{block.name}</span>}
          {block.role && <span className={styles.signatureRole}>{block.role}</span>}
        </div>
      );
  }
}

export default function BlogPost({ post, adjacent }: Props) {
  return (
    <>
      <header className={styles.head}>
        <div className={styles.crumbs}>
          <Link href="/blogs">Field Notes</Link>
          <span className={styles.s}>/</span>
          <Link href="/blogs">{post.primaryTag}</Link>
          <span className={styles.s}>/</span>
          <span>Dispatch {String(post.dispatch).padStart(3, '0')}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.tagp}>{post.primaryTag.toUpperCase()}</span>
          <span>{post.dateLabel}</span>
          <span className={styles.sep}>·</span>
          <span>{post.readingTime} READ</span>
          <span className={styles.sep}>·</span>
          <span>DISPATCH {String(post.dispatch).padStart(3, '0')}</span>
        </div>
        <RichText as="h1" className={styles.title} html={post.title} />
        {post.dek && <RichText as="p" className={styles.dek} html={post.dek} />}
        <div className={styles.byline}>
          <div
            className={styles.av}
            style={post.author.avatar ? { backgroundImage: `url(${post.author.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
          />
          <div className={styles.who}>
            <b>{post.author.name}</b>
            {post.author.role && <span className={styles.role}>{post.author.role}</span>}
          </div>
          <div className={styles.spacer} />
          <ShareBar url={`${SITE}/blogs/${post.slug}`} title={post.title.replace(/<[^>]+>/g, '')} />
        </div>
      </header>

      {post.heroImage && (
        <div className={styles.heroImg}>
          <figure>
            <div className={styles.img} style={{ backgroundImage: `url(${post.heroImage.src})` }} />
            {post.heroImage.caption && <figcaption>{post.heroImage.caption}</figcaption>}
          </figure>
        </div>
      )}

      <article className={styles.body}>
        {post.content.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        {post.author.bio && (
          <div className={styles.endnote}>
            <div
              className={styles.av}
              style={post.author.avatar ? { backgroundImage: `url(${post.author.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            />
            <div className={styles.info}>
              <h5>{post.author.name}</h5>
              <p>{post.author.bio}</p>
            </div>
            <button type="button" className={styles.subs}>Follow →</button>
          </div>
        )}
      </article>

      <nav className={styles.nextprev}>
        {adjacent.prev ? (
          <Link className={styles.np} href={`/blogs/${adjacent.prev.slug}`}>
            <span className={styles.dir}>← DISPATCH {String(adjacent.prev.dispatch).padStart(3, '0')}</span>
            <RichText as="h4" html={adjacent.prev.title} />
          </Link>
        ) : (
          <span />
        )}
        {adjacent.next ? (
          <Link className={`${styles.np} ${styles.npNext}`} href={`/blogs/${adjacent.next.slug}`}>
            <span className={styles.dir}>DISPATCH {String(adjacent.next.dispatch).padStart(3, '0')} →</span>
            <RichText as="h4" html={adjacent.next.title} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
