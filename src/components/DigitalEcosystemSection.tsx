import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ECOSYSTEM_NODES, EcosystemNode } from '../data/portfolioData';

// Import SVG logos


const initials = (name: string) => name.replace(/[^A-Za-z .]/g, '').split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join('') || name.slice(0, 2).toUpperCase();

export default function DigitalEcosystemSection() {
  const [selectedNode, setSelectedNode] = useState<EcosystemNode>(ECOSYSTEM_NODES[0]);


  return (
    <section id="ecosystem" data-depth="true" className="relative min-h-screen py-28 px-6 lg:px-12 z-20">
      <div className="section-content max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="eyebrow-label text-[#5C5C66] mb-2 flex items-center gap-3">
              <span className="text-[#2F7BFF]">10 / ECOSYSTEM</span>
              <span className="text-white/20">/</span>
              <span>ENTERPRISE DIGITAL ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-none">
              Digital <span className="h-accent text-[#6EA8FF]">ecosystem.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed">
            Consolidated enterprise web properties, learning portals, and corporate platforms unified under 
            shared security, automation, and infrastructure standards.
          </p>
        </div>

        {/* Spatial Grid of Interconnected Ecosystem Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Platform Selection List */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="eyebrow-label text-[#5C5C66] block mb-3">
              SELECT ENTERPRISE PLATFORM:
            </span>
            {ECOSYSTEM_NODES.map((node) => {
              const isActive = selectedNode.name === node.name;

              return (
                <button
                  key={node.name}
                  onClick={() => setSelectedNode(node)}
                  data-cursor="magnetic"
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between ${
                    isActive
                      ? 'bg-[#0E1016] border-[#2F7BFF] text-white shadow-xl'
                      : 'bg-[#07080B] border-white/5 text-[#A1A1AA] hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-mono text-[11px] font-bold tracking-wider ${isActive ? 'bg-[#2F7BFF]/20 border-[#2F7BFF]/50 text-[#cfe1ff]' : 'bg-black/60 border-white/10 text-[#8b8f98]'}`} aria-hidden="true">
                      {initials(node.name)}
                    </div>
                    <div>
                      <h3 className="text-base font-display font-bold text-[#F5F5F2] tracking-tight">
                        {node.name}
                      </h3>
                      <p className="font-mono text-xs text-[#5C5C66]">{node.category}</p>
                      <p className="sm:hidden font-mono text-[11px] text-[#2F7BFF] mt-0.5">{node.domain}</p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="font-mono text-xs text-[#2F7BFF]">{node.domain}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Deep Dive for Selected Node */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="obsidian-card space-y-8 shadow-2xl relative overflow-hidden"
              >
                {/* Node Identity Lockup */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    {Boolean(selectedNode.name) && (
                      <div className="w-14 h-14 rounded-2xl bg-[#2F7BFF]/15 border border-[#2F7BFF]/40 flex items-center justify-center shrink-0 font-mono text-sm font-bold text-[#cfe1ff]" aria-hidden="true">
                        {initials(selectedNode.name)}
                      </div>
                    )}
                    <div>
                      <span className="eyebrow-label text-[#2F7BFF] block">
                        {selectedNode.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F5F5F2] tracking-tight">
                        {selectedNode.name}
                      </h3>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-white/90 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full self-start">
                    {selectedNode.domain}
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-base text-[#F5F5F2] font-light leading-relaxed">
                  {selectedNode.description}
                </p>

                {/* Unified Capabilities */}
                <div className="space-y-3">
                  <span className="eyebrow-label text-[#5C5C66] block">
                    ENGINEERING CAPABILITIES DEPLOYED:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#6EA8FF] rounded-full"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Production Impact Metric */}
                <div className="p-5 rounded-xl bg-black/60 border border-white/5">
                  <span className="font-mono text-[10px] text-[#5C5C66] uppercase tracking-wider block mb-1">
                    AUDITED OUTCOME
                  </span>
                  <p className="text-sm font-mono text-[#F5F5F2] font-medium">
                    {selectedNode.metrics}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
