'use client';

import { motion } from 'framer-motion';

const timelineData = [
  {
    date: '2025 Jul',
    role: 'UI/UX Design Intern — BigBucks',
    desc: "Designed user-centered mobile/web interfaces. Built wireframes and interactive prototypes. Worked closely with devs to ship designs accurately.",
    icon: '🎨',
    tag: 'Internship'
  },
  {
    date: '2024',
    role: 'Android Dev & Technical Mentor',
    desc: "Built Android apps with clean, maintainable code. Guided 50+ students in Firebase, APIs, GPS integration. Applied Material Design standards throughout.",
    icon: '📱',
    tag: 'Student Lead'
  },
  {
    date: '2022–2026',
    role: 'B.E. Computer Science — KCG College',
    desc: "Specializing in mobile systems, security & automation. Hackathon winner × 2. Active open-source contributor.",
    icon: '🎓',
    tag: 'Education'
  },
  {
    date: '2022',
    role: 'NSVV Matric Higher Secondary School',
    desc: "Computer Science Group. Foundation in programming.",
    icon: '📚',
    tag: 'Education'
  }
];

export default function Timeline() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 relative py-12">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>Journey So Far</h2>
        <p className="text-zinc-400">Education and Experience over the years.</p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
        
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`flex flex-col md:flex-row items-center mb-16 relative ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#00FF94] shadow-[0_0_12px_#00FF94] hidden md:block z-10 animate-pulse" />
              
              <div className={`w-full md:w-[45%] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#00FF94]/30 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 relative group`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#00FF94] font-mono text-sm group-hover:scale-105 transition-transform origin-left">{item.date}</span>
                  <span className="text-xs font-mono bg-[#00FF94]/10 text-[#00FF94] rounded-full px-3 py-1 border border-[#00FF94]/20 group-hover:bg-[#00FF94]/20 transition-colors">
                    {item.tag}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{item.icon}</span>
                  {item.role}
                </h3>
                
                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
