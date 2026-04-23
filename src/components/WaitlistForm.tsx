'use client';

import { FormEvent, useState } from 'react';
import styles from '@/app/home.module.css';

type Status = { kind: 'idle' } | { kind: 'err'; message: string } | { kind: 'ok'; message: string };

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const expanded = email.trim().length > 0;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !name.trim() || !country.trim()) {
      setStatus({ kind: 'err', message: 'EMAIL, NAME & COUNTRY REQUIRED' });
      return;
    }
    setSending(true);
    setStatus({ kind: 'idle' });
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to_email: email.trim(), name: name.trim(), country: country.trim() }),
      });
      const data = await res.json().catch(() => ({} as Record<string, string>));
      if (!res.ok) {
        throw new Error(data.error || data.message || `HTTP ${res.status}`);
      }
      setDone(true);
      setStatus({ kind: 'ok', message: `CONFIRMATION SENT TO ${email.trim().toUpperCase()}` });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'TRY AGAIN';
      setStatus({ kind: 'err', message: `COULD NOT JOIN · ${msg.toUpperCase()}` });
      setSending(false);
    }
  }

  const metaText = done
    ? "YOU’RE IN · WE’LL BE IN TOUCH FROM THE ISLAND"
    : 'NO SPAM · ONE EMAIL WHEN YOUR SLOT OPENS';

  const statusClass =
    status.kind === 'err' ? `${styles.wlStatus} ${styles.err}`
    : status.kind === 'ok' ? `${styles.wlStatus} ${styles.ok}`
    : styles.wlStatus;

  return (
    <>
      <form
        className={`${styles.waitlist} ${expanded ? styles.expanded : ''} ${done ? styles.done : ''}`}
        onSubmit={onSubmit}
      >
        <div className={styles.wlRow}>
          <input
            type="email"
            required
            placeholder="you@studio.dev"
            aria-label="Email"
            autoComplete="email"
            value={email}
            disabled={done}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={sending || done}>
            {done ? 'On the list ✓' : sending ? 'Sending…' : 'Request invite →'}
          </button>
        </div>
        <div className={styles.wlExtra} aria-hidden={!expanded}>
          <div className={styles.wlExtraInner}>
            <div className={styles.wlRow}>
              <input
                type="text"
                placeholder="Your name"
                aria-label="Name"
                autoComplete="name"
                required={expanded}
                value={name}
                disabled={done}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.wlRow}>
              <input
                type="text"
                placeholder="Country"
                aria-label="Country"
                autoComplete="country-name"
                required={expanded}
                value={country}
                disabled={done}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={statusClass}>{status.kind === 'idle' ? '' : status.message}</div>
      </form>
      <div className={styles.ctaDivider} role="separator" aria-label="or">
        <span>OR</span>
      </div>
      <a
        href="https://calendar.app.google/U8oLuX3kXpps55vYA"
        target="_blank"
        rel="noopener"
        className={styles.bookCall}
      >
        <span className={styles.bookDot} aria-hidden="true" />
        Book a call with the team
        <span className={styles.arrow}>→</span>
      </a>
      <div className={styles.ctaMeta}>{metaText}</div>
    </>
  );
}
