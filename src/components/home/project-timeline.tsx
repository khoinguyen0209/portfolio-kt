'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { projects } from '@/data/projects';
import { ProjectOverlay } from './project-overlay';
const latestYear = (year: string) => Number(year.match(/\d{4}/g)?.at(-1) ?? 0);
const chronologicalProjects = projects.map((project, index) => ({ project, index, year: latestYear(project.year) }))
  .sort((a, b) => b.year - a.year || a.index - b.index);

export function ProjectTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const digitsRef = useRef<HTMLSpanElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);


  useEffect(() => {
    const timeline = timelineRef.current;
    const digits = digitsRef.current;
    if (!timeline || !digits) return;
    const entries = timeline.querySelectorAll<HTMLElement>('.project-timeline__entry');
    const motion = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = timeline.getBoundingClientRect();
      const distance = Math.max(1, rect.height - innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      timeline.style.setProperty('--flow', String(motion.matches ? progress : 0));
      const viewportMiddle = innerHeight * 0.52;
      let active = entries[0];
      let closest = Infinity;
      for (const entry of entries) {
        const bounds = entry.getBoundingClientRect();
        const offset = bounds.top + bounds.height / 2 - viewportMiddle;
        const distance = Math.abs(offset);
        if (motion.matches && bounds.bottom > 0 && bounds.top < innerHeight) {
          entry.style.setProperty('--image-drift', `${Math.max(-5, Math.min(5, offset / innerHeight * 10))}%`);
        }
        if (distance < closest) {
          closest = distance;
          active = entry;
        }
      }
      digits.style.setProperty('--digit-index', String(2026 - Number(active.dataset.year)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    const unsubscribe = lenis?.on('scroll', schedule);
    if (!lenis) window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    return () => {
      unsubscribe?.();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      cancelAnimationFrame(frame);
    };
  }, [lenis]);

  return <div className="project-timeline" ref={timelineRef}>
    <div className="project-timeline__backdrop" aria-hidden="true">
      <div className="project-timeline__date">
        <span className="project-timeline__year"><span>202</span><span className="project-timeline__digit-window"><span className="project-timeline__digits" ref={digitsRef}>{[6, 5, 4, 3, 2].map(digit => <span key={digit}>{digit}</span>)}</span></span></span>
        <span className="project-timeline__date-caption">Selected work / 2022—2026</span>
      </div>
    </div>
    {chronologicalProjects.map(({ project, year }) => <button
      key={project.slug}
      className="project-timeline__entry"
      data-year={year}
      type="button"
      aria-label={`View ${project.title}, ${project.year} case study`}
      onClick={() => setActiveSlug(project.slug)}
    >
      <div className="project-timeline__copy">
        <span className="project-timeline__eyebrow">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <span className="project-timeline__role">Role / {project.role}</span>
        <span className="project-timeline__image"><Image {...project.cover} alt="" sizes="(max-width: 700px) 120px, (max-width: 900px) 220px, 300px" /></span>
        <span className="project-timeline__cta">View case study <span aria-hidden="true">↗</span></span>
        <span className="project-timeline__range">{project.year} · {project.company}</span>
      </div>
    </button>)}
    <ProjectOverlay project={projects.find(project => project.slug === activeSlug) ?? null} onClose={() => setActiveSlug(null)} />
  </div>;
}
