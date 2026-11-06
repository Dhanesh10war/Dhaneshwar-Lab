import React from 'react';
import { Icon } from './ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 border-t border-white/[0.06] max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Biography & Background */}
        <div className="lg:col-span-7">
          <div className="text-xs uppercase font-bold tracking-widest text-[#86868b] mb-3 flex items-center gap-2">
            <Icon name="compass" size="action" className="text-blue-400" />
            <span>Professional Background</span>
          </div>

          <h2 className="headline-title text-white mb-8">
            About Dhaneshwar
          </h2>

          <div className="space-y-5 text-sm md:text-base text-[#86868b] leading-relaxed font-normal">
            {PERSONAL_INFO.bio.map((paragraph, index) => (
              <p key={index} className="text-[#a1a1a6]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right Column: Philosophy & Education */}
        <div className="lg:col-span-5 space-y-6">
          {/* Professional Philosophy Card */}
          <div className="rounded-3xl bg-[#121214] border border-white/[0.08] p-7 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
              <Icon name="lightbulb" size="feature" className="text-blue-400" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#86868b] mb-1">
                Professional Philosophy
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                Curiosity & Purpose
              </h3>
              <p className="text-xs text-[#a1a1a6] leading-relaxed">
                "{PERSONAL_INFO.philosophy}"
              </p>
            </div>
          </div>

          {/* Education Card */}
          <div className="rounded-3xl bg-[#121214] border border-white/[0.08] p-7 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
              <Icon name="graduation-cap" size="feature" className="text-emerald-400" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#86868b] mb-1">
                Academic Background
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                {PERSONAL_INFO.education.degree} in {PERSONAL_INFO.education.specialization}
              </h3>
              <p className="text-xs text-[#86868b] mt-1">
                {PERSONAL_INFO.education.institution}
              </p>
              <div className="text-xs text-[#6e6e73] mt-1 flex flex-wrap items-center gap-2">
                <span>{PERSONAL_INFO.education.university}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] text-[#86868b]">
                  Final CGPA: {PERSONAL_INFO.education.cgpa}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Identity Card */}
          <div className="rounded-3xl bg-[#121214] border border-white/[0.08] p-7 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
              <Icon name="target" size="feature" className="text-purple-400" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#86868b] mb-1">
                Positioning
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                {PERSONAL_INFO.title}
              </h3>
              <p className="text-xs text-[#86868b] mt-1">
                Operating through the {PERSONAL_INFO.platformName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
