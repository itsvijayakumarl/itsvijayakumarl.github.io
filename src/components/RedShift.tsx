import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHOTOS, asset } from '../data/media';
import { reducedMotion, world } from '../lib/store';
import SmokeVideo from './SmokeVideo';

gsap.registerPlugin(ScrollTrigger);

/** Pinned full-bleed wipe from calm blue to alert red — the doorway into the Security chapter. */
export default function RedShift() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (reducedMotion) { el.classList.add('hot'); return; }
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: el, start: 'top top', end: '+=120%', pin: true, scrub: 0.6,
          onUpdate: (st) => {
            const hot = st.progress > 0.5;
            el.classList.toggle('hot', hot);
            world.security = hot ? 1 : 0;
          },
        },
      })
        .to('.rs-red', { clipPath: 'inset(0 0 0 0%)', ease: 'none' }, 0)
        .to('.rs-line', { left: '0%', ease: 'none' }, 0)
        .to('.rs-line', { opacity: 0, duration: 0.1 }, 0.9);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="redshift" ref={root} className="red-shift" aria-label="Red shift">
      <div className="rs-frame">
        {/* each photo sits on its own looping smoke; the red layer is wiped in over the blue one */}
        <div className="rs-layer">
          <SmokeVideo color="blue" />
          <img className="rs-img" src={asset(PHOTOS.heroBlue)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
        <div className="rs-layer rs-red">
          <SmokeVideo color="red" />
          <img className="rs-img" src={asset(PHOTOS.heroRed)} alt="Vijaya Kumar L in red light" loading="lazy" decoding="async" />
        </div>
        <span className="rs-line" aria-hidden="true" />
      </div>
      <div className="rs-copy">
        <h2 data-no-reveal>Calm by design. <span className="rs-late">Red when it matters.</span></h2>
        <p>30,000+ attack attempts blocked every month across nine company domains — and a lead who turns red the moment something tries.</p>
      </div>
    </section>
  );
}
