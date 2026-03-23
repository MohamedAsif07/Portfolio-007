'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function useCountUp(end: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const easeOutQuad = (t: number) => t * (2 - t);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(easeOutQuad(progress) * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, setHasStarted };
}

function Counter({ end, suffix = '', label, icon }: { end: number, suffix?: string, label: string, icon: string }) {
  const { count, setHasStarted } = useCountUp(end);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasStarted(true)}
      className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl cursor-default hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-300 group"
    >
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="text-5xl md:text-6xl font-bold text-[#00FF94] font-mono mb-2 drop-shadow-[0_0_15px_rgba(0,255,148,0.2)]">
        {count}{suffix}
      </div>
      <div className="text-xs text-white/50 group-hover:text-white/80 transition-colors tracking-widest uppercase text-center">
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const stats = [
    { icon: '🏆', count: 2, label: 'Hackathons Won' },
    { icon: '👨‍💻', count: 20, suffix: '+', label: 'Open Source Projects' },
    { icon: '🎓', count: 150, suffix: '+', label: 'Students Helped' },
    { icon: '⚡', count: 50, suffix: '+', label: 'Daily Courses' },
    { icon: '🔐', count: 3, suffix: '+', label: 'Tech Events' },
  ];

  const certs = [
    "🔐 Web Scraping Automation (BeautifulSoup & Selenium)",
    "🛡️ Cybersecurity Fundamentals",
    "📱 Android App Development Bootcamp — Udemy",
    "🐍 Python for Automation",
    "🌐 REST API Design & Integration"
  ];

  return (
    <div className="w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <Counter key={i} end={stat.count} suffix={stat.suffix} label={stat.label} icon={stat.icon} />
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden bg-[#00FF94]/[0.02] border-y border-[#00FF94]/10 py-6">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] cursor-default">
          {[...certs, ...certs, ...certs].map((cert, idx) => (
            <div key={idx} className="flex items-center mx-8 text-zinc-300 font-mono text-sm whitespace-nowrap hover:text-[#00FF94] transition-colors">
              {cert}
              <span className="mx-8 text-[#00FF94]/50">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
