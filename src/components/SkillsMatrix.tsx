'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = ['All', 'Mobile', 'Security', 'Automation', 'Design', 'DevOps'];
const skills = [
  { name: 'Android', value: 95, category: 'Mobile', color: '#00FF94' },
  { name: 'Kotlin', value: 90, category: 'Mobile', color: '#00FF94' },
  { name: 'Java', value: 88, category: 'Mobile', color: '#00FF94' },
  { name: 'Firebase', value: 85, category: 'Mobile', color: '#00FF94' },
  { name: 'Google Maps API', value: 80, category: 'Mobile', color: '#00FF94' },
  
  { name: 'Python', value: 92, category: 'Automation', color: '#00FF94' },
  { name: 'Scrapy', value: 88, category: 'Automation', color: '#00FF94' },
  { name: 'Selenium', value: 85, category: 'Automation', color: '#00FF94' },
  { name: 'Tor/SOCKS5', value: 75, category: 'Automation', color: '#00FF94' },
  
  { name: 'Wireshark', value: 70, category: 'Security', color: '#FF6B35' },
  { name: 'Kali Linux', value: 80, category: 'Security', color: '#FF6B35' },
  { name: 'OSINT', value: 75, category: 'Security', color: '#FF6B35' },
  { name: 'Dark Web Analysis', value: 65, category: 'Security', color: '#FF6B35' },
  
  { name: 'GitHub Actions', value: 85, category: 'DevOps', color: '#00FF94' },
  { name: 'CI/CD', value: 80, category: 'DevOps', color: '#00FF94' },
  { name: 'Linux CLI', value: 88, category: 'DevOps', color: '#00FF94' },
  { name: 'Git', value: 92, category: 'DevOps', color: '#00FF94' },
  
  { name: 'Figma', value: 75, category: 'Design', color: '#00FF94' },
  { name: 'Material Design', value: 82, category: 'Design', color: '#00FF94' },
  { name: 'UI/UX', value: 78, category: 'Design', color: '#00FF94' }
];

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredSkills = activeTab === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>Technical Arsenal</h2>
        <p className="text-zinc-400">Core competencies and specializations.</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        {categories.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
              activeTab === tab 
                ? 'bg-[#00FF94] text-black font-bold shadow-[0_0_15px_rgba(0,255,148,0.4)]' 
                : 'border border-white/10 text-white/60 hover:text-white hover:border-[#00FF94]/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        {filteredSkills.map((skill, i) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            key={skill.name}
            className="group relative bg-white/[0.02] border border-[#00FF94]/10 rounded-2xl p-6 flex flex-col items-center justify-center aspect-square backdrop-blur-sm hover:bg-white/[0.05] hover:border-[#00FF94]/50 hover:-translate-y-2 transition-all cursor-crosshair"
          >
            {/* SVG Arc Progress */}
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-white/10" strokeWidth="6" fill="transparent" />
                <motion.circle 
                  cx="50" cy="50" r="40"
                  stroke={skill.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ strokeDasharray: "0 251.2" }}
                  whileInView={{ strokeDasharray: `${(skill.value / 100) * 251.2} 251.2` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.05 + 0.2 }}
                  className="drop-shadow-[0_0_8px_rgba(0,255,148,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold text-white tracking-tighter">
                {skill.value}%
              </div>
            </div>
            
            <h3 className="font-bold text-center text-sm" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {skill.name}
            </h3>
            
            {/* Hover Tooltip */}
            <div className="absolute inset-x-0 -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center shadow-xl pointer-events-none z-10 whitespace-nowrap font-mono scale-90 group-hover:scale-100">
              [ {skill.name}: {skill.value}% ]
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
