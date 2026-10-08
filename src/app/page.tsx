import Image from 'next/image';
import { ProjectTimeline } from '@/components/home/project-timeline';
import { projects } from '@/data/projects';
import './home.css';

const practice = ['Concept sketching', 'Rapid prototyping', 'Material research', '3D printing & mold making'];
const toolkit = ['Rhinoceros 3D · 3ds Max', 'ZBrush · KeyShot', 'Photoshop · Illustrator', 'Procreate · Premiere Pro'];
const journey = [
  { years: '2024—Present', studio: 'Maztermind', role: 'Product R&D Engineer / Product Designer' },
  { years: '2024', studio: 'Jelly Key', role: 'Designer & Illustrator' },
  { years: '2020—2023', studio: 'Ki Saigon / reborn.design', role: '3D Concept & Producer' },
  { years: '2018—Present', studio: 'Independent', role: 'Freelance Graphic Designer' },
];

export default function Home() {
  return <div className="portfolio-home">
    <section className="home-hero" aria-labelledby="home-title">
      <Image {...projects[0].cover} alt="" priority sizes="100vw" className="home-hero__image" />
      <div className="home-hero__content"><div><p className="home-hero__eyebrow">Khánh Trân / Product designer</p><h1 id="home-title">Objects made<br />to be <em>felt.</em></h1></div><div className="home-hero__aside"><p>Product design, material exploration, and a little imagination. A collection of objects shaped by curiosity and made with care.</p><a className="home-pill" href="#work">Explore the work <span aria-hidden="true">↗</span></a></div></div>
      <a className="home-hero__scroll" href="#work">Scroll to explore <span aria-hidden="true">↓</span></a>
    </section>
    <section id="work" className="home-work" aria-labelledby="work-title"><div className="home-work__intro"><p className="home-eyebrow">01 / Selected work</p><h2 id="work-title">Ideas take shape<br /><em>in the making.</em></h2><p>Objects, materials, process, and play. Scroll through selected projects, from recent work to earlier explorations.</p></div><ProjectTimeline /></section>
    <section id="about" className="home-about" aria-labelledby="about-title">
      <div className="home-about__screen home-about__intro" data-about-screen>
        <div className="home-about__image">
          <Image src="/images/p2-1.webp" width={249} height={249} alt="Portrait of Khánh Trân" sizes="(max-width: 700px) 220px, 320px" />
        </div>
        <div className="home-about__copy">
          <p className="home-eyebrow">Behind the objects</p>
          <h2 id="about-title">A maker<br /><em>at heart.</em></h2>
          <p className="home-about__lead">Hi, I’m Trân.<br /><em>I think with my hands, too.</em></p>
          <p className="home-about__statement">My work moves between <strong>digital concepts</strong> and <strong>physical production</strong>: sketching, 3D modelling, material research, prototyping, and making.</p>
        </div>
      </div>
      <section className="home-about__screen home-about__experience" data-about-screen aria-labelledby="journey-title">
        <div className="home-about__copy">
          <p className="home-eyebrow">A continuing practice</p>
          <h2 id="journey-title">The journey<br /><em>so far.</em></h2>
          <p>At <strong>Maztermind</strong>, I design board games, home decor, and gifts, with hands-on <em>R&amp;D in materials and 3D printing.</em> Before that, I worked on illustrated worlds at <strong>Jelly Key</strong> and brought sculptures into physical form at <strong>Ki Saigon / reborn.design.</strong></p>
        </div>
        <div className="home-about__journey">
          <ol>{journey.map(({ years, studio, role }) => <li key={studio}><span className="home-about__years">{years}</span><div><strong>{studio}</strong><span>{role}</span></div></li>)}</ol>
        </div>
      </section>
      <section className="home-about__screen home-about__practice" data-about-screen aria-labelledby="making-title">
        <div className="home-about__copy">
          <p className="home-eyebrow">Learning through making</p>
          <h2 id="making-title">Mind, hands<br /><em>&amp; materials.</em></h2>
          <p className="home-about__education"><span className="home-about__micro-label">Education</span><strong>Bachelor of Industrial Design</strong> from the University of Architecture Ho Chi Minh City; pursuing a <strong>Master of Applied Arts</strong> at the Ho Chi Minh City University of Fine Arts.</p>
          <a className="home-pill home-pill--dark" href="/#contact">Let’s talk <span aria-hidden="true">↗</span></a>
        </div>
        <div className="home-about__skills">
          <section aria-labelledby="practice-title">
            <h3 id="practice-title">In practice</h3>
            <ul>{practice.map(item => <li key={item}>{item}</li>)}</ul>
          </section>
          <section aria-labelledby="toolkit-title">
            <h3 id="toolkit-title">In the toolkit</h3>
            <ul>{toolkit.map(item => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </section>
    </section>
  </div>;
}
