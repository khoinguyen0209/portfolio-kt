import Image from 'next/image';
import Link from 'next/link';
import { Flower, CatalogueLabel } from '@/components/portfolio';
import { featured, images, portrait, projects } from '@/data/projects';

export default function Home() {
  const [chess, coffee, worlds, backgammon] = featured.map(slug => projects.find(project => project.slug === slug)!);

  return <div className="home-exhibition">
    <section className="cover" aria-labelledby="hero-title">
      <div className="cover-register label"><span>Objects / Materials / Process / Play</span><span>Selected portfolio, 2020—2026</span></div>
      <div className="cover-composition">
        <h1 id="hero-title"><span className="cover-thought">Thoughtfully</span><span className="cover-made">made<span className="accent">.</span></span><span className="cover-sentiment">Meant to be felt.</span></h1>
        <Link href="/work/trong-dong" className="cover-object" aria-label="Explore Trong Dong coffee filter">
          <div className="cover-object-image"><Image {...images([8])[5]} alt="Trong Dong coffee filter resting above a glass, in soft directional light" priority sizes="(max-width: 700px) 48vw, 28vw" /></div>
          <span className="cover-object-caption label"><span>Fig. 02 / Trong Dong</span><span aria-hidden="true">↗</span></span>
        </Link>
        <span className="cover-side-note label">From the first sketch<br />to the physical object.</span>
      </div>
      <div className="cover-bottom"><div className="cover-identity"><Flower /><p>Khánh Trân<br /><span>Product designer & material explorer<br />Ho Chi Minh City, Vietnam</span></p></div><p className="cover-intro">I’m Khánh Trân, a product designer working at the intersection of form, materials, and imagination.</p><a href="#work" className="index-link label">View selected work <span aria-hidden="true">↓</span></a></div>
    </section>

    <section id="work" className="selected-work" aria-labelledby="work-title">
      <div className="work-introduction"><p className="label">A selection of things made</p><h2 id="work-title">Objects with<br />a point of <em>view.</em></h2><div className="work-intro-aside"><span className="catalogue-count">11<span>projects</span></span><p>Products, material explorations,<br />and small worlds brought to life.</p></div></div>

      <article className="feature feature-chess" aria-labelledby="chess-title">
        <div className="feature-heading"><CatalogueLabel project={chess} /><h3 id="chess-title"><Link href={`/work/${chess.slug}`}>Homo<br /><em>Sapiens</em><span className="title-arrow" aria-hidden="true">↗</span></Link></h3></div>
        <Link href={`/work/${chess.slug}`} className="chess-image image-link" aria-label="View Homo Sapiens case study" data-reveal><Image {...chess.cover} alt="Homo Sapiens chess set: sculptural characters on a textured board" sizes="(max-width: 700px) 100vw, 67vw" /><span className="image-link-note label">Explore object / 01 ↗</span></Link>
        <div className="feature-footnote"><p>{chess.summary}</p><span className="label">{chess.role}</span></div>
        <figure className="chess-drawing"><Image {...images([5])[0]} alt="Line drawings exploring the six Homo Sapiens chess characters" sizes="(max-width: 700px) 65vw, 25vw" /><figcaption className="label">Study / Form & character</figcaption></figure>
      </article>

      <article className="feature feature-coffee" aria-labelledby="coffee-title">
        <div className="coffee-heading"><CatalogueLabel project={coffee} /><h3 id="coffee-title"><Link href={`/work/${coffee.slug}`}>A little<br /><em>ritual.</em><span className="title-arrow" aria-hidden="true">↗</span></Link></h3><p className="feature-name">{coffee.title}</p><p className="feature-description">{coffee.summary}</p><span className="label">{coffee.role}</span></div>
        <Link href={`/work/${coffee.slug}`} className="coffee-image image-link" aria-label="View Trong Dong case study" data-reveal><Image {...coffee.cover} alt="The Trong Dong coffee filter, glass, lid, and individual parts" sizes="(max-width: 700px) 87vw, 49vw" /><span className="image-link-note label">Explore object / 02 ↗</span></Link>
        <figure className="coffee-detail" data-reveal><Image {...images([7])[1]} alt="Close-up of the patterned blue-green glass base" sizes="(max-width: 700px) 36vw, 19vw" /><figcaption className="label">A closer look / Surface detail</figcaption></figure>
        <span className="vertical-note label">Everyday objects, considered closely</span>
      </article>

      <div className="process-interlude"><span className="label">A way of working</span><p>Draw it.<br /><em>Make it.</em><br />Feel it.</p><div><Flower /><span className="label">Concept sketching<br />Material research<br />Physical prototyping</span></div></div>

      <article className="feature feature-worlds" aria-labelledby="worlds-title">
        <div className="worlds-topline"><CatalogueLabel project={worlds} /><span className="label">Concept → Illustration → Object</span></div>
        <h3 id="worlds-title"><Link href={`/work/${worlds.slug}`}>Worlds in<br /><em>miniature.</em><span className="title-arrow" aria-hidden="true">↗</span></Link></h3>
        <Link href={`/work/${worlds.slug}`} className="worlds-image image-link" aria-label="View Worlds in Miniature case study" data-reveal><Image {...worlds.cover} alt="Illustrated woodland home for Jelly Key’s Timber haven collection" sizes="(max-width: 700px) 100vw, 74vw" /><span className="image-link-note label">Enter the collection / 07 ↗</span></Link>
        <div className="worlds-bottom"><figure className="worlds-object"><Image {...images([23])[5]} alt="The illustrated woodland home translated into a small green artisan keycap" sizes="(max-width: 700px) 43vw, 21vw" /><figcaption className="label">Timber haven / The physical object</figcaption></figure><div><p>{worlds.summary}</p><span className="label">{worlds.role}</span><Link className="text-link" href={`/work/${worlds.slug}`}>Explore four collections ↗</Link></div></div>
      </article>

      <article className="feature feature-backgammon" aria-labelledby="backgammon-title">
        <Link href={`/work/${backgammon.slug}`} className="backgammon-image image-link" aria-label="View Luxury Backgammon case study" data-reveal><Image {...images([10])[3]} alt="A hand moving a marbled blue counter across the Luxury Backgammon board" sizes="(max-width: 700px) 100vw, 55vw" /><span className="image-link-note label">Explore object / 03 ↗</span></Link>
        <div className="backgammon-copy"><CatalogueLabel project={backgammon} /><h3 id="backgammon-title"><Link href={`/work/${backgammon.slug}`}>The feel<br />of <em>play.</em><span className="title-arrow" aria-hidden="true">↗</span></Link></h3><p className="feature-name">{backgammon.title}</p><p>{backgammon.summary}</p><span className="label">{backgammon.role}</span><Image {...backgammon.cover} alt="The complete Luxury Backgammon set" sizes="(max-width: 700px) 32vw, 16vw" /></div>
      </article>
    </section>

    <section id="index" className="archive-section" aria-labelledby="archive-title"><div className="archive-heading"><p className="label">The extended catalogue</p><h2 id="archive-title">More things<br /><em>to discover.</em></h2><span className="label">07 more projects / 11 in total</span></div><div className="archive-list">{projects.filter(project => !featured.includes(project.slug)).map(project => <Link href={`/work/${project.slug}`} className="archive-row" key={project.slug}><span className="archive-number label">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span><div className="archive-title"><h3>{project.title}</h3><span className="label">{project.company} / {project.category}</span></div><Image {...project.cover} alt={project.title} sizes="(max-width: 700px) 80px, 250px" /><span className="archive-year label">{project.year}</span><span className="archive-arrow" aria-hidden="true">↗</span></Link>)}</div></section>

    <section id="about" className="about-section" aria-labelledby="about-title"><div className="about-register label"><span>Behind the objects</span><span>Trần Huỳnh Khánh Trân / Ho Chi Minh City</span></div><h2 id="about-title">A maker<br /><em>at heart.</em></h2><figure className="about-portrait"><Image {...portrait} alt="Trần Huỳnh Khánh Trân" sizes="(max-width: 700px) 42vw, 249px" /><figcaption className="label">Khánh Trân<br />A designer by practice.</figcaption></figure><div className="about-writing"><p className="about-lead">Hi, I’m Trân.<br />I think with my hands, too.</p><p>My work moves between digital concepts and physical production: sketching, 3D modelling, material research, prototyping, and making.</p><p>At Maztermind, I design board games, home decor, and gifts, with hands-on R&D in materials and 3D printing. Before that, I worked on illustrated worlds at Jelly Key and brought sculptures into physical form at Ki Saigon / reborn.design.</p><p>I hold a Bachelor of Industrial Design from the University of Architecture Ho Chi Minh City and am pursuing a Master of Applied Arts at the Ho Chi Minh City University of Fine Arts.</p><a className="text-link" href="/khanh-tran-resume.pdf" target="_blank" rel="noopener noreferrer">View my resume ↗<span className="sr-only"> (PDF, opens in new tab)</span></a></div><div className="practice-notes"><Flower /><div><h3 className="label">01 / In practice</h3><p>Concept sketching<br />Rapid prototyping<br />Material research<br />3D printing & mold making</p></div><div><h3 className="label">02 / In the toolkit</h3><p>Rhinoceros 3D · 3ds Max<br />ZBrush · KeyShot<br />Photoshop · Illustrator<br />Procreate · Premiere Pro</p></div></div></section>

    <section className="experience-section" aria-labelledby="experience-title"><h2 id="experience-title" className="label">A continuing practice<br /><span>The journey so far</span></h2><div className="experience-list">{[
      ['2024—Present', 'Maztermind', 'Product R&D Engineer / Product Designer'],
      ['2024', 'Jelly Key', 'Designer & Illustrator'],
      ['2020—2023', 'Ki Saigon / reborn.design', '3D Concept & Producer'],
      ['2018—Present', 'Independent', 'Freelance Graphic Designer'],
    ].map(([date, company, role]) => <div className="experience-row" key={company}><span className="label">{date}</span><h3>{company}</h3><p>{role}</p></div>)}</div></section>
  </div>;
}
