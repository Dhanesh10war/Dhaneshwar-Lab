import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon, IconName } from './ui/icon';
import { PERSONAL_INFO } from '../data/portfolio-data';

interface NavItem {
  path: string;
  label: string;
  icon: IconName;
}

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { path: '/', label: 'Overview', icon: 'house' },
    { path: '/lab', label: 'Innovation Lab', icon: 'flask-conical' },
    { path: '/about', label: 'About', icon: 'user-round' },
    { path: '/connect', label: 'Connect', icon: 'mail' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0c]/80 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Anchor */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer apple-pressable"
          aria-label={`${PERSONAL_INFO.name} - Homepage`}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600/30 to-white/10 border border-white/20 flex items-center justify-center text-blue-400 group-hover:border-white/40 transition-colors">
            <Icon name="flask-conical" size={14} className="text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-white/80 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-[#86868b] border border-white/[0.08]">
              Lab
            </span>
          </div>
        </Link>

        {/* Central Navigation Pills with Framer Motion layoutId */}
        <nav
          className="hidden md:flex items-center gap-1 bg-[#161618]/70 backdrop-blur-xl border border-white/[0.08] p-1 rounded-full shadow-inner relative"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-colors z-10 ${
                  isActive ? 'text-black font-semibold' : 'text-[#86868b] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm"
                  />
                )}
                <Icon
                  name={item.icon}
                  size="action"
                  className={isActive ? 'text-black' : 'text-[#86868b] group-hover:text-white'}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/connect"
            className="apple-pressable inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.12] hover:bg-white/[0.15] text-xs font-medium text-white tracking-tight"
          >
            <span>Get in Touch</span>
            <Icon name="arrow-up-right" size="action" className="opacity-80" />
          </Link>
        </div>
      </div>
    </header>
  );
};
