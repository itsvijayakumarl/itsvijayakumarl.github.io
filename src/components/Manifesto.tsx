import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, ShieldCheck, Workflow, Cloud } from 'lucide-react';
import { reducedMotion } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  'It started on a repair bench, fixing laptops. Today I lead application engineering at CIEL HR — nine company domains on one edge, 30,000+ attacks blocked every month, 11+ platforms built and still running. When something breaks, I don’t hand it off. I follow it all the way down.';

const ORBS = [
  { Icon: Cpu, cls: 'orb-tl', from: -120, label: 'Hardware' },
  { Icon: ShieldCheck, cls: 'orb-tr', from: 120, label: 'Security' },
  { Icon: Workflow, cls: 'orb-bl', from: -120, label: 'Automation' },
  { Icon: Cloud, cls: 'orb-br', from: 120, label: 'Cloud' },
];

/** Scroll-painted manifesto: every character brightens from 15% to 100% as you read. */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = para.current?.querySelectorAll('.mch');
      if (chars && !reducedMotion) {
        gsap.fromTo(chars, { opacity: 0.14 }, {
          opacity: 1, ease: 'none', stagger: 0.02,
          scrollTrigger: { trigger: para.current, start: 'top 80%', end: 'bottom 35%', scrub: 0.4 },
        });
      }
      if (!reducedMotion) {
        gsap.utils.toArray<HTMLElement>('.orb').forEach((orb) => {
          const from = Number(orb.dataset.from);
          gsap.fromTo(orb, { x: from, autoAlpha: 0, rotate: from > 0 ? 25 : -25 }, {
            x: 0, autoAlpha: 1, rotate: 0, duration: 1.1, ease: 'expo.out',
            scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
          });
          gsap.to(orb, { yPercent: from > 0 ? -40 : 40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  // keep words intact so lines never break mid-word
  const words = TEXT.split(' ');
  return (
    <section id="manifesto" ref={root} className="manifesto" aria-label="The short version">
      {ORBS.map(({ Icon, cls, from, label }) => (
        <div key={cls} className={`orb ${cls}`} data-from={from} aria-hidden="true">
          <div className="orb-core"><Icon strokeWidth={1.3} /></div>
          <span>{label}</span>
        </div>
      ))}
      <div className="manifesto-inner">
        <h2 className="manifesto-title" data-no-reveal>Seven years. Eight layers. <span className="h-accent text-[#6EA8FF]">One owner.</span></h2>
        <p ref={para} className="manifesto-text" aria-label={TEXT}>
          {words.map((w, wi) => (
            <span key={wi} className="mword" aria-hidden="true">
              {w.split('').map((c, ci) => <span key={ci} className="mch">{c}</span>)}
              {wi < words.length - 1 ? <span className="mch">&nbsp;</span> : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
