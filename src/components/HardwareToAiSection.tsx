import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SYSTEM_LAYERS } from '../data/portfolioData';
import { world } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

const SEC = 6;

export default function HardwareToAiSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const idxRef = useRef(0);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [desktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1024);

  const selectLayer = (index: number) => {
    world.layer = index;
    world.security = index === SEC ? 1 : 0;
    if (index !== idxRef.current) {
      idxRef.current = index;
      setCurrentIdx(index);
    }
  };

  const totalLayers = SYSTEM_LAYERS.length;

  /** Clicking a plate scrolls the pinned story to that layer (so scroll and click never fight). */
  const goToLayer = (index: number) => {
    const st = stRef.current;
    if (!st) { selectLayer(index); return; }
    const y = st.start + ((index + 0.5) / totalLayers) * (st.end - st.start);
    window.dispatchEvent(new CustomEvent('vk:scrollto', { detail: y }));
  };

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    if (!desktop) {
      // phones & tablets: no pinning — each layer is its own readable card; the 3D field still follows
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.layer-m').forEach((el, i) => {
          ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 40%', onToggle: (st) => { if (st.isActive) { world.layer = i; world.security = i === SEC ? 1 : 0; } } });
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        });
        ScrollTrigger.create({ trigger: trigger, start: 'top bottom', end: 'bottom top', onLeave: () => { world.layer = -1; world.security = 0; }, onLeaveBack: () => { world.layer = -1; world.security = 0; } });
      }, triggerRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: trigger,
        start: 'top top',
        end: `+=${totalLayers * 65}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          selectLayer(Math.min(totalLayers - 1, Math.floor(self.progress * totalLayers)));
        },
        onEnter: () => selectLayer(idxRef.current),
        onEnterBack: () => selectLayer(idxRef.current),
        onLeave: () => { world.layer = -1; world.security = 0; },
        onLeaveBack: () => { world.layer = -1; world.security = 0; },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [totalLayers, desktop]);

  // cinematic crossfade of the description whenever the layer changes
  useEffect(() => {
    const el = copyRef.current;
    if (!el || !desktop || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = el.querySelectorAll('[data-swap]');
    gsap.fromTo(items, { autoAlpha: 0, y: 28, filter: 'blur(6px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'expo.out', stagger: 0.06, overwrite: true, clearProps: 'filter' });
  }, [currentIdx, desktop]);

  const activeLayer = SYSTEM_LAYERS[currentIdx];

  if (!desktop) {
    return (
      <section id="layers" ref={triggerRef} className="relative z-20 px-5 sm:px-8 py-20">
        <div className="section-content max-w-2xl mx-auto">
          <p className="eyebrow-label text-[#5C5C66] mb-3">03 / The 8-layer continuum</p>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#F5F5F2] leading-[1.05] mb-10" data-no-reveal>
            Eight layers, <span className="font-serif-italic text-[#8ab8ff]">learned bottom-up.</span>
          </h2>
          <div className="space-y-4">
            {SYSTEM_LAYERS.map((layer, i) => {
              const sec = i === SEC;
              return (
                <article key={layer.id} className={`layer-m ${sec ? 'is-security' : ''}`}>
                  <header className="flex items-baseline justify-between gap-3">
                    <span className={`font-mono text-xs font-bold ${sec ? 'text-[#FF6B6B]' : 'text-[#6EA8FF]'}`}>LAYER {layer.number}</span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#5C5C66] text-right">{layer.role}</span>
                  </header>
                  <h3 className={`mt-3 text-3xl font-display font-extrabold tracking-tight ${sec ? 'text-[#FF2A1F]' : 'text-[#F5F5F2]'}`}>{layer.name}</h3>
                  <p className={`mt-1 text-sm font-medium ${sec ? 'text-[#FF8A8A]' : 'text-[#8ab8ff]'}`}>{layer.subtitle}</p>
                  <p className="mt-3 text-[15px] text-[#A1A1AA] font-light leading-relaxed">{layer.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {layer.artifacts.map((a) => <span key={a} className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 font-mono text-[11px] text-[#d7e2ea]">{a}</span>)}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={triggerRef} id="layers" className="relative w-full z-20">
      <section
        data-depth="true"
        className="relative h-screen w-full flex flex-col justify-center px-6 lg:px-12 select-none overflow-hidden"
      >
        <div className="section-content max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Exploded 3D Architectural Stack Diagram (CSS 3D perspective 1600px, plates rotated X 60deg) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col items-center justify-center [perspective:1600px]">
            <div className="eyebrow-label text-[#5C5C66] mb-4 self-start">
              03 / THE 8-LAYER CONTINUUM
            </div>

            <div className="layer-stack" role="tablist" aria-label="The eight layers">
              {[...SYSTEM_LAYERS].map((layer, idx) => ({ layer, idx })).reverse().map(({ layer, idx }) => {
                const isActive = idx === currentIdx;
                const isPassed = idx < currentIdx;
                const isSecurity = idx === 6;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => goToLayer(idx)}
                    className={`layer-plate ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''} ${isSecurity ? 'is-security' : ''}`}
                  >
                    <span className="lp-num">{layer.number}</span>
                    <span className="lp-name">{layer.name}</span>
                    <span className="lp-role">{layer.role.split(' ')[0]}</span>
                    <span className="lp-dot" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div className="font-mono text-[11px] text-[#5C5C66] tracking-[0.18em] uppercase mt-2">
              ACTIVE LAYER {activeLayer.number} / 08 · SCROLL TO ELEVATE
            </div>
          </div>

          {/* Right Column: Active Layer Description Crossfade */}
          <div ref={copyRef} className="lg:col-span-6 space-y-6">
            <div className="space-y-3" data-swap>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span
                  className={`font-bold ${
                    currentIdx === 6 ? 'text-[#FF2A1F]' : 'text-[#2F7BFF]'
                  }`}
                >
                  LAYER {activeLayer.number}
                </span>
                <span className="text-white/20">/</span>
                <span className="text-[#A1A1AA] uppercase tracking-widest text-[11px]">
                  {activeLayer.role}
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#F5F5F2] leading-none">
                {activeLayer.name}
              </h2>

              <p className="text-lg text-[#6EA8FF] font-medium leading-snug">
                {activeLayer.subtitle}
              </p>
            </div>

            <p data-swap className="text-base text-[#A1A1AA] font-light leading-relaxed">
              {activeLayer.description}
            </p>

            {/* Artifacts & Production Deliverables */}
            <div className="space-y-3 pt-2" data-swap>
              <span className="font-mono text-[11px] text-[#5C5C66] uppercase tracking-[0.18em] block">
                PRODUCTION ARTIFACTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeLayer.artifacts.map((artifact, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#07080B] border border-white/10 text-xs font-mono text-[#F5F5F2] flex items-center gap-2"
                  >
                    <span
                      className={`text-xs ${
                        currentIdx === 6 ? 'text-[#FF2A1F]' : 'text-[#2F7BFF]'
                      }`}
                    >
                      ↳
                    </span>
                    <span className="truncate">{artifact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Mindset Callout */}
            <div
              className={`p-5 rounded-2xl border transition-colors ${
                currentIdx === 6
                  ? 'bg-[#B3001B]/10 border-[#FF2A1F]/30 text-[#F5F5F2]'
                  : 'bg-[#0E1016] border-white/10 text-[#A1A1AA]'
              }`}
            >
              <div
                className={`font-mono text-[10px] tracking-wider uppercase mb-1 font-semibold ${
                  currentIdx === 6 ? 'text-[#FF2A1F]' : 'text-[#2F7BFF]'
                }`}
              >
                SYSTEM PERSPECTIVE
              </div>
              <p className="text-sm font-light italic leading-relaxed text-[#F5F5F2]">
                &ldquo;{activeLayer.mindset}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
