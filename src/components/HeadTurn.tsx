import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TURN, TURN_WIDE, asset } from '../data/media';
import { reducedMotion, world } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['Build', 'Secure', 'Automate', 'Scale'];
type Seq = typeof TURN_WIDE;

/** Landscape screens get the wide 16:9 turn; narrow/portrait screens keep the 4:5 portrait turn. */
const pickSeq = (): Seq => (window.innerWidth >= 768 && window.innerWidth / window.innerHeight >= 1 ? TURN_WIDE : TURN);

/**
 * Full-screen, pinned scene: scrolling scrubs the head turn frame by frame.
 * The frames are drawn edge to edge and dissolve into the black page; the four pillars light up in turn
 * (and the background haze turns red on "Secure").
 */
export default function HeadTurn() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const total = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const section = root.current;
    if (!c || !section) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    let seq = pickSeq();
    let frames: HTMLImageElement[] = [];
    let current = -1;
    let progress = reducedMotion ? 1 : 0;
    let wanted = false;

    const src = (s: Seq, i: number) => asset(`${s.dir}/${String(i + 1).padStart(4, '0')}.${s.ext}`);
    const target = () => Math.round(progress * (seq.count - 1));

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
      current = -1;
    };

    const draw = (k: number) => {
      // nearest loaded frame at or before k, so scrubbing never shows a blank canvas
      let i = k;
      while (i >= 0 && !(frames[i]?.complete && frames[i].naturalWidth)) i--;
      if (i < 0 || i === current) return;
      current = i;
      const im = frames[i];
      const W = c.width, H = c.height, iw = im.naturalWidth, ih = im.naturalHeight;
      // wide: cover the whole screen; portrait (phones): full width, centred, edges melt away via CSS mask
      const s = seq === TURN_WIDE ? Math.max(W / iw, H / ih) : Math.max(W / iw, (H * 0.62) / ih);
      const dw = iw * s, dh = ih * s;
      const dx = (W - dw) / 2;
      const dy = seq === TURN_WIDE ? Math.min(0, (H - dh) * 0.3) : (H - dh) / 2;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      ctx.drawImage(im, dx, dy, dw, dh);
    };

    const load = () => {
      wanted = true;
      if (frames.length) return;
      const s = seq;
      frames = Array.from({ length: s.count }, (_, i) => {
        const im = new Image();
        im.decoding = 'async';
        im.onload = () => { if (s === seq && i <= target()) draw(target()); };
        im.src = src(s, i);
        return im;
      });
      if (total.current) total.current.textContent = String(s.count);
    };

    const onResize = () => {
      const next = pickSeq();
      if (next !== seq) { seq = next; frames = []; if (wanted) load(); }
      size();
      draw(target());
    };
    size();
    window.addEventListener('resize', onResize);

    // start loading when the scene is a couple of screens away
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { load(); io.disconnect(); } }, { rootMargin: '200% 0px' });
    io.observe(section);

    const words = section.querySelectorAll<HTMLElement>('.ht-word');
    const setWord = (p: number) => {
      const idx = Math.min(WORDS.length - 1, Math.floor(p * WORDS.length));
      words.forEach((w, i) => w.classList.toggle('on', i === idx));
      world.tint = [0, 1, 0, 0.45][idx];
    };

    if (reducedMotion) {
      // still version: the finished turn (looking at the camera), all four words visible
      load();
      words.forEach((w) => w.classList.add('on'));
      if (counter.current) counter.current.textContent = String(seq.count).padStart(2, '0');
      return () => { io.disconnect(); window.removeEventListener('resize', onResize); };
    }

    words[0]?.classList.add('on'); // 'Build' is lit before the first scroll update
    const ctxGsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: true,
        onLeave: () => { world.tint = 0; },
        onLeaveBack: () => { world.tint = 0; },
        onUpdate: (st) => {
          load();
          progress = st.progress;
          const k = target();
          draw(k);
          setWord(st.progress);
          if (counter.current) counter.current.textContent = String(k + 1).padStart(2, '0');
        },
      });
      gsap.from(section.querySelectorAll('.ht-copy'), { autoAlpha: 0, y: 24, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
    }, section);

    return () => { ctxGsap.revert(); io.disconnect(); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section id="turn" ref={root} className="head-turn" aria-label="Build, secure, automate, scale">
      <div className="ht-stage">
        <canvas ref={canvas} role="img" aria-label="Vijaya turning toward the camera" />
      </div>
      <div className="ht-words ht-copy" aria-hidden="true">
        {WORDS.map((w, i) => <span key={w} className={`ht-word ${i === 1 ? 'is-red' : ''}`}>{w}</span>)}
      </div>
      <p className="ht-note ht-copy">Scroll to turn. <em>Every layer of the stack</em> — one person who owns it end to end.</p>
      <div className="ht-read ht-copy" aria-hidden="true">frame <span ref={counter}>01</span> / <span ref={total}>{pickSeq().count}</span></div>
    </section>
  );
}
