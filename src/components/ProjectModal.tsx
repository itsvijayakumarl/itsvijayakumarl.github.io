import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectDetail } from '../data/portfolioData';
import { createPortal } from 'react-dom';
import Visual, { type VisualKind } from './Visual';

const VIZ: Record<string, [VisualKind, 'blue' | 'red' | 'amber']> = {
  'sec-ops': ['radar', 'red'], leadflow: ['flow', 'blue'], airadar: ['gauges', 'blue'], 'ivr-automation': ['bars', 'blue'],
  'salesiq-automation': ['flow', 'amber'], pressrise: ['grid', 'amber'], aiprompts: ['grid', 'blue'], snapurl: ['terminal', 'blue'],
  themafoifoundation: ['globe', 'amber'], 'aws-s3-hardening': ['shield', 'blue'],
};



interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new Event('vk:modal-open'));

    // Handle ESC key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.dispatchEvent(new Event('vk:modal-close'));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const [vk, va] = VIZ[project.id] ?? (['shield', /sec|vapt|psp|clm|onward|finx/i.test(project.id) ? 'red' : 'blue'] as [VisualKind, 'blue' | 'red' | 'amber']);

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-6 lg:p-10 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window with data-lenis-prevent to isolate internal scrolling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent
          className="relative w-full max-w-4xl bg-[#07080B] border border-white/20 rounded-t-[24px] sm:rounded-[24px] shadow-2xl overflow-hidden z-10 max-h-[92svh] sm:max-h-[86vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07080B]/90 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#2F7BFF] font-semibold">{project.number}</span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider">{project.category}</span>
            </div>
            <button
              onClick={onClose}
              data-cursor="magnetic"
              className="px-3 py-1.5 text-[#A1A1AA] hover:text-white rounded-full border border-white/10 hover:border-white/30 transition-colors font-mono text-xs flex items-center gap-1.5"
              aria-label="Close modal"
            >
              <span>ESC</span>
              <span>✕</span>
            </button>
          </div>

          {/* Modal Body with smooth independent scroll */}
          <div
            data-lenis-prevent
            className="p-6 md:p-8 space-y-8 overflow-y-auto overscroll-contain"
          >
            {/* Title & Tagline */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-[#F5F5F2] tracking-tight">
                {project.title}
              </h2>
              <p className="text-base text-[#6EA8FF] font-medium leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Stylized UI Cover */}
            <div className="rounded-xl overflow-hidden border border-white/15 bg-black aspect-[16/7]">
              <Visual kind={vk} accent={va} live label={project.title.split(' — ')[0].toUpperCase()} />
            </div>

            {/* External Action Links (GitHub / Demo) */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="magnetic"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-xs font-mono border border-white/15 transition-colors"
                  >
                    <span>View Repository on GitHub</span>
                    <span>↗</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="magnetic"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F7BFF] hover:bg-[#0A3DFF] text-white rounded-full text-xs font-mono font-semibold transition-colors"
                  >
                    <span>Launch Live Production Deployment</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            )}

            {/* Problem Space */}
            <div className="space-y-2">
              <h3 className="font-mono text-xs text-[#5C5C66] uppercase tracking-widest font-semibold">
                THE ENGINEERING PROBLEM
              </h3>
              <p className="text-sm md:text-base text-[#F5F5F2] font-light leading-relaxed bg-[#0E1016] p-4 rounded-xl border border-white/5">
                {project.problem}
              </p>
            </div>

            {/* System Architecture */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-[#5C5C66] uppercase tracking-widest font-semibold">
                SYSTEM ARCHITECTURE & TOPOLOGY
              </h3>
              <ul className="space-y-2 text-sm text-[#F5F5F2] font-mono">
                {project.systemArchitecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-black/40 p-3.5 rounded-xl border border-white/5">
                    <span className="text-[#2F7BFF] mt-0.5">↳</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Outcomes */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-[#2F7BFF] uppercase tracking-widest font-semibold">
                AUDITED OUTCOMES & IMPACT
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.keyOutcomes.map((outcome, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/60 border border-white/5 text-xs sm:text-sm text-white/90">
                    <div className="text-[#2F7BFF] mb-1 font-mono text-[10px] font-bold">RESULT 0{idx + 1}</div>
                    <div>{outcome}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Grid */}
            <div className="space-y-2">
              <h3 className="font-mono text-xs text-[#5C5C66] uppercase tracking-widest font-semibold">
                TECHNOLOGIES & PROTOCOLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 bg-white/5 border border-white/10 text-xs font-mono text-white rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Metaphor Quote */}
            <div className="p-4 rounded-xl bg-[#07080B] border-l-2 border-[#2F7BFF] text-xs font-mono text-[#A1A1AA]">
              <span className="text-white font-semibold">Visual Metaphor:</span> {project.visualMetaphor}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
