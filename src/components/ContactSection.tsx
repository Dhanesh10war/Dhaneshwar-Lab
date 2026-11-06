import React, { useState } from 'react';
import { Icon } from './ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return 'github' as const;
      case 'linkedin':
        return 'linkedin' as const;
      default:
        return 'mail' as const;
    }
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-white/[0.06] max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>Connect & Collaborate</span>
      </div>

      <h2 className="headline-title text-white mb-6">
        Let's explore what's possible.
      </h2>

      <p className="subheadline max-w-2xl mx-auto mb-10 leading-relaxed font-normal text-sm md:text-base">
        I'm interested in connecting with people working on technology, products, research, innovation and entrepreneurship. Open to relevant professional opportunities, collaborations and interesting ideas.
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="apple-pressable inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-tight hover:bg-[#e5e5ea] shadow-lg shadow-white/10"
        >
          <Icon name="mail" size="action" />
          <span>Send an Email</span>
        </a>

        <button
          onClick={handleCopyEmail}
          className="apple-pressable inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#18181b] text-white border border-white/[0.12] hover:bg-[#202024] font-medium text-sm tracking-tight"
          aria-label="Copy email address to clipboard"
        >
          {copied ? (
            <>
              <Icon name="check" size="action" className="text-emerald-400" />
              <span>Email Copied!</span>
            </>
          ) : (
            <>
              <Icon name="copy" size="action" className="text-[#86868b]" />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>

      {/* Network Links with Official Brand Vectors */}
      <div className="flex items-center justify-center gap-8 pt-8 border-t border-white/[0.06] text-xs text-[#86868b]">
        {PERSONAL_INFO.socials.map((s, idx) => (
          <a
            key={idx}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Connect via ${s.name}`}
            className="inline-flex items-center gap-2 hover:text-white transition-colors apple-pressable font-medium"
          >
            <Icon name={getSocialIcon(s.name)} size="action" label={s.name} />
            <span>{s.name}</span>
            <Icon name="arrow-up-right" size={13} className="opacity-70" />
          </a>
        ))}
      </div>
    </section>
  );
};
