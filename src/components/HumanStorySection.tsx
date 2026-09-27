import MediaSlot from './MediaSlot';

export default function HumanStorySection() {
  return (
    <section id="about" data-depth="true" className="relative min-h-screen py-28 px-6 lg:px-12 z-20">
      <div className="section-content max-w-7xl mx-auto space-y-32">
        {/* Chapter 11: The Human Engineering Story */}
        <div className="space-y-16">
          <div className="eyebrow-label text-[#5C5C66] flex items-center gap-3">
            <span className="text-[#2F7BFF]">14 / HUMAN STORY</span>
            <span className="text-white/20">/</span>
            <span>GROUND-LEVEL FOUNDATIONS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-[0.96]">
                I learned engineering <br />
                by owning
                <span className="font-serif-italic text-[#6EA8FF] text-5xl sm:text-7xl md:text-8xl font-normal">
                  real systems.
                </span>
              </h2>

              <div className="p-7 rounded-[20px] bg-[#07080B] border border-white/10 space-y-2">
                <span className="eyebrow-label text-[#2F7BFF] block">
                  THE PRINCIPLE
                </span>
                <p className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight leading-snug">
                  &ldquo;Production problems don&apos;t stay inside one layer. Neither do I.&rdquo;
                </p>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed max-w-[62ch]">
                <p>
                  I did not start my engineering journey in an ivory tower reading abstract theory. 
                  I started on the repair bench: diagnosing dead power rails, crimping twisted-pair Ethernet cables, 
                  and resolving mission-critical hardware failures across high-velocity operational hubs.
                </p>
                <p>
                  When you understand what happens to a machine when a physical capacitor fails or when a network switch drops 
                  packets during peak hours, you write code differently. You don&apos;t assume the network is infinite, 
                  you don&apos;t assume memory is free, and you never leave authentication to chance.
                </p>
              </div>
            </div>

            {/* PhotoSlot 1: about-working.jpg / .svg */}
            <div className="lg:col-span-6">
              <div data-cursor="view" className="rounded-[20px] overflow-hidden border border-white/15 shadow-2xl bg-[#07080B]">
                <MediaSlot slot="about" alt="Vijaya Kumar L at work" fallback="terminal" />
              </div>
              <p className="font-mono text-[11px] text-[#5C5C66] mt-3 uppercase tracking-wider text-right">
                SCENE 02 // HARDWARE DIAGNOSTICS & SYSTEM TELEMETRY
              </p>
            </div>
          </div>
        </div>

        {/* Chapter 12: Leadership & High-Agency Ownership */}
        <div className="space-y-16 pt-20 border-t border-white/10">
          <div className="eyebrow-label text-[#5C5C66] flex items-center gap-3">
            <span className="text-[#2F7BFF]">15 / LEADERSHIP</span>
            <span className="text-white/20">/</span>
            <span>EXECUTIVE ALIGNMENT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* PhotoSlot 2: about-speaking.jpg / .svg */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div data-cursor="view" className="rounded-[20px] overflow-hidden border border-white/15 shadow-2xl bg-[#07080B]">
                <MediaSlot slot="leadership" alt="Vijaya Kumar L with the team" fallback="flow" />
              </div>
              <p className="font-mono text-[11px] text-[#5C5C66] mt-3 uppercase tracking-wider">
                SCENE 03 // ARCHITECTURAL GOVERNANCE & TEAM OWNERSHIP
              </p>
            </div>

            {/* Leadership Manifesto */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-[1.04]">
                Building is only half the job. <br />
                <span className="text-[#A1A1AA]">The other half is owning </span>
                <span className="font-serif-italic text-[#6EA8FF] text-4xl sm:text-6xl md:text-7xl font-normal">
                  the outcome.
                </span>
              </h3>

              <div className="space-y-4 text-base text-[#A1A1AA] font-light leading-relaxed max-w-[62ch]">
                <p>
                  True engineering leadership is not issuing tickets from a distance. It is aligning business stakeholders, 
                  product teams, marketing operations, and security auditors around clean, maintainable systems.
                </p>
                <p>
                  Whether it is consolidating 9 isolated corporate domains into a unified security posture, 
                  negotiating VAPT remediation checklists with ethical hackers, or ensuring 100+ daily operational 
                  employees have reliable access to TrueNAS storage—I own the outcome from initial schematic to live production.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 font-mono text-xs text-[#F5F5F2]">
                <div className="p-4 bg-[#07080B] rounded-xl border border-white/10">
                  <span className="text-[#2F7BFF] block mb-1">RESPONSIBILITY 01</span>
                  End-to-End Ownership
                </div>
                <div className="p-4 bg-[#07080B] rounded-xl border border-white/10">
                  <span className="text-[#2F7BFF] block mb-1">RESPONSIBILITY 02</span>
                  Cross-Domain Security Governance
                </div>
                <div className="p-4 bg-[#07080B] rounded-xl border border-white/10">
                  <span className="text-[#2F7BFF] block mb-1">RESPONSIBILITY 03</span>
                  Automation & Tool Modernization
                </div>
                <div className="p-4 bg-[#07080B] rounded-xl border border-white/10">
                  <span className="text-[#2F7BFF] block mb-1">RESPONSIBILITY 04</span>
                  Mentorship & Engineering Quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
