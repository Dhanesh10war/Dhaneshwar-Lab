import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './ui/icon';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Scrim / Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] bg-[#121214] border border-white/[0.15] p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] z-10 text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close details dialog"
              className="apple-pressable absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.1] flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <Icon name="x" size="action" />
            </button>

            {/* Header Meta */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold tracking-wider uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                {project.category}
              </span>
              <span className="text-xs text-[#86868b]">{project.year}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-base text-[#a1a1a6] font-medium mb-6">
              {project.tagline}
            </p>

            {/* Full Narrative */}
            <div className="space-y-4 text-sm text-[#86868b] leading-relaxed mb-8">
              <p>{project.description}</p>
              <p>
                Architected with deep attention to human ergonomics, ensuring zero cognitive friction. State transitions are physics-governed and continuous, preventing jarring layout shifts during high-throughput execution.
              </p>
            </div>

            {/* Metrics Breakdown */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
                {project.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#6e6e73]">
                      {m.label}
                    </div>
                    <div className="text-base font-bold text-white mt-1">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Engineering Highlights with Consistent Vector Check Icons */}
            <div className="mb-8">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#86868b] mb-3">
                Key Architecture Attributes
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-[#a1a1a6]">
                  <Icon name="check-circle-2" size="action" className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Sub-4ms pointer tracking with zero-latency spring extrapolation.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#a1a1a6]">
                  <Icon name="check-circle-2" size="action" className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dynamic optical kerning and high-contrast accessibility compliant.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#a1a1a6]">
                  <Icon name="check-circle-2" size="action" className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Hardware-accelerated CSS and WebGPU rendering pipeline.</span>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t, idx) => (
                  <span key={idx} className="text-xs text-[#86868b] bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.link || "#"}
                aria-label={`View live project for ${project.title}`}
                className="apple-pressable inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-[#e5e5ea]"
              >
                <span>Live Project</span>
                <Icon name="external-link" size="action" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
