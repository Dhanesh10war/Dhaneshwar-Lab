import React from 'react';
import { Icon } from './ui/icon';
import { MATERIALS } from '../data/portfolio-data';

export const MaterialsSection: React.FC = () => {
  return (
    <section id="materials" className="py-24 px-6 border-t border-white/[0.06] max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
        <div>
          <div className="text-xs uppercase font-bold tracking-widest text-[#86868b] mb-2 flex items-center gap-2">
            <Icon name="package" size="action" className="text-purple-400" />
            <span>Open Materials & Resources</span>
          </div>
          <h2 className="headline-title text-white">
            Libraries, shaders & toolkits.
          </h2>
        </div>
        <p className="text-sm text-[#86868b] max-w-sm">
          Downloadable resources, open-source packages, and creative engineering assets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MATERIALS.map((mat) => (
          <div
            key={mat.id}
            className="group relative rounded-3xl bg-[#121214] border border-white/[0.08] p-7 flex flex-col justify-between hover:border-white/[0.2] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {mat.type}
                </span>
                <span className="text-xs font-mono text-[#86868b]">{mat.version}</span>
              </div>

              <h3 className="text-lg font-semibold text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
                {mat.title}
              </h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                {mat.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#6e6e73] font-medium">
                {mat.downloadsOrStars}
              </span>
              <a
                href={mat.link}
                aria-label={`Access ${mat.title}`}
                className="apple-pressable inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white text-white hover:text-black text-xs font-semibold tracking-tight transition-colors"
              >
                <span>Access</span>
                <Icon name="external-link" size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
