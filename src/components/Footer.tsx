'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useKonami } from '@/lib/useKonami';

export default function Footer() {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const wordRef = useRef('');

  useKonami(() => {
    console.log("🎮 You found the Easter Egg! Asif says: 'git push --force && pray'");
    setEasterEggActive(true);
    setTimeout(() => setEasterEggActive(false), 5000);
  });

  useEffect(() => {
    const handleKeyDown = (e?: KeyboardEvent | Event) => {
      if (e && 'key' in e && typeof e.key === 'string' && e.key.length === 1) {
        wordRef.current = (wordRef.current + e.key).slice(-11);
        if (wordRef.current.toLowerCase() === 'antigravity') {
          activateAntigravity();
          wordRef.current = '';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown as EventListener);
    return () => window.removeEventListener('keydown', handleKeyDown as EventListener);
  }, []);

  const activateAntigravity = () => {
    console.log("🚀 Antigravity mode activated. Everything goes up from here.");
    document.body.classList.add('floating');
    setTimeout(() => {
      document.body.classList.remove('floating');
    }, 3000);
  };

  return (
    <footer className="w-full border-t border-[#00FF94]/10 bg-[#121212] pt-24 pb-8 px-6 md:px-12 relative overflow-hidden">
      {/* Easter Egg Notice */}
      {easterEggActive && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#00FF94] text-black font-mono px-6 py-3 rounded-xl z-50 animate-bounce font-bold shadow-[0_0_30px_#00FF94]">
          [ SECRET UNLOCKED ]: git push --force && pray
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
          <div>
            <h2 className="text-5xl md:text-8xl font-black text-white cursor-pointer hover:text-white/80 transition-colors"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
                onClick={(e) => {
                  if (e.detail === 3) activateAntigravity();
                }}>
              LET'S BUILD SOMETHING
            </h2>
            <h2 className="text-4xl md:text-7xl font-black text-[#00FF94]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              TOGETHER.
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-8">
          <div className="text-zinc-500 font-mono text-sm flex flex-col gap-2 text-center md:text-left">
            <span>Mohammed Asif © 2026</span>
            <span>Built with Next.js & ☕</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/MohamedAsif07" target="_blank" area-label="GitHub" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:border-[#00FF94] hover:text-[#00FF94] hover:-translate-y-1 active:scale-95 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/mohamed-asif-8a0a81294" target="_blank" area-label="LinkedIn" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:border-[#00FF94] hover:text-[#00FF94] hover:-translate-y-1 active:scale-95 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:mohamedasifappdev@gmail.com" area-label="Email" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:border-[#00FF94] hover:text-[#00FF94] hover:-translate-y-1 active:scale-95 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="w-full text-center mt-12">
          <span className="text-xs text-zinc-600 uppercase tracking-widest font-mono">
            Made with obsessive attention to detail · Chennai, India
          </span>
        </div>
      </div>
    </footer>
  );
}
