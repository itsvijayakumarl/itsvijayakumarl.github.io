import { useState } from 'react';
import { motion } from 'motion/react';
import { SELECTED_PROJECTS, ProjectDetail } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import Visual, { type VisualKind } from './Visual';

// Import SVG project covers

const VIZ: Record<string, { kind: VisualKind; accent: 'blue' | 'red' | 'amber' }> = {
  'sec-ops': { kind: 'radar', accent: 'red' },
  leadflow: { kind: 'flow', accent: 'blue' },
  airadar: { kind: 'gauges', accent: 'blue' },
  'ivr-automation': { kind: 'bars', accent: 'blue' },
  'salesiq-automation': { kind: 'flow', accent: 'amber' },
  pressrise: { kind: 'grid', accent: 'amber' },
  aiprompts: { kind: 'grid', accent: 'blue' },
  snapurl: { kind: 'terminal', accent: 'blue' },
  themafoifoundation: { kind: 'globe', accent: 'amber' },
  'aws-s3-hardening': { kind: 'shield', accent: 'blue' },
};
const KINDS: VisualKind[] = ['shield', 'terminal', 'globe', 'bars', 'radar', 'flow'];
const vizFor = (id: string) => VIZ[id] ?? { kind: KINDS[id.length % KINDS.length], accent: /sec|vapt|psp|clm|onward|finx/i.test(id) ? 'red' as const : 'blue' as const };

export default function SelectedSystemsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [filter, setFilter] = useState<'all' | 'sec' | 'auto' | 'tools'>('all');

  const filteredProjects = SELECTED_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'sec') return p.category.toLowerCase().includes('security') || p.category.toLowerCase().includes('cloud');
    if (filter === 'auto') return p.category.toLowerCase().includes('automation') || p.category.toLowerCase().includes('pipelines');
    if (filter === 'tools') return p.category.toLowerCase().includes('extension') || p.category.toLowerCase().includes('plugins') || p.category.toLowerCase().includes('platform') || p.category.toLowerCase().includes('app');
    return true;
  });

  return (
    <section id="systems" data-depth="true" className="relative min-h-screen py-28 px-6 lg:px-12 z-20">
      <div className="section-content max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="eyebrow-label text-[#5C5C66] mb-2 flex items-center gap-3">
              <span className="text-[#2F7BFF]">09 / FULL ARCHIVE</span>
              <span className="text-white/20">/</span>
              <span>FLAGSHIP PRODUCTION SYSTEMS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#F5F5F2] tracking-tight leading-none">
              Every <span className="h-accent text-[#6EA8FF]">system.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed">
            Deep-stack production architectures engineered for threat defense, lead orchestration, 
            serverless reporting, and privacy-preserving AI telemetry.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="lg flex flex-wrap items-center gap-2 p-1.5 rounded-full text-xs font-mono w-fit">
          {(
            [
              { id: 'all', label: `All Systems (${SELECTED_PROJECTS.length})` },
              { id: 'sec', label: 'Security & Cloud' },
              { id: 'auto', label: 'Automation & CRM' },
              { id: 'tools', label: 'Tools & Open Source' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              data-cursor="magnetic"
              className={`px-4 py-1.5 rounded-full transition-all ${
                filter === tab.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Cards Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {filteredProjects.map((project, idx) => {

            return (
              <motion.div
                data-card data-tilt key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                onClick={() => setSelectedProject(project)}
                data-cursor="view"
                className="obsidian-card cursor-pointer group hover:border-white/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex flex-col gap-5 h-full">
                  {/* Left: Thumbnail Preview with PhotoSlot */}
                  <div className="hidden sm:block rounded-xl overflow-hidden border border-white/10 bg-[#000000] aspect-[16/10]">
                    <Visual kind={vizFor(project.id).kind} accent={vizFor(project.id).accent} label={project.title.split(' — ')[0].toUpperCase()} />
                  </div>

                  {/* Middle: Details */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-[#2F7BFF] font-bold">{project.number}</span>
                      <span className="text-white/20">/</span>
                      <span className="text-[#A1A1AA] uppercase tracking-wider">{project.category}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F5F5F2] tracking-tight leading-tight group-hover:text-[#6EA8FF] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#A1A1AA] font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Right: Tech & CTA */}
                  <div className="mt-auto flex flex-col gap-4">
                    <div className="hidden sm:flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-[11px] font-mono text-white/90 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 text-[11px] font-mono text-[#5C5C66]">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2F7BFF] group-hover:translate-x-1 transition-transform">
                      <span>Inspect Architecture</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
