import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMPACT_METRICS, VALUE_BREAKDOWN, CERTIFICATIONS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactSection() {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const counters = countersRef.current;
    if (!section || !counters) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Counter trigger when 50% visible
      ScrollTrigger.create({
        trigger: counters,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          const countElements = counters.querySelectorAll('.stat-count');
          countElements.forEach((el) => {
            const rawTarget = el.getAttribute('data-target') || '0';
            // split "₹21.04L+" → prefix "₹", number "21.04", suffix "L+"
            const m = rawTarget.match(/^([^0-9]*)([0-9][0-9,]*\.?[0-9]*)(.*)$/);
            if (!m || prefersReducedMotion) { el.textContent = rawTarget; return; }
            const [, prefix, numStr, suffix] = m;
            const num = parseFloat(numStr.replace(/,/g, ''));
            const decimals = (numStr.split('.')[1] || '').length;
            const useCommas = numStr.includes(',');
            const counterObj = { val: 0 };
            gsap.to(counterObj, {
              val: num,
              duration: 2,
              ease: 'expo.out',
              onUpdate: () => {
                const v = decimals ? counterObj.val.toFixed(decimals) : Math.round(counterObj.val).toString();
                el.textContent = prefix + (useCommas ? Number(v).toLocaleString('en-IN') : v) + suffix;
              },
              onComplete: () => { el.textContent = rawTarget; },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      data-depth="true"
      className="relative min-h-screen py-28 px-6 lg:px-12 z-20 flex flex-col justify-center"
    >
      <div className="section-content max-w-7xl w-full mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="eyebrow-label text-[#5C5C66] mb-2 flex items-center gap-3">
              <span className="text-[#2F7BFF]">06 / IMPACT</span>
              <span className="text-white/20">/</span>
              <span>AUDITED PRODUCTION METRICS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-none">
              Verified <span className="h-accent text-[#6EA8FF]">impact.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed">
            Quantifiable outcomes across multi-domain infrastructure consolidation, enterprise security posture, 
            organic crawl scale, and operational automation.
          </p>
        </div>

        {/* Tabular Mono Counters (Apple Pro spec sheet style) */}
        <div ref={countersRef} className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 md:gap-x-8 gap-y-8 md:gap-y-12">
          {IMPACT_METRICS.map((item, idx) => {
            const isMoney = item.value.includes('₹');
            return (
              <div
                data-card data-tilt key={idx}
                className="space-y-3 border-b border-white/10 pb-6 group"
              >
                {/* Tabular Mono Number */}
                <div
                  className={`text-[1.75rem] sm:text-5xl md:text-6xl lg:text-[clamp(2.4rem,4.1vw,4.2rem)] font-mono font-bold tracking-tight tabular-nums leading-none ${
                    isMoney ? 'text-[#F5B83D]' : 'text-[#F5F5F2]'
                  }`}
                >
                  <span className="stat-count" data-target={item.value}>
                    {item.value}
                  </span>
                </div>

                {/* Metric Label */}
                <div className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#2F7BFF]">
                  {item.label}
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-[#A1A1AA] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Financial Transparency Box with Expandable Ledger */}
        <div className="obsidian-card space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="eyebrow-label text-[#F5B83D] block mb-1">
                VALUE CREATION & COST REDUCTION
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F5F2] tracking-tight">
                Direct Cost Elimination Ledger
              </h3>
              <p className="text-sm text-[#A1A1AA] font-light mt-1">
                Replacing commercial middleware licenses and cloud bloat with custom high-availability engineering.
              </p>
            </div>

            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              data-cursor="magnetic"
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F5F5F2] transition-colors flex items-center gap-2"
            >
              <span>{showBreakdown ? 'Hide Value Breakdown' : 'Expand Value Breakdown'}</span>
              <span>{showBreakdown ? '↑' : '↓'}</span>
            </button>
          </div>

          <AnimatePresence>
            {showBreakdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden space-y-4 pt-4 border-t border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {VALUE_BREAKDOWN.map((b, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2"
                    >
                      <div className="font-mono text-base font-bold text-[#F5B83D] tabular-nums">
                        {b.value}
                      </div>
                      <div className="text-xs font-display font-semibold text-[#F5F5F2]">
                        {b.item}
                      </div>
                      <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                        {b.type}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Industry Certifications */}
        <div className="space-y-4">
          <div className="eyebrow-label text-[#5C5C66]">
            VERIFIED INDUSTRY CERTIFICATIONS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                data-card data-tilt key={idx}
                className="p-5 rounded-2xl bg-[#07080B] border border-white/10 space-y-1.5"
              >
                <div className="text-xs font-mono text-[#2F7BFF] font-semibold">
                  {cert.issuer}
                </div>
                <div className="text-sm font-display font-bold text-[#F5F5F2]">
                  {cert.title}
                </div>
                <div className="text-xs font-mono text-[#5C5C66]">
                  {cert.area}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
