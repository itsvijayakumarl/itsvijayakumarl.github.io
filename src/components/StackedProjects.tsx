import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Visual, { type VisualKind } from './Visual';
import { reducedMotion } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

type Card = {
  title: string; kind: string; line: string; stack: string[];
  visuals: [VisualKind, VisualKind, VisualKind]; accent: 'blue' | 'red' | 'amber';
  link?: { label: string; href: string };
};

const CARDS: Card[] = [
  {
    title: 'Web Security Operations Platform', kind: 'Security monitoring',
    line: 'A self-hosted command centre that pulls threat and traffic data from every company domain, clusters it into incidents, alerts, and emails leadership a weekly PDF.',
    stack: ['Docker', 'Node.js 20', 'PostgreSQL 16', 'Puppeteer', 'Lighthouse'],
    visuals: ['radar', 'terminal', 'shield'], accent: 'red',
  },
  {
    title: 'LeadFlow CRM', kind: 'Lead orchestration',
    line: 'One pipeline for leads that used to arrive through forms, chatbots, WhatsApp and SEO pages separately — validated, deduplicated and routed to sales.',
    stack: ['Docker', 'VPS', 'Webhooks', 'Zoho'],
    visuals: ['flow', 'bars', 'globe'], accent: 'blue',
    link: { label: 'GitHub', href: 'https://github.com/risewithvj/MicroCRM' },
  },
  {
    title: 'AIRadar', kind: 'Browser extension',
    line: 'Tracks AI usage, tokens, reset timers, burn rate and budget alerts — locally, with zero tracking. Works across Chromium and Firefox browsers.',
    stack: ['JavaScript', 'WebExtensions', 'Manifest V3'],
    visuals: ['gauges', 'bars', 'globe'], accent: 'blue',
    link: { label: 'GitHub', href: 'https://github.com/risewithvj/AIRadar' },
  },
  {
    title: 'AI Prompts', kind: 'Web app',
    line: 'A prompt library with ratings, bookmarks, an admin panel with brand controls, analytics and watermarked image delivery.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    visuals: ['grid', 'terminal', 'bars'], accent: 'amber',
    link: { label: 'Live project', href: 'https://aiprompts.trendit.in' },
  },
];

/** Flagship projects as sticky cards that stack and recede as the next one arrives. */
export default function StackedProjects() {
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const wraps = gsap.utils.toArray<HTMLElement>('.stk-wrap');
      const desktop = window.innerWidth >= 768;
      wraps.forEach((wrap, i) => {
        const card = wrap.querySelector<HTMLElement>('.stk-card');
        if (!card) return;
        // 1. arrive: the card rises out of depth and straightens as it reaches its sticky seat
        if (desktop) {
          gsap.fromTo(card, { y: 120, rotateX: 14, transformPerspective: 1400, opacity: 0.35 }, {
            y: 0, rotateX: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
          });
        } else {
          gsap.from(card, { y: 50, autoAlpha: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: wrap, start: 'top 92%', once: true } });
        }
        // 2. screens inside settle from a slow zoom (parallax depth)
        gsap.fromTo(card.querySelectorAll('.stk-img > .viz'), { scale: 1.18 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'top 20%', scrub: true },
        });
        // 3. copy lands after the card
        gsap.from(card.querySelectorAll('.stk-kind, .stk-meta h3, .stk-meta p, .stk-chips, .ghost-pill'), {
          y: 24, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07,
          scrollTrigger: { trigger: wrap, start: desktop ? 'top 55%' : 'top 88%', once: true },
        });
        // 4. recede: when the next card slides over, this one steps back
        if (desktop && i < wraps.length - 1) {
          const target = 1 - (wraps.length - 1 - i) * 0.04;
          gsap.to(card, {
            scale: target, ease: 'none',
            scrollTrigger: { trigger: wraps[i + 1], start: 'top 85%', end: 'top 15%', scrub: true },
          });
        }
      });
      // counter chip: 01 / 04 follows the card in view
      wraps.forEach((wrap, i) => {
        ScrollTrigger.create({ trigger: wrap, start: 'top 50%', end: 'bottom 50%', onToggle: (st) => {
          if (st.isActive && counter.current) counter.current.textContent = String(i + 1).padStart(2, '0');
        } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="flagship" ref={root} className="stk" aria-label="Flagship projects">
      <div className="stk-head">
        <p className="eyebrow-label text-[#6EA8FF]">08 / Flagship systems</p>
        <h2 className="hero-gradient stk-title">Projects</h2>
      </div>
      <div className="stk-counter lg" aria-hidden="true"><span ref={counter}>01</span> / {String(CARDS.length).padStart(2, '0')}</div>
      {CARDS.map((c, i) => (
        <div className="stk-wrap" key={c.title}>
          <article className={`stk-card stk-${c.accent}`} style={{ top: `calc(132px + ${i * 18}px)` }}>
            <header className="stk-top">
              <span className="stk-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="stk-meta">
                <span className="stk-kind">{c.kind}</span>
                <h3>{c.title}</h3>
                <p>{c.line}</p>
                <div className="stk-chips">{c.stack.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
              {c.link ? (
                <a href={c.link.href} target="_blank" rel="noopener noreferrer" className="ghost-pill" data-cursor="magnetic">
                  {c.link.label} <ArrowUpRight size={16} />
                </a>
              ) : (
                <span className="ghost-pill ghost-muted">Internal · confidential</span>
              )}
            </header>
            <div className="stk-grid">
              <div className="stk-col">
                <div className="stk-img stk-img-a"><Visual kind={c.visuals[0]} accent={c.accent} live /></div>
                <div className="stk-img stk-img-b"><Visual kind={c.visuals[1]} accent={c.accent} live /></div>
              </div>
              <div className="stk-img stk-img-c"><Visual kind={c.visuals[2]} accent={c.accent} live /></div>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}
