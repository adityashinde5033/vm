'use client';

import { useState } from 'react';
import styles from '@/app/blogs/blogs.module.css';

export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <form
      className={`${styles.nform} ${done ? styles.done : ''}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setDone(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="you@studio.dev"
        aria-label="Email"
        value={email}
        disabled={done}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={done}>
        {done ? 'On the list ✓' : 'Subscribe →'}
      </button>
    </form>
  );
}
