import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { MOTION_TOKENS } from '../styles/motion-tokens';
import { PERSONAL_INFO } from '../data/portfolio-data';

interface BrandedPreloaderProps {
  onComplete: () => void;
}

export const BrandedPreloader: React.FC<BrandedPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Immediate bypass for reduced motion users (Rule 7)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Connect to Three.js DefaultLoadingManager for real asset tracking (Rule 3)
    let currentLoaded = 0;
    let currentTotal = 1;

    THREE.DefaultLoadingManager.onProgress = (_url, itemsLoaded, itemsTotal) => {
      currentLoaded = itemsLoaded;
      currentTotal = itemsTotal;
      const pct = Math.min(100, Math.round((currentLoaded / currentTotal) * 100));
      setProgress(pct);
    };

    THREE.DefaultLoadingManager.onLoad = () => {
      setProgress(100);
      setTimeout(() => setIsReady(true), 350);
    };

    // Fallback: If no heavy assets are pending, track DOM window load
    const handleWindowLoad = () => {
      if (progress < 100) {
        setProgress(100);
        setTimeout(() => setIsReady(true), 350);
      }
    };

    if (document.readyState === 'complete') {
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    // Allow user to skip intro with Escape key (Rule 7)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReady(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  // When animation finishes, notify parent
  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isReady && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: {
              duration: MOTION_TOKENS.duration.slow,
              ease: MOTION_TOKENS.ease.out,
            },
          }}
          className="fixed inset-0 z-50 bg-[#060608] flex flex-col justify-between p-8 md:p-14 text-white overflow-hidden select-none"
        >
          {/* Subtle noise and radial background */}
          <div className="absolute inset-0 bg-radial from-blue-950/20 via-transparent to-transparent pointer-events-none" />

          {/* Top Bar: Studio Name and Skip Control */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#86868b]">
                {PERSONAL_INFO.platformName}
              </span>
            </div>

            <button
              onClick={() => setIsReady(true)}
              className="text-xs font-mono text-[#86868b] hover:text-white transition-colors px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]"
              aria-label="Skip preloader intro"
            >
              Skip Intro [Esc]
            </button>
          </div>

          {/* Center: Typographic Architectural Reveal (No Spinner) */}
          <div className="max-w-3xl my-auto z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
              Initializing Spatial Matrix
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              {PERSONAL_INFO.headline}
            </h1>

            <div className="flex items-baseline gap-4 font-mono">
              <span className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                {progress.toString().padStart(3, '0')}
              </span>
              <span className="text-sm text-[#86868b] uppercase tracking-wider">
                % Loaded
              </span>
            </div>
          </div>

          {/* Bottom Bar: Progress Indicator */}
          <div className="z-10 w-full">
            <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-[#6e6e73] mt-3">
              <span>Three.js Engine</span>
              <span>120 FPS Target</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrandedPreloader;
