'use client';

import { useEffect } from 'react';

type Group = { sel: string; variant: string; stagger?: number };

const groups: Group[] = [
  { sel: '[data-reveal="marquee"]', variant: 'reveal' },
  { sel: '[data-reveal="section-head"]', variant: 'reveal' },
  { sel: '[data-reveal="flow-step"]', variant: 'reveal', stagger: 90 },
  { sel: '[data-reveal="feat"]', variant: 'reveal', stagger: 80 },
  { sel: '[data-reveal="code"]', variant: 'reveal reveal-left' },
  { sel: '[data-reveal="code-aside"]', variant: 'reveal reveal-right' },
  { sel: '[data-reveal="island-card"]', variant: 'reveal', stagger: 120 },
  { sel: '[data-reveal="cta-child"]', variant: 'reveal', stagger: 70 },
  { sel: '[data-reveal="footer-col"]', variant: 'reveal', stagger: 60 },
];

/**
 * One-shot scroll-triggered reveal. Adds base reveal classes on mount, then
 * flips an `.in` class when each target enters the viewport. Respects
 * prefers-reduced-motion.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets: HTMLElement[] = [];
    groups.forEach((g) => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(g.sel));
      nodes.forEach((el, i) => {
        g.variant.split(/\s+/).forEach((c) => el.classList.add(c));
        if (g.stagger) el.style.setProperty('--reveal-delay', `${i * g.stagger}ms`);
        targets.push(el);
      });
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
