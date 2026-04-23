import Link from 'next/link';

type Variant = 'landing' | 'blog';

type Props = {
  variant?: Variant;
};

export default function Footer({ variant = 'landing' }: Props) {
  return (
    <footer className="site-footer">
      <div className="brand-col">
        <div className="brand">
          <img src="/assets/ketoy_logo.png" alt="Ketoy" />
          <div className="name">
            Ketoy<em>VM</em>
          </div>
        </div>
        {variant === 'landing' ? (
          <p>
            A Kotlin program execution runtime for Android. Write plain Kotlin.
            Ship a bundle. Update anytime. Built by a small crew of compiler and
            runtime engineers.
          </p>
        ) : (
          <p>
            A Kotlin program execution runtime for Android. Field Notes is the
            engineering blog, written weekly, edited lightly, dispatched from
            the island.
          </p>
        )}
      </div>

      <div>
        <h5>Runtime</h5>
        <ul>
          <li><a href="/#how">Flow</a></li>
          <li><a href="/#features">Compose surface</a></li>
          {variant === 'landing' ? (
            <>
              <li><a href="/#code">Code sample</a></li>
              <li><a href="#">KBC spec</a></li>
            </>
          ) : (
            <>
              <li><a href="#">KBC spec</a></li>
              <li><a href="#">Changelog</a></li>
            </>
          )}
        </ul>
      </div>

      {variant === 'landing' ? (
        <div>
          <h5>Program</h5>
          <ul>
            <li><a href="/#waitlist">Waitlist</a></li>
            <li><a href="#">Alpha cohort</a></li>
            <li><a href="#">Changelog</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>
      ) : (
        <div>
          <h5>Field Notes</h5>
          <ul>
            <li><Link href="/blogs">Archive</Link></li>
            <li><a href="#">Authors</a></li>
            <li><a href="#">RSS</a></li>
            <li><a href="#">Subscribe</a></li>
          </ul>
        </div>
      )}

      <div>
        <h5>Elsewhere</h5>
        <ul>
          <li><a href="https://github.com/KetoyDev" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://x.com/KetoyDev" target="_blank" rel="noopener">X / Twitter</a></li>
          <li><a href="https://www.linkedin.com/company/ketoy" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="mailto:support@ketoy.dev">support@ketoy.dev</a></li>
        </ul>
      </div>

      <div className="footbar">
        <div>© 2026 KetoyVM · Alpha 0.1</div>
        <div>47°20′N · 152°28′E · SEA OF OKHOTSK</div>
      </div>
    </footer>
  );
}
