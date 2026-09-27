import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SystemHookSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const systemRevealRef = useRef<HTMLDivElement>(null);

  const hookWords = [
    "I",
    "DIDN'T",
    "LEARN",
    "ONE",
    "LAYER",
    "OF",
    "TECHNOLOGY."
  ];

  useEffect(() => {
    const trigger = triggerRef.current;
    const pinSection = pinSectionRef.current;
    const wordsContainer = wordsContainerRef.current;
    const systemReveal = systemRevealRef.current;

    if (!trigger || !pinSection) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const wordSpans = wordsContainer ? wordsContainer.querySelectorAll('.hook-word') : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // 1. Words light up one by one on scrub (grey -> white)
      if (wordSpans.length > 0) {
        tl.to(wordSpans, {
          color: '#F5F5F2',
          opacity: 1,
          stagger: 0.25,
          ease: 'power1.inOut',
        });
      }

      // 2. Phase 1 words fade and scale out slightly
      tl.to(
        wordsContainer,
        {
          opacity: 0,
          scale: 0.88,
          filter: 'blur(8px)',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '+=0.2'
      );

      // 3. "I LEARNED THE SYSTEM" snaps in with Instrument Serif italic on "the system"
      tl.fromTo(
        systemReveal,
        {
          opacity: 0,
          scale: 0.7,
          filter: 'blur(12px)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} id="hook" className="relative w-full overflow-hidden z-20">
      <section
        ref={pinSectionRef}
        data-depth="true"
        className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden select-none"
      >
        {/* Subtle Overhead Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#2F7BFF]/15 via-[#0A3DFF]/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

        {/* Phase 1: Words Light Up One by One on Scrub */}
        <div
          ref={wordsContainerRef}
          className="section-content absolute inset-0 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 pointer-events-none"
        >
          <div className="eyebrow-label text-[#5C5C66] mb-8">
            02 / THE PRINCIPLE
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7 gap-y-2 sm:gap-y-4">
            {hookWords.map((word, idx) => (
              <span
                key={idx}
                className={`hook-word text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight transition-colors duration-150 ${
                  word === 'ONE' || word === 'LAYER'
                    ? 'text-[#5C5C66] opacity-30 font-black'
                    : 'text-[#5C5C66] opacity-30'
                }`}
              >
                {word}
              </span>
            ))}
          </div>

          <div className="mt-8 font-mono text-xs tracking-[0.18em] text-[#5C5C66] uppercase">
            SCROLL TO DECRYPT ARCHITECTURE
          </div>
        </div>

        {/* Phase 2: "I LEARNED THE SYSTEM" Snap In */}
        <div
          ref={systemRevealRef}
          className="section-content relative z-10 flex flex-col items-center text-center space-y-6 max-w-5xl mx-auto pointer-events-auto opacity-0"
        >
          <div className="eyebrow-label text-[#2F7BFF] uppercase tracking-[0.2em]">
            THE FOUNDATIONAL PHILOSOPHY
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter leading-[0.92] text-[#F5F5F2]">
            I LEARNED <br />
            <span className="font-serif-italic text-[#6EA8FF] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-normal">
              the system.
            </span>
          </h2>

          <p className="max-w-xl text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed pt-2">
            When hardware crashes, networks drop packets, databases deadlock, and edges undergo attack, 
            the real engineer doesn&apos;t blame another silo. They know the entire machine.
          </p>

          <div className="pt-4 flex items-center gap-3 font-mono text-xs text-[#2F7BFF]">
            <span className="w-2 h-2 rounded-full bg-[#2F7BFF] animate-pulse" />
            <span>HARDWARE → NETWORKS → SERVERS → WEB → CLOUD → AUTOMATION → SECURITY → AI</span>
          </div>
        </div>
      </section>
    </div>
  );
}
