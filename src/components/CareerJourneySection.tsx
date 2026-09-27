import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAREER_JOURNEY } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function CareerJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Horizontal scroll-jacked timeline on desktop
      const totalScroll = track.scrollWidth - track.clientWidth;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${totalScroll + 200}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      data-depth="true"
      className="relative min-h-screen lg:h-[100svh] py-24 lg:py-0 lg:pt-[72px] px-6 lg:px-12 z-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="section-content max-w-7xl w-full mx-auto space-y-8 lg:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="eyebrow-label text-[#5C5C66] mb-2 flex items-center gap-3">
              <span className="text-[#2F7BFF]">05 / EVOLUTION</span>
              <span className="text-white/20">/</span>
              <span>THE ENGINEERING TRAJECTORY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-none">
              From support
              <span className="h-accent text-[#6EA8FF]">to systems.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="font-serif-italic text-2xl text-[#F5F5F2]">
              &ldquo;I kept moving up <span className="text-[#2F7BFF]">the stack.</span>&rdquo;
            </p>
            <p className="text-sm text-[#A1A1AA] font-light leading-relaxed">
              Every step expanded what I could own, diagnose, automate, and protect—from motherboard silicon to distributed AI telemetry.
            </p>
          </div>
        </div>

        {/* Horizontal Track for Desktop / Vertical for Mobile */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 overflow-visible"
        >
          {CAREER_JOURNEY.map((item, idx) => (
            <div
              key={idx}
              className="obsidian-card w-full lg:w-[360px] shrink-0 flex flex-col justify-between space-y-5 relative group"
            >
              <div className="space-y-4">
                {/* Year & Layer Eyebrow */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#2F7BFF] font-bold">{item.year}</span>
                  <span className="text-[#5C5C66] uppercase tracking-wider text-[11px]">
                    0{idx + 1} // {item.layer.split(' ')[0]}
                  </span>
                </div>

                {/* Company & Role */}
                <div>
                  <span className="text-[#A1A1AA] text-xs font-mono block mb-1">
                    {item.company}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F5F5F2] tracking-tight group-hover:text-[#6EA8FF] transition-colors">
                    {item.role}
                  </h3>
                </div>

                {/* Detail */}
                <p className="text-[13px] xl:text-sm text-[#A1A1AA] font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Highlight Callout */}
              <div className="pt-4 border-t border-white/5">
                <span className="font-mono text-[10px] text-[#5C5C66] uppercase tracking-wider block mb-1">
                  CRITICAL MILESTONE
                </span>
                <p className="text-xs font-mono text-[#F5F5F2] leading-snug">
                  {item.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
