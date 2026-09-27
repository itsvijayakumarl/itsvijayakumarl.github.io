import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { reducedMotion } from '../lib/store';
import { TURN, asset } from '../data/media';
import SmokeVideo from './SmokeVideo';


const PHASES = ['Build', 'Secure', 'Automate', 'Scale'];
const TICKS = 72;
const COUNT_MS = 2600;
const MAX_WAIT_MS = 1600; // never wait longer than this for the chrome monogram to be ready

/**
 * "Ignition" — the opening hook. Plays fully on every visit (reduced-motion users skip it).
 * 1. bezel ticks sweep in  2. the liquid-chrome VK forms  3. the ring fills 000→100 while the
 * four pillars cycle  4. the monogram flies toward the camera, a light seam splits the screen
 * and the site opens. The page is scroll-locked until the hook has finished.
 */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [skip] = useState(() => reducedMotion);
  const [gone, setGone] = useState(skip);
  const [ready, setReady] = useState(false);
  const face = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const phase = useRef<HTMLSpanElement>(null);
  const arc = useRef<SVGCircleElement>(null);
  const done = useRef(false);

  // lock scrolling for the whole hook; always start the story from the top
  useEffect(() => {
    if (skip) return;
    window.scrollTo(0, 0);
    document.documentElement.classList.add('is-loading');
    window.dispatchEvent(new Event('vk:modal-open'));
    const t = setTimeout(() => setReady(true), MAX_WAIT_MS);
    for (let i = 0; i < TURN.count; i++) {
      const im = new Image();
      im.decoding = 'async';
      if (i === 0) im.onload = () => setReady(true);
      im.src = asset(`${TURN.dir}/${String(i + 1).padStart(4, '0')}.${TURN.ext}`);
      frames.current[i] = im;
    }
    return () => clearTimeout(t);
  }, [skip]);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      document.documentElement.classList.remove('is-loading');
      window.dispatchEvent(new Event('vk:modal-close'));
      onComplete();
    };
    if (skip) { finish(); return; }
    const r = root.current;
    if (!r || !ready) return;

    const ticks = r.querySelectorAll('.ig-tick');
    const len = 2 * Math.PI * 47;
    const state = { p: 0 };
    let lastPhase = -1;
    const fctx = face.current?.getContext('2d');
    let lastFrame = -1;
    const drawFace = (p: number) => {
      if (!fctx || !face.current) return;
      let k = Math.round(p * (TURN.count - 1));
      while (k >= 0 && !(frames.current[k]?.complete && frames.current[k].naturalWidth)) k--;
      if (k < 0 || k === lastFrame) return;
      lastFrame = k;
      const im = frames.current[k];
      const side = im.naturalWidth; // square crop from the top of the 4:5 frame
      fctx.drawImage(im, 0, Math.round(im.naturalHeight * 0.04), side, side, 0, 0, face.current.width, face.current.height);
    };
    drawFace(0);
    const render = () => {
      drawFace(state.p);
      const v = Math.round(state.p * 100);
      if (pct.current) pct.current.textContent = String(v).padStart(3, '0');
      if (arc.current) arc.current.style.strokeDashoffset = String(len * (1 - state.p));
      const lit = Math.floor(state.p * TICKS);
      ticks.forEach((t, i) => t.classList.toggle('on', i < lit));
      const ph = Math.min(PHASES.length - 1, Math.floor(state.p * PHASES.length));
      if (ph !== lastPhase && phase.current) {
        lastPhase = ph;
        gsap.fromTo(phase.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'expo.out' });
        phase.current.textContent = PHASES[ph];
      }
    };

    const tl = gsap.timeline();
    tl.set(r.querySelectorAll('[data-in]'), { opacity: 0 })
      .to(r.querySelectorAll('.ig-corner'), { opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.08 }, 0)
      .fromTo(ticks, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: { each: 0.008, from: 'start' } }, 0.1)
      .fromTo(r.querySelector('.ig-smoke'), { opacity: 0 }, { opacity: 0.9, duration: 1.6, ease: 'power2.out' }, 0.2)
      .fromTo(r.querySelector('.ig-mono'), { opacity: 0, scale: 0.9, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }, 0.35)
      .to(r.querySelectorAll('.ig-readout, .ig-phase-wrap'), { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.6)
      .to(state, { p: 1, duration: COUNT_MS / 1000, ease: 'power1.inOut', onUpdate: render }, 0.6)
      // completion: ring flares, monogram breathes, then flies through the camera
      .to(r.querySelector('.ig-ring'), { filter: 'drop-shadow(0 0 22px rgba(110,168,255,0.9))', duration: 0.35, ease: 'power2.out' })
      .to(r.querySelector('.ig-mono'), { scale: 1.04, duration: 0.35, ease: 'power2.out' }, '<')
      .to(r.querySelectorAll('.ig-corner, .ig-readout, .ig-phase-wrap, .ig-bezel, .ig-ring, .ig-smoke'), { opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.15')
      .to(r.querySelector('.ig-mono'), { scale: 7, opacity: 0, duration: 0.9, ease: 'expo.in' }, '<')
      .to(r.querySelector('.loader-seam'), { scaleX: 1, duration: 0.45, ease: 'expo.inOut' }, '-=0.35')
      .add(finish)
      .to(r.querySelector('.loader-half.top'), { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '+=0.02')
      .to(r.querySelector('.loader-half.bottom'), { yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, '<')
      .to(r.querySelector('.loader-seam'), { opacity: 0, duration: 0.5 }, '<0.35')
      .add(() => setGone(true));
    return () => { tl.kill(); };
  }, [skip, ready, onComplete]);

  if (gone) return null;
  return (
    <div ref={root} className="loader" role="progressbar" aria-label="Loading portfolio" aria-valuemin={0} aria-valuemax={100}>
      <div className="loader-half top" />
      <div className="loader-half bottom" />
      <div className="loader-seam" />
      <SmokeVideo color="blue" eager className="ig-smoke" />

      <div className="ig-corner ig-tl" data-in>Vijaya Kumar L</div>
      <div className="ig-corner ig-tr" data-in>Portfolio — 2026</div>
      <div className="ig-corner ig-bl" data-in>Bengaluru, IN · 12.97° N 77.59° E</div>
      <div className="ig-corner ig-br" data-in>Lead — Application Engineering</div>

      <div className="ig-stage">
        <svg className="ig-bezel" viewBox="0 0 100 100" aria-hidden="true">
          {Array.from({ length: TICKS }, (_, i) => {
            const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
            const major = i % 6 === 0;
            const r1 = major ? 44.2 : 45.2, r2 = 47.6;
            return <line key={i} className={`ig-tick ${major ? 'major' : ''}`} x1={50 + Math.cos(a) * r1} y1={50 + Math.sin(a) * r1} x2={50 + Math.cos(a) * r2} y2={50 + Math.sin(a) * r2} />;
          })}
        </svg>
        <svg className="ig-ring" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="ig-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.5" stopColor="#8ab8ff" />
              <stop offset="1" stopColor="#2f7bff" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="47" className="ig-track" />
          <circle ref={arc} cx="50" cy="50" r="47" className="ig-arc" style={{ strokeDasharray: 2 * Math.PI * 47, strokeDashoffset: 2 * Math.PI * 47 }} />
        </svg>
        <div className="ig-mono-pos">
          <div className="ig-mono" data-in>
            <canvas ref={face} className="ig-face" width={560} height={560} role="img" aria-label="Vijaya turning toward the camera" />
          </div>
        </div>
        <div className="ig-readout" data-in>
          <span ref={pct}>000</span><sup>%</sup>
        </div>
      </div>

      <div className="ig-phase-wrap" data-in>
        <span className="ig-phase-label">Initialising</span>
        <span className="ig-phase-mask"><span ref={phase} className="ig-phase serif-shine">Build</span></span>
      </div>
    </div>
  );
}
