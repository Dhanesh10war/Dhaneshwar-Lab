import React from 'react';
import { Icon } from './ui/icon';
import { WRITINGS } from '../data/portfolio-data';

export const WritingSection: React.FC = () => {
  return (
    <section id="writing" className="py-24 px-6 border-t border-white/[0.06] max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
        <div>
          <div className="text-xs uppercase font-bold tracking-widest text-[#86868b] mb-2 flex items-center gap-2">
            <Icon name="notebook-text" size="action" className="text-blue-400" />
            <span>Essays, Talks & Content</span>
          </div>
          <h2 className="headline-title text-white">
            Thoughts on craft, systems & physics.
          </h2>
        </div>
        <p className="text-sm text-[#86868b] max-w-sm">
          Long-form essays dissecting interaction design, typography, and software architecture.
        </p>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {WRITINGS.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="group py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] px-4 -mx-4 rounded-2xl transition-colors apple-pressable"
          >
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#86868b] mb-2">
                <span className="text-blue-400 font-medium px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{item.category}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04]">{item.date}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04]">{item.readTime}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[#86868b] mt-1.5 leading-relaxed font-normal">
                {item.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#86868b] group-hover:text-white transition-colors self-start md:self-center">
              <span>Read Essay</span>
              <Icon name="arrow-up-right" size="action" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
