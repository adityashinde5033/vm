'use client';

import { useEffect } from 'react';

/**
 * Applies a scroll-driven parallax translate/fade to every `.marker` element
 * in the hero section. No-op on the server; listener removes on unmount.
 */
export default function HeroMarkers() {
  useEffect(() => {
    const markers = Array.from(document.querySelectorAll<HTMLElement>('[data-marker]'));
    if (markers.length === 0) return;

    const onScroll = () => {
      const y = window.scrollY;
      markers.forEach((m, i) => {
        m.style.transform = `translateY(${y * (0.05 + i * 0.02)}px)`;
        m.style.opacity = String(Math.max(0, 1 - y / 600));
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
