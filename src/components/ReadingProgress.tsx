'use client';

import { useEffect, useRef } from 'react';
import styles from '@/app/blogs/[slug]/post.module.css';

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const denom = h.scrollHeight - h.clientHeight;
      const t = denom > 0 ? h.scrollTop / denom : 0;
      if (barRef.current) {
        barRef.current.style.width = `${Math.max(0, Math.min(1, t)) * 100}%`;
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div ref={barRef} className={styles.progress} />;
}
