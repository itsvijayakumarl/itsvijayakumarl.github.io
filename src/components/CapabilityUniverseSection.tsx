import { useState } from 'react';
import { CAPABILITY_CONSTELLATION } from '../data/portfolioData';

type PillarType = 'ALL' | 'BUILD' | 'SECURE' | 'AUTOMATE' | 'SCALE';

export default function CapabilityUniverseSection() {
  const [activePillar, setActivePillar] = useState<PillarType>('ALL');

  const pillars: PillarType[] = ['ALL', 'BUILD', 'SECURE', 'AUTOMATE', 'SCALE'];

  return (
    <section
      id="capabilities"
      data-depth="true"
      className="relative min-h-screen py-28 px-6 lg:px-12 z-20 flex flex-col justify-center"
    >
      <div className="section-content max-w-7xl w-full mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="eyebrow-label text-[#5C5C66] mb-2 flex items-center gap-3">
              <span className="text-[#2F7BFF]">13 / CAPABILITY</span>
              <span className="text-white/20">/</span>
              <span>THE 4-PILLAR CONSTELLATION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-none">
              Capability <span className="h-accent text-[#6EA8FF]">universe.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed">
            Skills are not isolated checkboxes or logos on a resume. Every tool connects directly to the layers 
            above and below it.
          </p>
        </div>

        {/* 4 Pillars Interactive Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-[#5C5C66] uppercase tracking-wider mr-2">
            Filter Pillar:
          </span>
          {pillars.map((pillar) => {
            const isSelected = activePillar === pillar;
            let activeColor = 'bg-[#2F7BFF] text-white';
            if (pillar === 'SECURE') activeColor = 'bg-[#FF2A1F] text-white';
            if (pillar === 'AUTOMATE') activeColor = 'bg-[#6EA8FF] text-black font-semibold';
            if (pillar === 'SCALE') activeColor = 'bg-white text-black font-semibold';

            return (
              <button
                key={pillar}
                onClick={() => setActivePillar(pillar)}
                onMouseEnter={() => setActivePillar(pillar)}
                data-cursor="magnetic"
                className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
                  isSelected
                    ? activeColor + ' shadow-lg scale-105'
                    : 'bg-[#07080B] text-[#A1A1AA] border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {pillar}
              </button>
            );
          })}
        </div>

        {/* Constellation Orbiting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITY_CONSTELLATION.map((cap, idx) => {
            const isHighlighted = activePillar === 'ALL' || cap.pillar === activePillar;

            let pillarBadgeColor = 'text-[#2F7BFF] border-[#2F7BFF]/30';
            if (cap.pillar === 'SECURE') pillarBadgeColor = 'text-[#FF2A1F] border-[#FF2A1F]/30';
            if (cap.pillar === 'AUTOMATE') pillarBadgeColor = 'text-[#6EA8FF] border-[#6EA8FF]/30';
            if (cap.pillar === 'SCALE') pillarBadgeColor = 'text-white border-white/30';

            return (
              <div
                data-card data-tilt key={idx}
                className={`obsidian-card space-y-6 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'border-white/20 bg-[#07080B] opacity-100 shadow-xl'
                    : 'border-white/5 bg-black/40 opacity-30 blur-[0.5px]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${pillarBadgeColor}`}>
                      {cap.pillar}
                    </span>
                    <span className="text-[#5C5C66] tracking-wider text-[11px]">
                      CONSTELLATION 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[#F5F5F2] tracking-tight">
                    {cap.group}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Skill Pills inside Card */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {cap.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono transition-colors ${
                          isHighlighted
                            ? 'bg-white/5 text-[#F5F5F2] border border-white/10'
                            : 'bg-black/20 text-[#5C5C66]'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
