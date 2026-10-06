import Link from 'next/link';
import Image from 'next/image';
import { Gallery } from './gallery';
import { images, projects, type Project, type Story } from '@/data/projects';
import type { GalleryLayout } from '@/data/art-direction';

export function Flower({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="M50 21C28-9 0 20 21 40C-10 49 8 82 34 72C36 105 73 103 73 73C104 81 109 43 80 37C95 7 59-6 50 21Z" /></svg>;
}

export function Navigation() {
  return <header className="site-header">
    <Link href="/" className="wordmark" aria-label="Khánh Trân home">khánh trân<span className="accent">*</span></Link>
    <span className="header-note label">A practice in<br />objects & imagination</span>
    <nav aria-label="Main navigation" className="label"><Link href="/#work">Work <sup>11</sup></Link><Link href="/#about">About</Link><a href="/khanh-tran-resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗<span className="sr-only"> (PDF, opens in new tab)</span></a><a href="/#contact">Contact ↗</a></nav>
  </header>;
}

export function Footer() {
  return <footer id="contact" className="contact-section">
    <div className="contact-register label"><span>End of catalogue / Beginning of a conversation</span><span>Ho Chi Minh City, Vietnam</span></div>
    <p className="contact-invitation">Have something in mind?</p>
    <a className="contact-heading" href="mailto:thkt262@gmail.com">Let’s make<br /><em>something tangible.</em><span className="contact-arrow" aria-hidden="true">↗</span></a>
    <div className="contact-bottom"><Flower /><div className="contact-details"><a href="mailto:thkt262@gmail.com">thkt262@gmail.com ↗</a><a href="tel:+84704027761">+84 704 027 761</a></div><p className="label">Objects. Materials.<br />A little imagination.</p></div>
    <div className="footer-bottom label"><span>© {new Date().getFullYear()} Trần Huỳnh Khánh Trân</span><a href="#top">Back to the beginning ↑</a></div>
  </footer>;
}

export function CatalogueLabel({ project }: { project: Project }) {
  return <div className="catalogue-label label"><span className="catalogue-number">{String(projects.indexOf(project) + 1).padStart(2, '0')}<span> / 11</span></span><span>{project.company}<br />{project.year}</span></div>;
}

export function ProjectMetadata({ project }: { project: Project }) {
  return <dl className="project-metadata">{[['Company / project', project.company], ['My role', project.role], ['Year', project.year], ['Discipline', project.tags.join(' / ')]].map(([label, value]) => <div key={label}><dt className="label">{label}</dt><dd>{value}</dd></div>)}</dl>;
}

export function CaseStudySection({ story, layout, index }: { story: Story; layout: GalleryLayout; index: number }) {
  return <section className={`story-section story-${layout}`} id={`study-${index + 1}`}>
    <div className="story-copy"><p className="label">{story.eyebrow}</p><h2>{story.title}</h2><p className="story-description">{story.text}</p></div>
    <Gallery assets={images(story.pages)} title={story.title} layout={layout} />
  </section>;
}

export function NextProject({ project }: { project: Project }) {
  return <Link href={`/work/${project.slug}`} className="next-project"><div className="next-register label"><span>Turn the page / Next project</span><span>{String(projects.indexOf(project) + 1).padStart(2, '0')} / 11</span></div><div className="next-composition"><h2>{project.title}<span aria-hidden="true">↗</span></h2><Image {...project.cover} alt={project.title} sizes="(max-width: 700px) 32vw, 25vw" /></div><p>{project.summary}</p></Link>;
}
