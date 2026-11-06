import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Icon, IconName } from '../components/ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';
import { LabMatrixCanvas } from '../components/LabMatrixCanvas';
import { Interactive3DCard } from '../components/Interactive3DCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const LabPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion (Rule 7)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      ScrollTrigger.batch('.lab-focus-card', {
        interval: 0.08,
        batchMax: 3,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: true,
          });
        },
      });
    },
    { scope: gridContainerRef, dependencies: [selectedTag] }
  );

  const resolveAreaIcon = (iconName: string): IconName => {
    switch (iconName.toLowerCase()) {
      case 'cpu':
        return 'cpu';
      case 'layers':
        return 'layers';
      case 'compass':
        return 'compass';
      case 'trendingup':
      case 'trending-up':
        return 'trending-up';
      case 'lightbulb':
        return 'lightbulb';
      default:
        return 'sparkles';
    }
  };

  const getAreaIconColor = (iconName: string): string => {
    switch (iconName.toLowerCase()) {
      case 'cpu':
        return 'text-cyan-400';
      case 'layers':
        return 'text-emerald-400';
      case 'compass':
        return 'text-purple-400';
      case 'trendingup':
      case 'trending-up':
        return 'text-amber-400';
      case 'lightbulb':
        return 'text-rose-400';
      default:
        return 'text-blue-400';
    }
  };

  const categories = [
    { id: 'all', label: 'All Exploration' },
    { id: 'technology', label: 'Technology' },
    { id: 'products', label: 'Products' },
    { id: 'research', label: 'Research' },
    { id: 'ventures', label: 'Ventures' },
    { id: 'ideas', label: 'Communication' },
  ];

  const filteredAreas = PERSONAL_INFO.areasOfFocus.filter((a) => {
    if (selectedTag === 'all') return true;
    return a.id === selectedTag;
  });

  return (
    <div className="pt-28 pb-24 px-6 max-w-6xl mx-auto">
      {/* 3D Lab Matrix Visual & Header */}
      <section className="relative min-h-[420px] flex flex-col justify-center items-center text-center overflow-hidden mb-16 rounded-[2.5rem] bg-[#0c0d12] border border-white/[0.08] p-8 md:p-14">
        {/* Interactive 3D Lab Matrix Scene with Capped DPR and Throttling */}
        <LabMatrixCanvas activeArea={selectedTag} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold tracking-wider text-blue-400 uppercase mb-4 backdrop-blur-md">
            <Icon name="sparkles" size="action" />
            <span>Platform Core</span>
          </div>

          <h1 className="headline-title text-white tracking-tight font-semibold mb-4">
            Independent Innovation Lab
          </h1>

          <p className="text-sm md:text-base text-[#86868b] leading-relaxed max-w-xl mx-auto mb-6">
            A private space dedicated to exploring ideas, engineering technology, studying industry dynamics, and turning practical concepts into durable outcomes.
          </p>

          {/* Secondary Tagline Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#a1a1a6] font-medium">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">Explore</span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">Experiment</span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">Engineer</span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">Evolve</span>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-10 pb-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Active Pillars</h2>
          <p className="text-xs text-[#86868b] mt-0.5">Explore the focus domains shaping ongoing work</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#161618] border border-white/[0.08] overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedTag(c.id)}
              className={`apple-pressable px-4 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-colors ${
                selectedTag === c.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Focus Areas 3D Tilt Grid with GSAP Batch Coordination */}
      <div ref={gridContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <AnimatePresence mode="popLayout">
          {filteredAreas.map((area, idx) => {
            const isWide = filteredAreas.length === 5 && (idx === 0 || idx === 3);
            return (
              <motion.div
                key={area.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`lab-focus-card ${isWide ? 'lg:col-span-2' : ''}`}
              >
                <Interactive3DCard glowColor={area.accentColor}>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <Icon
                          name={resolveAreaIcon(area.icon)}
                          size="feature"
                          className={getAreaIconColor(area.icon)}
                        />
                      </div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#86868b] bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06]">
                        {area.title}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
                      {area.title}
                    </h3>

                    <p className="text-xs font-medium text-blue-400 mb-3 tracking-tight">
                      {area.tagline}
                    </p>

                    <p className="text-sm text-[#86868b] leading-relaxed mb-6 font-normal">
                      {area.description}
                    </p>
                  </div>

                  {/* Sub-Focus Tag Grid */}
                  <div className="pt-4 border-t border-white/[0.05]">
                    <div className="text-[10px] font-semibold text-[#6e6e73] uppercase tracking-wider mb-2">
                      Exploration Vectors
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {area.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] text-[#86868b] bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.04]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Interactive3DCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lab Registry Architecture Notice (Governance Compliant) */}
      <section className="rounded-[2.5rem] bg-[#0d0e12] border border-white/[0.08] p-8 md:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#86868b] mb-3">
              <Icon name="folder-archive" size="action" className="text-blue-400" />
              <span>Verified Releases Architecture</span>
            </div>
            <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">
              Future Projects & Ventures
            </h3>
            <p className="text-sm text-[#86868b] leading-relaxed max-w-2xl font-normal">
              Per the Lab's release governance, this section will host software products, research publications, and open-source systems as they evolve from conceptual discovery into validated releases.
            </p>
          </div>

          <div className="md:col-span-4 flex md:justify-end">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-white">
              <Icon name="check-circle-2" size="action" className="text-emerald-400" />
              <span>Registry Architecture Ready</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
