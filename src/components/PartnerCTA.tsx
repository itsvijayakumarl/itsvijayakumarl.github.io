import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PHOTOS, asset } from '../data/media';
import { reducedMotion } from '../lib/store';
import SmokeVideo from './SmokeVideo';

/** Closing call to action — same cinematic language as Red shift: portrait right, words left. */
export default function PartnerCTA({ onContact }: { onContact: () => void }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cc-photo', { xPercent: 8, scale: 1.08, filter: 'blur(10px)', opacity: 0.2 }, {
        xPercent: 0, scale: 1, filter: 'blur(0px)', opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 25%', scrub: 0.6 },
      });
      gsap.from('.cc-rise', { y: 40, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 60%', once: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="cta-cine" aria-label="Work with me">
      <div className="cc-photo" aria-hidden="true">
        <SmokeVideo color="red" />
        <img className="cc-portrait" src={asset(PHOTOS.contact)} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="cc-glow" aria-hidden="true" />
      <div className="cc-copy">
        <p className="cc-eyebrow cc-rise">Open to the right conversations</p>
        <h2 className="cc-title cc-rise" data-no-reveal>
          Got a system that needs
          <span className="cc-accent">building, securing or automating?</span>
        </h2>
        <p className="cc-sub cc-rise">Architecture roles, security reviews, automation builds — or a system that simply needs an owner.</p>
        <div className="cc-actions cc-rise">
          <button type="button" onClick={onContact} className="cc-btn" data-cursor="magnetic">Start a conversation <span aria-hidden="true">→</span></button>
          <a href="mailto:risewithvj@gmail.com" className="cc-mail">risewithvj@gmail.com</a>
        </div>
      </div>
    </section>
  );
}
