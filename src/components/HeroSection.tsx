import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RotatingRole from './RotatingRole';
import { PHOTOS, asset } from '../data/media';
import { reducedMotion } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExplore: () => void;
}

/**
 * Cinematic hero: full-bleed portrait. It opens in system blue, out of focus,
 * then pulls focus into the red portrait while the name rises in.
 */
export default function HeroSection({ onExplore }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const ctx = gsap.context(() => {
      const red = hero.querySelector('.hc-red');
      const media = hero.querySelector('.hc-media');
      if (reducedMotion) { gsap.set(red, { opacity: 1 }); return; }

      gsap.set(red, { opacity: 0 });
      gsap.set(media, { scale: 1.12, filter: 'blur(16px)' });
      gsap.set('.hc-line > span', { yPercent: 115 });
      gsap.set('.hc-fade', { autoAlpha: 0, y: 24 });

      const intro = gsap.timeline({ paused: true })
        .to(media, { scale: 1, filter: 'blur(0px)', duration: 2.2, ease: 'expo.out' }, 0)
        .to(red, { opacity: 1, duration: 1.4, ease: 'power2.inOut' }, 0.7)
        .to('.hc-line > span', { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.09 }, 0.35)
        .to('.hc-fade', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.8)
        .set(media, { clearProps: 'filter' });
      const play = () => intro.play();
      if ((window as unknown as { __vkLoaded?: boolean }).__vkLoaded) play();
      else window.addEventListener('vk:loaded', play, { once: true });

      // scroll-out: the portrait drifts and darkens, the copy lifts away
      gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 } })
        .to('.hc-media', { yPercent: 10, scale: 1.06, ease: 'none' }, 0)
        .to('.hc-dim', { opacity: 0.75, ease: 'none' }, 0)
        .to('.hc-content', { yPercent: -18, opacity: 0, ease: 'power1.in' }, 0);
    }, hero);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" data-depth="true" className="hero-cine" aria-label="Vijaya Kumar L">
      <div className="hc-media" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet={asset(PHOTOS.heroMobileBlue)} />
          <img className="hc-img hc-blue" src={asset(PHOTOS.shiftBlue)} alt="" fetchPriority="high" decoding="async" />
        </picture>
        <picture>
          <source media="(max-width: 767px)" srcSet={asset(PHOTOS.heroMobile)} />
          <img className="hc-img hc-red" src={asset(PHOTOS.shiftRed)} alt="" fetchPriority="high" decoding="async" />
        </picture>
      </div>
      <div className="hc-shade" aria-hidden="true" />
      <div className="hc-dim" aria-hidden="true" />

      <div className="hc-content">
        <p className="hc-eyebrow hc-fade">Lead — Application Engineering · CIEL HR · Bengaluru</p>
        <h1 className="hc-name" aria-label="Vijaya Kumar L">
          <span className="hc-line"><span>Vijaya</span></span>
          <span className="hc-line"><span>Kumar L</span></span>
        </h1>
        <div className="hc-role hc-fade"><RotatingRole /></div>
        <p className="hc-sub hc-fade">
          Seven years owning the whole system — hardware, networks, servers, web, cloud, automation, security and AI — as one continuous job.
        </p>
        <div className="hc-actions hc-fade">
          <button type="button" onClick={onExplore} data-cursor="magnetic" className="hc-btn hc-btn-solid">
            Explore the system <span aria-hidden="true">↓</span>
          </button>
          <a href="#flagship" data-cursor="magnetic" className="hc-btn lg">Flagship work</a>
        </div>
        <ul className="hc-pillars hc-fade" aria-label="What I do">
          <li><i className="b" />Build</li><li><i className="r" />Secure</li><li><i className="b" />Automate</li><li><i className="w" />Scale</li>
        </ul>
      </div>
    </section>
  );
}
