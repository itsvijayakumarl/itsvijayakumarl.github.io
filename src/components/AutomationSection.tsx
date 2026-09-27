import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AutomationSection() {
  const [pipelineState, setPipelineState] = useState<'automated' | 'manual'>('automated');
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  const workflowSteps = [
    { label: "1. EVENT TRIGGER", sub: "Web Forms / WhatsApp / IVR", detail: "Payload emitted as asynchronous JSON event" },
    { label: "2. GATEWAY INGEST", sub: "Serverless Endpoint", detail: "Webhook receives the lead in real time" },
    { label: "3. NORMALIZATION", sub: "Dedup & Sanitization", detail: "Validated and deduplicated before sales sees it" },
    { label: "4. CRM ORCHESTRATION", sub: "Zoho CRM & Deal Creation", detail: "Lead created and routed to the right team" },
    { label: "5. DISPATCH BOT", sub: "Slack & WhatsApp Alerts", detail: "Sales team notified the moment it lands" },
    { label: "6. KPI DASHBOARD", sub: "Google Sheets & Apps Script", detail: "Weekly and monthly reports write themselves" }
  ];
  const manualSteps = [
    { label: "1. CHECK EVERY INBOX", sub: "Forms / WhatsApp / IVR", detail: "Someone opens each channel by hand" },
    { label: "2. EXPORT CSVs", sub: "Download, open, merge", detail: "Files pile up in Downloads" },
    { label: "3. CLEAN BY EYE", sub: "Spot duplicates manually", detail: "The same lead gets entered twice" },
    { label: "4. RETYPE INTO CRM", sub: "Copy-paste, field by field", detail: "Typos and missed fields" },
    { label: "5. PING THE TEAM", sub: "One message at a time", detail: "Hot leads wait until someone is free" },
    { label: "6. BUILD THE REPORT", sub: "Formulas every week", detail: "Hours spent before anyone reads it" }
  ];

  // Automatic pulse loop and active step rotation
  useEffect(() => {
    if (pipelineState !== 'automated') return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= workflowSteps.length - 1 ? 0 : prev + 1));
    }, 2400);

    return () => clearInterval(interval);
  }, [pipelineState, workflowSteps.length]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const ctx = gsap.context(() => {
      // Stroke dashoffset scrub on scroll into view
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="automation"
      data-depth="true"
      className="relative min-h-screen py-28 px-6 lg:px-12 z-20 overflow-hidden"
    >
      <div className="section-content max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="eyebrow-label text-[#5C5C66] mb-2 flex items-center gap-3">
              <span className="text-[#2F7BFF]">12 / AUTOMATION</span>
              <span className="text-white/20">/</span>
              <span>AUTONOMOUS WORKFLOWS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-none">
              If it repeats,
              <span className="h-accent text-[#6EA8FF]">I automate it.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed">
            Eliminating human latency, copy-paste errors, and fragmented spreadsheet silos through event-driven 
            serverless choreography.
          </p>
        </div>

        {/* State Toggle: Automated Pipeline vs Manual Chaos */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#07080B] border border-white/10">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-xs text-[#A1A1AA] uppercase tracking-wider">
              See it:
            </span>
            <div className="lg flex items-center gap-1 p-1 rounded-full">
              <button
                onClick={() => setPipelineState('automated')}
                data-cursor="magnetic"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-colors ${
                  pipelineState === 'automated'
                    ? 'bg-[#2F7BFF] text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">With automation</span><span className="sm:hidden">Automated</span>
              </button>
              <button
                onClick={() => setPipelineState('manual')}
                data-cursor="magnetic"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-colors ${
                  pipelineState === 'manual'
                    ? 'bg-[#F5B83D] text-black font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Without (by hand)</span><span className="sm:hidden">By hand</span>
              </button>
            </div>
          </div>

          <div className="font-mono text-xs text-[#6EA8FF] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2F7BFF] animate-ping" />
            <span className={pipelineState === 'automated' ? '' : 'text-[#F5B83D]'}>MODE: {pipelineState === 'automated' ? 'EVENT-DRIVEN · RUNS ITSELF' : 'MANUAL · SPREADSHEETS & EMAIL'}</span>
          </div>
        </div>

        {/* Animated SVG Flow Diagram with Connected Paths and Traveling Light Pulse */}
        <div className="p-8 rounded-[20px] bg-[#07080B] border border-white/10 space-y-8 relative overflow-hidden">
          <div className="relative w-full h-24 hidden md:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Static background rail */}
              <path
                d="M 50 40 L 950 40"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Dynamic animated drawn line with stroke-dashoffset */}
              <path
                ref={pathRef}
                d="M 50 40 L 950 40"
                stroke={pipelineState === 'automated' ? '#2F7BFF' : '#F5B83D'}
                opacity={pipelineState === 'automated' ? 1 : 0.6}
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Traveling Light Pulse */}
              <circle
                ref={pulseRef}
                r="6"
                fill="#6EA8FF"
                filter="drop-shadow(0 0 8px #2F7BFF)"
                cx="50"
                cy="40"
              >
                {pipelineState === 'automated' && (
                  <animateMotion
                    path="M 0 0 L 900 0"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>

              {/* Node anchors along SVG */}
              {[50, 230, 410, 590, 770, 950].map((cx, i) => (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy="40"
                    r={activeStep === i ? "8" : "5"}
                    fill={activeStep === i ? "#2F7BFF" : "#0E1016"}
                    stroke={activeStep === i ? "#6EA8FF" : "rgba(255,255,255,0.2)"}
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  {activeStep === i && (
                    <circle
                      cx={cx}
                      cy="40"
                      r="12"
                      fill="none"
                      stroke="#2F7BFF"
                      strokeWidth="1.5"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>

          <p className={`text-center font-mono text-xs tracking-[0.2em] uppercase ${pipelineState === 'automated' ? 'text-[#6EA8FF]' : 'text-[#F5B83D]'}`} aria-live="polite">
            {pipelineState === 'automated'
              ? 'Every lead, every report — handled the moment it happens.'
              : 'The same work, by hand, every week. This is what the pipeline replaced.'}
          </p>

          {/* Workflow Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {(pipelineState === 'automated' ? workflowSteps : manualSteps).map((step, idx) => {
              const isCurrent = pipelineState === 'automated' && activeStep === idx;
              const manual = pipelineState === 'manual';
              return (
                <div
                  key={`${pipelineState}-${idx}`}
                  onClick={() => pipelineState === 'automated' && setActiveStep(idx)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer space-y-2 auto-step ${
                    manual
                      ? 'bg-[#1a0d05]/70 border-[#F5B83D]/30 manual-step'
                      : isCurrent
                      ? 'bg-[#0E1016] border-[#2F7BFF] shadow-[0_0_20px_rgba(47,123,255,0.2)]'
                      : 'bg-black/40 border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'
                  }`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className={manual ? 'text-[#F5B83D] font-bold' : isCurrent ? 'text-[#6EA8FF] font-bold' : 'text-[#5C5C66]'}>
                      0{idx + 1}
                    </span>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F7BFF] animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs font-display font-bold text-[#F5F5F2] leading-tight">
                    {step.label}
                  </div>
                  <div className="text-[11px] font-mono text-[#A1A1AA]">
                    {step.sub}
                  </div>
                  <p className="text-[10px] text-[#5C5C66] font-light leading-tight pt-1">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audited Automation Returns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#07080B] border border-white/10 space-y-1.5">
            <span className="eyebrow-label text-[#2F7BFF]">REPORTS ON AUTOPILOT</span>
            <div className="text-3xl font-mono font-bold text-[#F5F5F2] tabular-nums">12 Months</div>
            <p className="text-xs text-[#A1A1AA] font-light">Weekly and monthly Exotel IVR reports for HR, Compliance and Helpdesk, sustained Jul 2025 – Jul 2026.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#07080B] border border-white/10 space-y-1.5">
            <span className="eyebrow-label text-[#F5B83D]">BENCHMARKED VALUE / YR</span>
            <div className="text-3xl font-mono font-bold text-[#F5B83D] tabular-nums">₹2,52,000</div>
            <p className="text-xs text-[#A1A1AA] font-light">LeadFlow CRM built in-house, priced against a bought CRM at 2026 list rates.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#07080B] border border-white/10 space-y-1.5">
            <span className="eyebrow-label text-[#6EA8FF]">STORAGE RECLAIMED</span>
            <div className="text-3xl font-mono font-bold text-[#F5F5F2] tabular-nums">8 GB</div>
            <p className="text-xs text-[#A1A1AA] font-light">Weekly automated cleanup job on the OKR application.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
