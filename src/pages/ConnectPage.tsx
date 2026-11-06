import React, { useState } from 'react';
import { Icon } from '../components/ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';
import { Interactive3DCard } from '../components/Interactive3DCard';

export const ConnectPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const interestPillars = [
    { title: "Software & AI", desc: "Technical architectures, AI applications, and systems exploration.", icon: "cpu" as const },
    { title: "Product Development", desc: "Discovery, problem framing, and building functional prototypes.", icon: "blocks" as const },
    { title: "Research & Industry", desc: "Emerging technological shifts, market trends, and deep inquiries.", icon: "compass" as const },
    { title: "Venture Opportunities", desc: "Business models, entrepreneurial ideas, and collaborative ventures.", icon: "trending-up" as const },
  ];

  return (
    <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-4 backdrop-blur-md">
          <Icon name="sparkles" size="action" />
          <span>Connect & Collaborate</span>
        </div>

        <h1 className="headline-title text-white tracking-tight font-semibold mb-4">
          Let's explore what's possible.
        </h1>

        <p className="text-sm md:text-base text-[#86868b] leading-relaxed">
          I'm interested in connecting with people working on technology, products, research, innovation and entrepreneurship. Open to relevant professional opportunities, collaborations and interesting ideas.
        </p>
      </div>

      {/* Primary Communication Channel Cards with Standardized Vector Brand Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Email Card */}
        <Interactive3DCard glowColor="from-blue-600/20 via-cyan-500/10 to-transparent">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400 mb-6">
              <Icon name="mail" size="feature" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
              Direct Inquiries
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
              Email Dispatch
            </h3>
            <p className="text-xs text-[#86868b] break-all font-mono mb-6">
              {PERSONAL_INFO.email}
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/[0.05]">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="w-full apple-pressable inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-tight hover:bg-[#e5e5ea]"
            >
              <Icon name="mail" size="action" />
              <span>Send Email</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="w-full apple-pressable inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08] text-xs font-medium tracking-tight"
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Icon name="check" size="action" className="text-emerald-400" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Icon name="copy" size="action" className="text-[#86868b]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </Interactive3DCard>

        {/* LinkedIn Card with Official Vector Brand Mark */}
        <Interactive3DCard glowColor="from-blue-600/20 via-indigo-500/10 to-transparent">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400 mb-6">
              <Icon name="linkedin" size="feature" label="LinkedIn" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
              Professional Network
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
              LinkedIn
            </h3>
            <p className="text-xs text-[#86868b] leading-relaxed mb-6">
              Connect for professional inquiries, technology discussions, and industry networking.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.05]">
            <a
              href="https://www.linkedin.com/in/dhaneshwar-r/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Dhaneshwar's LinkedIn profile"
              className="w-full apple-pressable inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.12] text-xs font-medium tracking-tight"
            >
              <span>View Profile</span>
              <Icon name="arrow-up-right" size="action" />
            </a>
          </div>
        </Interactive3DCard>

        {/* GitHub Card with Official Vector Brand Mark */}
        <Interactive3DCard glowColor="from-purple-600/20 via-pink-500/10 to-transparent">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-purple-400 mb-6">
              <Icon name="github" size="feature" label="GitHub" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
              Code & Systems
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
              GitHub
            </h3>
            <p className="text-xs text-[#86868b] leading-relaxed mb-6">
              Explore public repositories, software experiments, and open-source contributions.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.05]">
            <a
              href="https://github.com/Dhanesh10war"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Dhaneshwar's GitHub repositories"
              className="w-full apple-pressable inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.12] text-xs font-medium tracking-tight"
            >
              <span>View Repositories</span>
              <Icon name="arrow-up-right" size="action" />
            </a>
          </div>
        </Interactive3DCard>
      </div>

      {/* Collaboration Scope Overview */}
      <section className="rounded-[2.5rem] bg-[#121214] border border-white/[0.08] p-8 md:p-12">
        <div className="flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-[#86868b] mb-4">
          <Icon name="message-square" size="action" className="text-blue-400" />
          <span>Collaboration Vectors</span>
        </div>
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-8">
          Areas of Mutual Interest
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interestPillars.map((pillar, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] shrink-0 mt-0.5">
                <Icon name={pillar.icon} size="action" className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-1">{pillar.title}</div>
                <p className="text-xs text-[#86868b] leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
