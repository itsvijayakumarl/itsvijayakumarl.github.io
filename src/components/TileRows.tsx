import { useEffect, useRef } from 'react';
import Visual, { type VisualKind } from './Visual';
import { reducedMotion } from '../lib/store';

const ROW1: [VisualKind, string, 'blue' | 'red' | 'amber'][] = [
  ['radar', 'SECURITY OPS', 'red'], ['flow', 'LEADFLOW CRM', 'blue'], ['gauges', 'AIRADAR', 'blue'], ['grid', 'AI PROMPTS', 'amber'],
  ['bars', 'IVR REPORTS', 'blue'], ['terminal', 'DOCKER + N8N', 'blue'], ['shield', '7 VAPT ENGAGEMENTS', 'red'],
];
const ROW2: [VisualKind, string, 'blue' | 'red' | 'amber'][] = [
  ['globe', '9 DOMAINS · ONE EDGE', 'blue'], ['bars', 'SALESIQ REPORTS', 'blue'], ['grid', 'PRESSRISE PLUGIN', 'amber'], ['flow', 'ZOHO → CRM → SLACK', 'blue'],
  ['terminal', 'NEONDB → POSTGRES', 'blue'], ['radar', '30,000+ BLOCKED / MO', 'red'], ['globe', '390+ SEO PAGES', 'blue'],
];

/** Two rows of project tiles that slide in opposite directions as you scroll. */
export default function TileRows() {
  const root = useRef<HTMLElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = root.current;
      if (!el || !r1.current || !r2.current) return;
      const top = el.getBoundingClientRect().top;
      const offset = (window.innerHeight - top) * 0.3;
      r1.current.style.transform = `translate3d(${offset - 400}px,0,0)`;
      r2.current.style.transform = `translate3d(${-(offset - 400)}px,0,0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const row = (items: typeof ROW1) => [...items, ...items, ...items].map(([k, label, acc], i) => (
    <div className="tile" key={i}><Visual kind={k} accent={acc} label={label} /></div>
  ));

  return (
    <section ref={root} className="tiles" aria-hidden="true">
      <div ref={r1} className="tile-row">{row(ROW1)}</div>
      <div ref={r2} className="tile-row">{row(ROW2)}</div>
    </section>
  );
}
