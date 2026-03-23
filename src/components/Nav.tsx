'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Projects', 'Skills', 'About', 'Terminal', 'Game', 'Contact'];

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#00FF94] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#121212]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="text-[#00FF94] font-mono font-bold text-2xl tracking-tighter hover:scale-105 active:scale-95 transition-transform">
            MA
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-zinc-400 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                {link}
              </a>
            ))}
          </div>
          
          <a 
            href="#contact"
            className="border border-[#00FF94] text-[#00FF94] px-4 py-2 rounded-lg hover:bg-[#00FF94] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] transition-all duration-200 text-sm font-bold active:scale-95"
          >
            Hire Me →
          </a>
        </div>
      </nav>
    </>
  );
}
