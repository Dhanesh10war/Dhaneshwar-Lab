import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';

export const Footer: React.FC = () => {
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
    <footer className="py-16 px-6 border-t border-white/[0.06] bg-black text-[#6e6e73] text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-[#86868b] font-medium">
            Copyright {new Date().getFullYear()} {PERSONAL_INFO.name}, {PERSONAL_INFO.platformName}.
          </p>
          <p className="mt-1 text-[#6e6e73]">
            {PERSONAL_INFO.tagline} {PERSONAL_INFO.secondaryTagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link to="/" className="text-[#86868b] hover:text-white transition-colors apple-pressable">
            Overview
          </Link>
          <Link to="/lab" className="text-[#86868b] hover:text-white transition-colors apple-pressable">
            Innovation Lab
          </Link>
          <Link to="/about" className="text-[#86868b] hover:text-white transition-colors apple-pressable">
            About
          </Link>
          <Link to="/connect" className="text-[#86868b] hover:text-white transition-colors apple-pressable">
            Connect
          </Link>

          <span className="hidden sm:inline-block w-px h-3.5 bg-white/10" aria-hidden="true" />

          {PERSONAL_INFO.socials.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="inline-flex items-center gap-1.5 text-[#86868b] hover:text-white transition-colors apple-pressable font-medium"
            >
              <Icon name={getSocialIcon(s.name)} size="action" />
              <span>{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
