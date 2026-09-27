import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECURITY_INCIDENTS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function SecuritySection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'waf' | 'brute' | 'vapt'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const incidentsListRef = useRef<HTMLDivElement>(null);

  const defenseLayers = [
    { name: 'LOGIN PROTECTION', desc: 'Two-level login protection deployed after a 10,261-attempt brute-force campaign.' },
    { name: 'SESSION SECURITY', desc: 'Session fixation, privilege escalation and cache-control issues fixed; HTTP-only, SameSite cookies.' },
    { name: 'CLOUDFLARE WAF', desc: 'WAF, DDoS and bot rules across nine company domains on one edge.' },
    { name: 'BOT & SPAM DEFENCE', desc: 'Bot protection and human-verification on forms; 3,000+ spam comments cleaned from production.' },
    { name: 'SERVER HARDENING', desc: 'Hardened Linux and Nginx deployments, exposed ports closed, secure subdomain hosting with SSL.' },
    { name: 'CVE TRIAGE', desc: 'Internal advisory for CVE-2026-24049 (CVSS 7.1) in a shared Python dependency.' },
    { name: 'VAPT REMEDIATION', desc: 'Seven VAPT engagements led in-house, with standards-based reports and prioritised fixes.' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const counter = counterRef.current;
    const incidentsList = incidentsListRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Background transition to deep red while scrolling into view
      if (!prefersReducedMotion) {
        gsap.to(section, {
          backgroundColor: '#0A0304',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        });
      }

      // 2. Attack counter ticks up
      if (counter && !prefersReducedMotion) {
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const countObj = { count: 0 };
            gsap.to(countObj, {
              count: 30000,
              duration: 2.2,
              ease: 'power3.out',
              onUpdate: () => {
                const el = counter.querySelector('.attack-num');
                if (el) {
                  el.textContent = Math.floor(countObj.count).toLocaleString() + '+';
                }
              },
            });
          },
        });
      }

      // 3. Incident cards slide in like alert notifications
      if (incidentsList && !prefersReducedMotion) {
        const cards = incidentsList.querySelectorAll('.incident-alert-card');
        gsap.fromTo(
          cards,
          { opacity: 0 },
          {
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: incidentsList,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredIncidents = SECURITY_INCIDENTS.filter((inc) => {
    if (activeFilter === 'all') return true;
    return inc.type === activeFilter;
  });

  return (
    <section
      ref={sectionRef}
      id="security"
      data-depth="true"
      className="relative min-h-screen py-28 px-6 lg:px-12 z-20 transition-colors duration-700"
    >
      {/* Red ambient perimeter glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#FF2A1F]/10 via-[#B3001B]/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="section-content max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#FF2A1F]/20 pb-8">
          <div>
            <div className="eyebrow-label text-[#FF2A1F] mb-2 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FF2A1F] animate-ping" />
              <span>11 / DEFENSE · RED SHIFT</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-none">
              Security as
              <span className="h-accent text-[#FF2A1F]">architecture.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="font-serif-italic text-2xl text-[#F5F5F2]">
              &ldquo;Security is not a plugin. It is <span className="text-[#FF2A1F]">geometry.</span>&rdquo;
            </p>
            <p className="text-sm text-[#A1A1AA] font-light leading-relaxed">
              Real-world threat containment spanning multi-domain edge firewalls, credential stuffing mitigations, 
              and vulnerability assessments across high-value enterprise properties.
            </p>
          </div>
        </div>

        {/* Live Attack Counter & Perimeter Statistics */}
        <div
          ref={counterRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-7 lg:p-9 rounded-[20px] bg-[#0E0507] border border-[#FF2A1F]/30 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#FF2A1F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2A1F]" />
              Hostile Requests Blocked at Edge
            </div>
            <div className="text-5xl sm:text-6xl font-mono font-bold text-[#F5F5F2] tracking-tight tabular-nums attack-num">
              30,000+
            </div>
            <p className="text-xs text-[#A1A1AA] font-light">
              Hostile requests blocked every month at the edge, across nine company domains.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-mono text-xs text-[#FF2A1F] uppercase tracking-wider">
              Brute-Force Single Incident
            </div>
            <div className="text-5xl sm:text-6xl font-mono font-bold text-[#F5F5F2] tracking-tight tabular-nums">
              10,261
            </div>
            <p className="text-xs text-[#A1A1AA] font-light">
              Distributed credential-stuffing automated login attempts met with two-level login protection.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-mono text-xs text-[#FF2A1F] uppercase tracking-wider">
              Audited Enterprise Platforms
            </div>
            <div className="text-5xl sm:text-6xl font-mono font-bold text-[#F5F5F2] tracking-tight tabular-nums">
              7 VAPT
            </div>
            <p className="text-xs text-[#A1A1AA] font-light">
              Formal third-party penetration testing cycles led and remediated across CIEL HR assets.
            </p>
          </div>
        </div>

        {/* Defense Layers Topology & Incident Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 7 Defense Layers */}
          <div className="lg:col-span-5 space-y-4">
            <div className="eyebrow-label text-[#FF2A1F]">
              THE 7 ACTIVE DEFENSE LAYERS
            </div>
            <div className="space-y-2.5">
              {defenseLayers.map((layer, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#080203] border border-[#FF2A1F]/15 hover:border-[#FF2A1F]/40 transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FF2A1F] font-bold">L0{idx + 1} // {layer.name}</span>
                    <span className="text-white/40 text-[10px]">ACTIVE</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] font-light">
                    {layer.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sliding Incident Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="eyebrow-label text-[#5C5C66]">
                INCIDENT RESPONSE LOGS ({SECURITY_INCIDENTS.length})
              </div>

              {/* Filter */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono">
                {(['all', 'waf', 'brute', 'vapt'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    data-cursor="magnetic"
                    className={`px-3 py-1 rounded-full uppercase text-[11px] transition-colors ${
                      activeFilter === cat
                        ? 'bg-[#FF2A1F] text-white font-semibold'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div ref={incidentsListRef} className="space-y-4">
              {filteredIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className="incident-alert-card p-6 rounded-2xl bg-[#090304] border border-[#FF2A1F]/20 hover:border-[#FF2A1F]/40 transition-colors space-y-3 shadow-lg"
                >
                  <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#FF2A1F] uppercase tracking-wider">
                        {inc.category}
                      </span>
                      <h3 className="text-lg font-display font-bold text-[#F5F5F2]">
                        {inc.title}
                      </h3>
                    </div>
                    <span className="shrink-0 self-start px-2.5 py-1 rounded-full bg-[#FF2A1F]/10 border border-[#FF2A1F]/30 font-mono text-[10px] text-[#FF2A1F]">
                      {inc.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                    {inc.detail}
                  </p>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/5 font-mono text-xs text-[#F5F5F2]">
                    <span className="text-[#FF2A1F] font-semibold mr-1.5">MITIGATION:</span>
                    {inc.mitigation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
