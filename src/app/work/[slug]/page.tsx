import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { treatments } from '@/data/art-direction';
import { CaseStudySection, NextProject, ProjectMetadata } from '@/components/portfolio';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, alternates: { canonical: `/work/${slug}` }, openGraph: { title: `${project.title} — Khánh Trân`, description: project.summary, url: `/work/${slug}`, images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.title }] } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const treatment = treatments[slug];
  const number = String(index + 1).padStart(2, '0');

  return <div className={`case-exhibition case-${treatment.layout} tone-${treatment.tone}`} data-project={slug}>
    <section className="case-hero">
      <div className="case-register label"><Link href="/#work">← Back to work</Link><span>Catalogue / {number} of 11</span><span>{project.year}</span></div>
      <div className="case-heading"><span className="case-number" aria-hidden="true">{number}</span><p className="label">{project.category}</p><h1>{project.title}<span className="accent">.</span></h1><p className="case-subtitle">{project.summary}</p></div>
      <div className="case-opening"><figure className="case-cover"><Image {...project.cover} alt={`${project.title} — project overview`} priority sizes={treatment.layout === 'object' ? '(max-width: 700px) 100vw, 65vw' : '100vw'} /><figcaption className="label"><span>{project.company}</span><span>{project.title} / {project.year}</span></figcaption></figure><ProjectMetadata project={project} /></div>
    </section>
    <section className="case-context"><div><p className="label">Object notes / {number}</p>{treatment.detail && <Image {...treatment.detail} alt={`${project.title} — material and form detail`} sizes="(max-width: 700px) 40vw, 25vw" />}</div><div><h2>{project.category}. <em>Seen up close.</em></h2><p>{project.intro}</p>{project.stories.length > 1 && <nav className="study-index label" aria-label="Project chapters">{project.stories.map((story, chapter) => <a href={`#study-${chapter + 1}`} key={story.eyebrow}>{story.eyebrow} ↓</a>)}</nav>}</div></section>
    {project.stories.map((story, chapter) => <CaseStudySection key={story.eyebrow} story={story} index={chapter} layout={treatment.galleries[chapter]} />)}
    <div className="case-end label"><Link className="text-link" href="/#work">← All work</Link><span>{project.role}<br />{project.company}</span><span>End of study / {number}</span></div>
    <NextProject project={projects[(index + 1) % projects.length]} />
  </div>;
}
