import React from 'react';
import { Icon } from '../components/ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';
import { PrismCanvas } from '../components/PrismCanvas';
import { Interactive3DCard } from '../components/Interactive3DCard';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 px-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold tracking-wider text-blue-400 uppercase mb-4 backdrop-blur-md">
          <Icon name="compass" size="action" />
          <span>Identity & Philosophy</span>
        </div>
        <h1 className="headline-title text-white tracking-tight font-semibold mb-3">
          About Dhaneshwar
        </h1>
        <p className="text-sm md:text-base text-[#86868b] leading-relaxed">
          {PERSONAL_INFO.title} operating through the {PERSONAL_INFO.platformName}.
        </p>
      </div>

      {/* Floating 3D Prism Visual */}
      <div className="mb-12">
        <PrismCanvas />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Left Column: Full Professional Biography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-[2.5rem] bg-[#121214] border border-white/[0.08] p-8 md:p-10">
            <h2 className="text-xl font-semibold text-white tracking-tight mb-6 flex items-center gap-2.5">
              <Icon name="book-open" size="standard" className="text-blue-400" />
              <span>Professional Biography</span>
            </h2>

            <div className="space-y-4 text-sm md:text-base text-[#a1a1a6] leading-relaxed font-normal">
              {PERSONAL_INFO.bio.map((paragraph, index) => (
                <p key={index} className="text-[#a1a1a6]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Cards for Philosophy & Education */}
        <div className="lg:col-span-5 space-y-6">
          {/* Professional Philosophy */}
          <Interactive3DCard glowColor="from-blue-600/20 via-cyan-500/10 to-transparent">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400 mb-5">
                <Icon name="lightbulb" size="feature" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
                Guiding Mindset
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-3">
                Professional Philosophy
              </h3>
              <p className="text-xs text-[#a1a1a6] leading-relaxed">
                "{PERSONAL_INFO.philosophy}"
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-white/[0.05] text-[11px] text-[#6e6e73] flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-white/[0.03]">Curiosity</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03]">Purpose</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03]">Experimentation</span>
            </div>
          </Interactive3DCard>

          {/* Education Card */}
          <Interactive3DCard glowColor="from-emerald-600/20 via-teal-500/10 to-transparent">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400 mb-5">
                <Icon name="graduation-cap" size="feature" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
                Academic Background
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                {PERSONAL_INFO.education.degree} in {PERSONAL_INFO.education.specialization}
              </h3>
              <p className="text-xs text-[#86868b] mt-1.5 font-normal">
                {PERSONAL_INFO.education.institution}
              </p>
              <div className="text-xs text-[#6e6e73] mt-2 flex flex-wrap items-center gap-2">
                <span>{PERSONAL_INFO.education.university}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] text-[#86868b]">
                  Final CGPA: {PERSONAL_INFO.education.cgpa}
                </span>
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-white/[0.05] text-[11px] text-[#6e6e73]">
              Information Technology Foundation
            </div>
          </Interactive3DCard>

          {/* Long-term Platform Positioning */}
          <Interactive3DCard glowColor="from-purple-600/20 via-indigo-500/10 to-transparent">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-purple-400 mb-5">
                <Icon name="target" size="feature" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
                Platform Architecture
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                {PERSONAL_INFO.platformName}
              </h3>
              <p className="text-xs text-[#86868b] mt-1.5 leading-relaxed font-normal">
                Serving as the central digital foundation for technology projects, research notes, and future venture developments.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-white/[0.05] text-[11px] text-[#6e6e73]">
              {PERSONAL_INFO.secondaryTagline}
            </div>
          </Interactive3DCard>
        </div>
      </div>
    </div>
  );
};
