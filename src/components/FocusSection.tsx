import React from 'react';
import { motion } from 'framer-motion';
import { Icon, IconName } from './ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';

export const FocusSection: React.FC = () => {
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

  return (
    <section id="focus" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#86868b] mb-3">
            <Icon name="sparkles" size="action" className="text-blue-400" />
            <span>Independent Innovation Lab</span>
          </div>
          <h2 className="headline-title text-white">
            {PERSONAL_INFO.currentFocus.heading}
          </h2>
        </div>

        <p className="text-sm text-[#86868b] max-w-md leading-relaxed font-normal">
          {PERSONAL_INFO.currentFocus.description}
        </p>
      </div>

      {/* Focus Areas Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PERSONAL_INFO.areasOfFocus.map((area, index) => {
          const isSpan = index === 0 || index === 3;
          return (
            <motion.div
              key={area.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className={`group relative overflow-hidden rounded-[2rem] bg-[#121214] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/[0.2] transition-colors ${
                isSpan ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Background Ambient Glow */}
              <div
                className={`absolute -top-28 -right-28 w-72 h-72 rounded-full bg-gradient-to-br ${area.accentColor} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-white/20 transition-colors">
                    <Icon
                      name={resolveAreaIcon(area.icon)}
                      size="feature"
                      className={getAreaIconColor(area.icon)}
                    />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#86868b] bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06]">
                    Focus Area
                  </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-white mb-2 group-hover:text-white transition-colors">
                  {area.title}
                </h3>

                <p className="text-xs font-medium text-blue-400/90 mb-4 tracking-tight">
                  {area.tagline}
                </p>

                <p className="text-sm text-[#86868b] leading-relaxed mb-6">
                  {area.description}
                </p>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                {area.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] text-[#86868b] bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.04]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Lab Registry Card (Future Expandability) */}
        <div className="rounded-[2rem] bg-[#0c0c0e] border border-white/[0.06] p-8 flex flex-col justify-between border-dashed">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#86868b]">
                <Icon name="folder-archive" size="feature" className="text-[#86868b]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white tracking-tight">Lab Registry</div>
                <div className="text-[11px] text-[#6e6e73]">Release Architecture</div>
              </div>
            </div>

            <h4 className="text-lg font-semibold tracking-tight text-white mb-2">
              Future Initiatives
            </h4>
            <p className="text-xs text-[#86868b] leading-relaxed">
              New technological projects, research notes, open-source repositories, and venture prototypes will be published here as they reach verified milestones.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.04] text-[11px] text-[#6e6e73] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
            <span>Architecture ready for verified releases</span>
          </div>
        </div>
      </div>
    </section>
  );
};
