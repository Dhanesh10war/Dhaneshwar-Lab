import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Icon } from './ui/icon';
import { ProjectItem } from '../types';

interface BentoCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  isLarge?: boolean;
  isWide?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  project,
  onSelect,
  isLarge = false,
  isWide = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className={isLarge ? 'md:col-span-2 md:row-span-2' : isWide ? 'md:col-span-2' : ''}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
        onClick={() => onSelect(project)}
        className={`group relative overflow-hidden rounded-[2rem] bg-[#121214] border border-white/[0.08] p-7 md:p-9 flex flex-col justify-between cursor-pointer hover:border-white/[0.2] transition-colors will-change-transform ${
          isLarge
            ? 'min-h-[480px] h-full'
            : isWide
            ? 'min-h-[360px] h-full'
            : 'min-h-[360px] h-full'
        }`}
      >
        {/* Background Gradient Aura */}
        <div
          className={`absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br ${
            project.accentColor || 'from-white/10 to-transparent'
          } blur-3xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none`}
        />

        {/* Card Header */}
        <div style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#86868b] bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                {project.category}
              </span>
              <span className="text-xs text-[#6e6e73] font-mono">{project.year}</span>
            </div>

            {project.badge && (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {project.badge}
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm font-medium text-[#a1a1a6] mb-3">
            {project.tagline}
          </p>

          <p className="text-xs text-[#86868b] leading-relaxed line-clamp-3 max-w-md">
            {project.description}
          </p>
        </div>

        {/* Visual Canvas / Interactive Representation */}
        <div style={{ transform: 'translateZ(30px)' }} className="my-6 relative rounded-2xl bg-[#09090b] border border-white/[0.06] p-5 overflow-hidden flex-1 flex flex-col justify-end">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Metrics Row */}
          {project.metrics && (
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-white/[0.03] backdrop-blur-md rounded-xl p-2.5 border border-white/[0.05]">
                  <div className="text-[10px] uppercase tracking-wider text-[#6e6e73]">{m.label}</div>
                  <div className="text-sm font-bold tracking-tight text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div style={{ transform: 'translateZ(15px)' }} className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[11px] text-[#86868b] bg-white/[0.04] px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all duration-200">
            <Icon name="arrow-up-right" size="action" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
