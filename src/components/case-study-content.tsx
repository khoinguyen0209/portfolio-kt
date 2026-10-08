import Image from 'next/image';
import { treatments } from '@/data/art-direction';
import type { Project } from '@/data/projects';
import { CaseStudySection, ProjectMetadata } from '@/components/portfolio';

export function CaseStudyContent({ project }: { project: Project }) {
  const treatment = treatments[project.slug];

  return <div className={`case-exhibition case-${treatment.layout} tone-${treatment.tone}`} data-project={project.slug}>
    <section className="case-hero">
      <div className="case-register label"><span>Selected work / Case study</span><span>{project.year}</span></div>
      <div className="case-heading"><p className="label">{project.category}</p><h1 id={`case-title-${project.slug}`}>{project.title}<span className="accent">.</span></h1><p className="case-subtitle">{project.summary}</p></div>
      <div className="case-opening"><figure className="case-cover"><Image {...project.cover} alt={`${project.title} — project overview`} priority sizes={treatment.layout === 'object' ? '(max-width: 700px) 100vw, 65vw' : '100vw'} /><figcaption className="label"><span>{project.company}</span><span>{project.title} / {project.year}</span></figcaption></figure><ProjectMetadata project={project} /></div>
    </section>
    <section className="case-context"><div><p className="label">Object notes</p>{treatment.detail && <Image {...treatment.detail} alt={`${project.title} — material and form detail`} sizes="(max-width: 700px) 40vw, 25vw" />}</div><div><h2>{project.category}. <em>Seen up close.</em></h2><p>{project.intro}</p>{project.stories.length > 1 && <nav className="study-index label" aria-label="Project chapters">{project.stories.map((story, chapter) => <a href={`#study-${chapter + 1}`} key={story.eyebrow}>{story.eyebrow} ↓</a>)}</nav>}</div></section>
    {project.stories.map((story, chapter) => <CaseStudySection key={story.eyebrow} story={story} index={chapter} layout={treatment.galleries[chapter]} />)}
  </div>;
}
