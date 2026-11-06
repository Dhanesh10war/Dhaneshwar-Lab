import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Icon } from '../components/ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';
import { SpatialCanvas } from '../components/SpatialCanvas';
import { Interactive3DCard } from '../components/Interactive3DCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const HomePage: React.FC = () => {
  const pinnedStoryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion (Rule 7)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Check for mobile viewport to avoid awkward pinning on small screens
      if (window.innerWidth < 768) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>('.story-narrative-card');
      const indicators = gsap.utils.toArray<HTMLElement>('.story-step-indicator');
      const progressBar = document.querySelector<HTMLElement>('.story-progress-fill');

      if (!cards.length) return;

      // Deterministic initial states (Rule 4)
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1, zIndex: 3, pointerEvents: 'auto' });
      gsap.set(cards[1], { opacity: 0, y: 24, scale: 0.95, zIndex: 1, pointerEvents: 'none' });
      gsap.set(cards[2], { opacity: 0, y: 24, scale: 0.95, zIndex: 1, pointerEvents: 'none' });
      if (progressBar) gsap.set(progressBar, { height: '0%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedStoryRef.current,
          start: 'top top',
          end: '+=2000',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Phase 1: Card 01 active & dwell
      tl.to(progressBar, { height: '33%', ease: 'none', duration: 1 })
        .to(indicators[0], { borderColor: '#38bdf8', color: '#ffffff', duration: 0.5 }, 0);

      // Phase 2: Transition Card 01 -> Card 02
      tl.to(cards[0], { opacity: 0, scale: 0.95, y: -20, zIndex: 1, pointerEvents: 'none', duration: 1 })
        .to(cards[1], { opacity: 1, scale: 1, y: 0, zIndex: 3, pointerEvents: 'auto', duration: 1 }, '<')
        .to(progressBar, { height: '50%', ease: 'none', duration: 1 }, '<')
        .to(indicators[0], { borderColor: 'rgba(255,255,255,0.1)', color: '#86868b', duration: 0.5 }, '<')
        .to(indicators[1], { borderColor: '#a855f7', color: '#ffffff', duration: 0.5 }, '<');

      // Phase 3: Card 02 midpoint dwell (fully visible)
      tl.to(progressBar, { height: '66%', ease: 'none', duration: 1 });

      // Phase 4: Transition Card 02 -> Card 03
      tl.to(cards[1], { opacity: 0, scale: 0.95, y: -20, zIndex: 1, pointerEvents: 'none', duration: 1 })
        .to(cards[2], { opacity: 1, scale: 1, y: 0, zIndex: 3, pointerEvents: 'auto', duration: 1 }, '<')
        .to(progressBar, { height: '83%', ease: 'none', duration: 1 }, '<')
        .to(indicators[1], { borderColor: 'rgba(255,255,255,0.1)', color: '#86868b', duration: 0.5 }, '<')
        .to(indicators[2], { borderColor: '#34d399', color: '#ffffff', duration: 0.5 }, '<');

      // Phase 5: Card 03 dwell
      tl.to(progressBar, { height: '100%', ease: 'none', duration: 1 });

      ScrollTrigger.refresh();
    },
    { scope: pinnedStoryRef }
  );

  return (
    <div className="relative">
      {/* Keynote-Grade Hero */}
      <section className="relative min-h-[100svh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden">
        {/* 3D Spatial WebGL Canvas with Performance Budgeting */}
        <SpatialCanvas />

        {/* Ambient Gradient Glow */}
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
            <Link
              to="/lab"
              className="apple-pressable inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-tight hover:bg-[#e5e5ea] shadow-lg shadow-white/10"
            >
              <span>Explore the Lab</span>
              <Icon name="arrow-right" size="action" />
            </Link>

            <Link
              to="/about"
              className="apple-pressable inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#18181b]/80 backdrop-blur-md text-white border border-white/[0.12] hover:bg-[#202024] font-medium text-sm tracking-tight"
            >
              <Icon name="user-round" size="action" className="text-blue-400" />
              <span>About Me</span>
            </Link>
          </motion.div>

          {/* 4 Strategic Pillars with Unified Vector Icons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="mt-14 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center"
          >
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center">
              <Icon name="cpu" size="action" className="text-blue-400 mb-1.5" />
              <div className="text-sm font-semibold tracking-tight text-white">Technology</div>
              <div className="text-xs text-[#86868b] mt-0.5">Software & AI</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center">
              <Icon name="blocks" size="action" className="text-emerald-400 mb-1.5" />
              <div className="text-sm font-semibold tracking-tight text-white">Products</div>
              <div className="text-xs text-[#86868b] mt-0.5">Discovery & Build</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center">
              <Icon name="compass" size="action" className="text-purple-400 mb-1.5" />
              <div className="text-sm font-semibold tracking-tight text-white">Research</div>
              <div className="text-xs text-[#86868b] mt-0.5">Markets & Ideas</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center">
              <Icon name="trending-up" size="action" className="text-amber-400 mb-1.5" />
              <div className="text-sm font-semibold tracking-tight text-white">Ventures</div>
              <div className="text-xs text-[#86868b] mt-0.5">Strategy & Models</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GSAP ScrollTrigger Pinned Narrative Section (Rule 4) */}
      <section
        ref={pinnedStoryRef}
        className="relative py-20 px-6 max-w-6xl mx-auto border-t border-white/[0.06] min-h-[100svh] flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left Column: Pinned Story Tracker */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#86868b] mb-3">
                <Icon name="sparkles" size="action" className="text-blue-400" />
                <span>Interactive Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
                Disciplined Architecture to Scaled Impact
              </h2>
              <p className="text-sm text-[#86868b] leading-relaxed max-w-sm font-normal mb-8">
                Scroll to traverse the core engineering principles and strategic methodologies that guide my work.
              </p>
            </div>

            {/* Vertical Progress Tracker */}
            <div className="relative pl-6 space-y-6">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-white/[0.08]">
                <div className="story-progress-fill w-full bg-gradient-to-b from-blue-400 via-purple-400 to-emerald-400 h-0 transition-all duration-100" />
              </div>

              <div className="story-step-indicator text-xs font-semibold tracking-wider uppercase text-white border-l-2 border-blue-400 pl-4 py-1 transition-colors">
                01 Architecture
              </div>
              <div className="story-step-indicator text-xs font-semibold tracking-wider uppercase text-[#86868b] border-l-2 border-white/[0.1] pl-4 py-1 transition-colors">
                02 Autonomous Intelligence
              </div>
              <div className="story-step-indicator text-xs font-semibold tracking-wider uppercase text-[#86868b] border-l-2 border-white/[0.1] pl-4 py-1 transition-colors">
                03 Digital Products
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Cards Transitioning on Scroll */}
          <div className="md:col-span-7 relative min-h-[380px] flex items-center justify-center">
            {/* Story Card 01 */}
            <div className="story-narrative-card w-full p-8 md:p-10 rounded-[2rem] bg-[#121318] border border-white/[0.08] shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <Icon name="cpu" size="feature" className="text-blue-400" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Foundations
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight mt-4 mb-3">
                High-Performance Software Engineering
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed font-normal">
                Designing distributed systems with clean abstractions, fault tolerance, and zero-compromise runtime performance. Focusing on low-latency data structures and resilient platform plumbing.
              </p>
            </div>

            {/* Story Card 02 */}
            <div className="story-narrative-card absolute inset-0 w-full p-8 md:p-10 rounded-[2rem] bg-[#14121a] border border-white/[0.08] shadow-2xl opacity-0 translate-y-6 scale-95 pointer-events-none">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                <Icon name="workflow" size="feature" className="text-purple-400" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                Cognition
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight mt-4 mb-3">
                Agentic Workflows & Model Architecture
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed font-normal">
                Harnessing state-of-the-art multimodal AI, deterministic tool orchestration, and autonomous agent systems to solve non-trivial analytical problems with high fidelity.
              </p>
            </div>

            {/* Story Card 03 */}
            <div className="story-narrative-card absolute inset-0 w-full p-8 md:p-10 rounded-[2rem] bg-[#0e1614] border border-white/[0.08] shadow-2xl opacity-0 translate-y-6 scale-95 pointer-events-none">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <Icon name="blocks" size="feature" className="text-emerald-400" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Commercial Reality
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight mt-4 mb-3">
                Sustainable Product & Venture Execution
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed font-normal">
                Translating raw technological capability into elegant, user-centric software and commercially viable digital ventures with durable economics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Focus Preview Section with 3D Tilt Cards */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#86868b] mb-2">
              <Icon name="sparkles" size="action" className="text-blue-400" />
              <span>Current Exploration</span>
            </div>
            <h2 className="headline-title text-white">
              {PERSONAL_INFO.currentFocus.heading}
            </h2>
          </div>

          <Link
            to="/lab"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors apple-pressable"
          >
            <span>View All Lab Areas</span>
            <Icon name="arrow-right" size="action" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSONAL_INFO.areasOfFocus.slice(0, 3).map((area) => (
            <Interactive3DCard key={area.id} glowColor={area.accentColor}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#86868b] bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
                    Focus
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{area.title}</h3>
                <p className="text-xs font-medium text-blue-400/90 mb-3">{area.tagline}</p>
                <p className="text-xs text-[#86868b] leading-relaxed line-clamp-3">{area.description}</p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/[0.05] flex items-center justify-between text-xs text-[#86868b]">
                <span>{area.tags[0]}</span>
                <Link to="/lab" className="text-white hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Learn more</span>
                  <Icon name="arrow-right" size={13} />
                </Link>
              </div>
            </Interactive3DCard>
          ))}
        </div>
      </section>

      {/* Philosophy Teaser Banner */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="rounded-[2.5rem] bg-gradient-to-b from-[#16161a] to-[#0d0d10] border border-white/[0.08] p-10 md:p-14 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#86868b] mb-4">
              Core Philosophy
            </div>
            <p className="text-xl md:text-2xl font-medium text-white tracking-tight leading-snug mb-8">
              "{PERSONAL_INFO.philosophy}"
            </p>
            <Link
              to="/about"
              className="apple-pressable inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-[#e5e5ea]"
            >
              <span>Read Full Background</span>
              <Icon name="arrow-right" size="action" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
