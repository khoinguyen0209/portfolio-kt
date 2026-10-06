'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ExhibitionMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const frames = document.querySelectorAll<HTMLElement>('[data-reveal]');

    function configure() {
      observer?.disconnect();
      frames.forEach(frame => frame.removeAttribute('data-reveal-state'));
      if (preference.matches || !('IntersectionObserver' in window)) return;

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-reveal-state', 'seen');
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.08 });

      frames.forEach(frame => {
        // Above-the-fold imagery stays visible; no JavaScript is needed to read the site.
        if (frame.getBoundingClientRect().top > window.innerHeight) {
          frame.setAttribute('data-reveal-state', 'waiting');
          observer?.observe(frame);
        }
      });
    }

    configure();
    preference.addEventListener('change', configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', configure);
      frames.forEach(frame => frame.removeAttribute('data-reveal-state'));
    };
  }, [pathname]);

  return null;
}
