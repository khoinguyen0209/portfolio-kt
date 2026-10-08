'use client';

import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import Snap from 'lenis/snap';

function AboutSnap() {
  const lenis = useLenis();

  useEffect(() => {
    const about = document.querySelector<HTMLElement>('#about');
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!lenis || !about || !header) return;
    const screens = [...about.querySelectorAll<HTMLElement>('[data-about-screen]')];
    const media = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    let snap: Snap | undefined;
    let start = 0;
    let end = 0;

    const update = () => {
      const inside = lenis.scroll >= start - 1 && lenis.scroll <= end;
      if (inside && !document.querySelector('dialog[open]')) snap?.start();
      else snap?.stop();
    };
    const rebuild = () => {
      // Stop first: Snap's pending debounce must not run after destruction.
      snap?.stop();
      snap?.destroy();
      snap = undefined;
      if (!media.matches) return;
      const headerHeight = header.getBoundingClientRect().height;
      const available = window.innerHeight - headerHeight;
      // Let short windows or zoomed text scroll freely rather than skipping content.
      if (screens.some(screen => screen.getBoundingClientRect().height > available + 2)) return;
      const points = screens.map(screen => screen.getBoundingClientRect().top + window.scrollY - headerHeight);
      start = points[0];
      end = points[points.length - 1] + available;
      snap = new Snap(lenis, { type: 'proximity', distanceThreshold: '18%', debounce: 250, lerp: 0.12 });
      points.forEach(point => snap!.add(point));
      update();
    };
    const resize = new ResizeObserver(rebuild);
    resize.observe(document.body);
    resize.observe(header);
    screens.forEach(screen => resize.observe(screen));
    const dialogs = new MutationObserver(update);
    dialogs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
    lenis.on('scroll', update);
    lenis.on('virtual-scroll', update);
    window.addEventListener('resize', rebuild);
    media.addEventListener('change', rebuild);
    rebuild();

    return () => {
      resize.disconnect();
      dialogs.disconnect();
      lenis.off('scroll', update);
      lenis.off('virtual-scroll', update);
      window.removeEventListener('resize', rebuild);
      media.removeEventListener('change', rebuild);
      snap?.stop();
      snap?.destroy();
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll() {
  return <ReactLenis root options={{ autoRaf: true, anchors: true, lerp: 0.085 }}><AboutSnap /></ReactLenis>;
}
