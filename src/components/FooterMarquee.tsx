import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { reducedMotion } from '../lib/store';

export default function FooterMarquee() {
  const t = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!t.current || reducedMotion) return;
    const tw = gsap.to(t.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
    return () => { tw.kill(); };
  }, []);
  return (
    <div className="fmarquee" aria-hidden="true">
      <div ref={t} className="fmarquee-track">
        {Array.from({ length: 12 }, (_, i) => <span key={i}>Building systems that should exist <i>•</i></span>)}
      </div>
    </div>
  );
}
