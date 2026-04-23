import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="brand">
        <img src="/assets/ketoy_logo.png" alt="Ketoy" />
        <div className="name">
          Ketoy<em>VM</em>
        </div>
      </Link>

      <div className="nav-links">
        <a href="/#how">How it works</a>
        <a href="/#features">Runtime</a>
        <a href="/#code">Code</a>
        <a href="/#origin">Origin</a>
        <Link href="/blogs">Blogs</Link>
      </div>

      <div className="nav-cta">
        <span className="pill">
          <span className="dot pulse" />
          ALPHA
        </span>
        <a href="/#waitlist" className="pill solid">Join waitlist →</a>
      </div>
    </nav>
  );
}
