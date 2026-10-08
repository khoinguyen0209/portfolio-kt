'use client';

import { useEffect, useRef } from 'react';
import { CaseStudyContent } from '@/components/case-study-content';
import type { Project } from '@/data/projects';

export function ProjectOverlay({ project, onClose }: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || dialog.current?.open) return;
    dialog.current?.showModal();
    panel.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [project]);

  return <dialog
    ref={dialog}
    className="project-overlay"
    aria-labelledby={project ? `case-title-${project.slug}` : undefined}
    data-lenis-prevent
    onClose={event => { if (event.target === event.currentTarget) onClose(); }}
    onClick={event => {
      if (event.target === event.currentTarget) {
        dialog.current?.close();
        return;
      }
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#study-"]');
      if (!anchor || !panel.current) return;
      const target = panel.current.querySelector<HTMLElement>(anchor.getAttribute('href')!);
      if (!target) return;
      event.preventDefault();
      panel.current.scrollTo({
        top: panel.current.scrollTop + target.getBoundingClientRect().top - panel.current.getBoundingClientRect().top - 24,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }}
  >
    {project && <>
      <button className="case-close" type="button" onClick={() => dialog.current?.close()} aria-label="Close case study and return to work"><span aria-hidden="true">×</span></button>
      <div className="project-overlay__panel" ref={panel} data-lenis-prevent>
        <CaseStudyContent key={project.slug} project={project} />
        <div className="case-end label"><button className="text-link" type="button" onClick={() => dialog.current?.close()}>← All work</button><span>{project.role}<br />{project.company}</span></div>
      </div>
    </>}
  </dialog>;
}
