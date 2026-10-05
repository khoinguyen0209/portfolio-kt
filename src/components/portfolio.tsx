import Link from 'next/link';
import Image from 'next/image';
import { Gallery } from './gallery';
import { images, type Project, type Story } from '@/data/projects';

export function Flower({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="M50 21C28-9 0 20 21 40C-10 49 8 82 34 72C36 105 73 103 73 73C104 81 109 43 80 37C95 7 59-6 50 21Z" /></svg>;
}

export function Navigation() {
  return <header className="site-header"><Link href="/" className="wordmark" aria-label="Khánh Trân home">khánh trân<span className="wordmark-dot">.</span></Link><nav aria-label="Main navigation"><Link href="/#work">Work</Link><Link href="/#about">About</Link><a href="/khanh-tran-resume.pdf" target="_blank" rel="noopener noreferrer">Resume <span className="external-arrow" aria-hidden="true">↗</span><span className="sr-only"> (PDF, opens in new tab)</span></a><a className="nav-contact" href="/#contact">Let’s talk <span aria-hidden="true">↗</span></a></nav></header>;
}

export function Footer() {
  return <footer id="contact" className="contact-section"><div className="contact-top"><p className="eyebrow">Have something in mind?</p><span className="eyebrow">Ho Chi Minh City, Vietnam</span></div><a className="contact-heading" href="mailto:thkt262@gmail.com">Let’s make<br />something tangible.<span aria-hidden="true">↗</span></a><div className="contact-details"><a href="mailto:thkt262@gmail.com">thkt262@gmail.com ↗</a><a href="tel:+84704027761">+84 704 027 761</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Trần Huỳnh Khánh Trân</span><span>Objects. Materials. A little imagination.</span><a href="#top">Back to top ↑</a></div></footer>;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card"><Link href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}><div className={`project-preview preview-${project.slug}`}><Image {...project.cover} alt={`${project.title}, ${project.summary}`} sizes="(max-width: 700px) 100vw, 50vw" /><span className="project-index">{String(index + 1).padStart(2, '0')}</span><span className="project-open" aria-hidden="true">↗</span></div><div className="project-caption"><div><p className="eyebrow">{project.company} <span> / </span> {project.year}</p><h3>{project.title}</h3><p className="project-summary">{project.summary}</p><p className="project-role">{project.role}</p></div><span className="case-link">View case study <span aria-hidden="true">↗</span></span></div><div className="tags">{project.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}</div></Link></article>;
}

export function ProjectMetadata({ project }: { project: Project }) {
  return <dl className="project-metadata">{[['Company / project', project.company], ['My role', project.role], ['Year', project.year], ['Discipline', project.tags.join(' · ')]].map(([label, value]) => <div key={label}><dt className="eyebrow">{label}</dt><dd>{value}</dd></div>)}</dl>;
}

export function CaseStudySection({ story }: { story: Story }) {
  return <section className="story-section"><div className="story-copy"><p className="eyebrow">{story.eyebrow}</p><h2>{story.title}</h2><p>{story.text}</p></div><Gallery assets={images(story.pages)} title={story.title} /></section>;
}

export function NextProject({ project }: { project: Project }) {
  return <Link href={`/work/${project.slug}`} className="next-project"><div><p className="eyebrow">Keep exploring / Next project</p><h2>{project.title} <span aria-hidden="true">↗</span></h2><p>{project.summary}</p></div><Image {...project.cover} alt={project.title} sizes="(max-width: 700px) 35vw, 25vw" /></Link>;
}
