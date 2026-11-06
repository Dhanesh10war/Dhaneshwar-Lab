import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';
import { SpatialCanvas } from './SpatialCanvas';

export const Hero: React.FC = () => {
  return (
    <section id="overview" className="relative min-h-[100svh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* 3D Spatial WebGL Canvas */}
      <SpatialCanvas />

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full my-auto">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-semibold tracking-wider text-[#86868b] uppercase mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>{PERSONAL_INFO.platformName}</span>
        </motion.div>

        {/* Display Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="display-title text-white tracking-tight font-semibold mb-6 max-w-3xl mx-auto"
        >
          {PERSONAL_INFO.headline}
        </motion.h1>

        {/* Lead description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className="subheadline max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {PERSONAL_INFO.intro}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#focus"
            className="apple-pressable inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-tight hover:bg-[#e5e5ea] shadow-lg shadow-white/10"
          >
            <span>Explore the Lab</span>
            <Icon name="arrow-right" size="action" />
          </a>

          <a
            href="#about"
            className="apple-pressable inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#18181b]/80 backdrop-blur-md text-white border border-white/[0.12] hover:bg-[#202024] font-medium text-sm tracking-tight"
          >
            <Icon name="user-round" size="action" className="text-blue-400" />
            <span>About Me</span>
          </a>
        </motion.div>

        {/* Professional Positioning Pillars with Unified Vector Icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center"
        >
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex flex-col items-center">
            <Icon name="cpu" size="action" className="text-blue-400 mb-1.5" />
            <div className="text-sm font-semibold tracking-tight text-white">Technology</div>
            <div className="text-xs text-[#86868b] mt-0.5">Software & AI</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex flex-col items-center">
            <Icon name="blocks" size="action" className="text-emerald-400 mb-1.5" />
            <div className="text-sm font-semibold tracking-tight text-white">Products</div>
            <div className="text-xs text-[#86868b] mt-0.5">Discovery & Build</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex flex-col items-center">
            <Icon name="compass" size="action" className="text-purple-400 mb-1.5" />
            <div className="text-sm font-semibold tracking-tight text-white">Research</div>
            <div className="text-xs text-[#86868b] mt-0.5">Markets & Ideas</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex flex-col items-center">
            <Icon name="trending-up" size="action" className="text-amber-400 mb-1.5" />
            <div className="text-sm font-semibold tracking-tight text-white">Ventures</div>
            <div className="text-xs text-[#86868b] mt-0.5">Strategy & Models</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
