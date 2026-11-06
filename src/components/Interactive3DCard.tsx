import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  glowColor = 'from-blue-600/15 via-cyan-500/10 to-transparent',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6.5deg', '-6.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6.5deg', '6.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
        className={`group relative overflow-hidden rounded-[2rem] bg-[#121214] border border-white/[0.08] p-8 hover:border-white/[0.22] transition-colors will-change-transform ${className}`}
      >
        {/* Dynamic Glow Aura */}
        <div
          className={`absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br ${glowColor} blur-3xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none`}
        />

        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
