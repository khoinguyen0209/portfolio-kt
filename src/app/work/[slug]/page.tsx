import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { CaseStudySection, NextProject, ProjectMetadata } from '@/components/portfolio';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, openGraph: { title: `${project.title} — Khánh Trân`, description: project.summary, images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.title }] } };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  return <>
    <section className="case-hero"><Link href="/#work" className="text-link">← Back to work</Link><div className="case-heading"><p className="eyebrow">{project.company} / {project.year}</p><h1>{project.title}<span className="blue-period">.</span></h1><p className="case-subtitle">{project.summary}</p></div><ProjectMetadata project={project} /><div className="case-cover"><Image {...project.cover} alt={`${project.title} — finished product`} priority sizes="100vw" /></div></section>
    <section className="case-context"><p className="eyebrow">The project</p><div><h2>{project.category}.</h2><p>{project.intro}</p></div></section>
    {project.stories.map(story => <CaseStudySection key={story.eyebrow} story={story} />)}
    <div className="case-end"><Link className="text-link" href="/#work">← All work</Link><span>{project.role} · {project.company}</span></div>
    <NextProject project={projects[(index + 1) % projects.length]} />
  </>;
}
