'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Projects() {
  const projects = [
    {
      title: 'Rescue Rover',
      category: 'Android App',
      description: 'On-demand ambulance platform with Google Maps APIs and automated failover to national emergency systems.',
      color: 'bg-red-500/10',
      image: '/images/ambulance.png',
      link: 'https://github.com/MohamedAsif07'
    },
    {
      title: 'Udemy Course Bot',
      category: 'Automation & CI/CD',
      description: 'Python Scrapy bot with GitHub actions extracting free courses daily and distributing via Telegram.',
      color: 'bg-[#00FF94]/10',
      image: '/images/udemy.png',
      link: 'https://t.me/Free_udemy_cource_1'
    },
    {
      title: 'Dark Web Crawler',
      category: 'Cybersecurity',
      description: 'Selenium-based crawler extracting and analyzing active Onion links using the Tor Network (SOCKS5).',
      color: 'bg-emerald-500/10',
      image: '/images/darkweb.png',
      link: 'https://github.com/MohamedAsif07/web-scraping-in-tor-'
    },
    {
      title: 'Near Work App',
      category: 'Mobile Development',
      description: 'Localized job matching platform connecting seekers with immediate opportunities using precise geo-location and skill-matching algorithms.',
      color: 'bg-cyan-500/10',
      image: '/images/nearwork.png',
      link: 'https://github.com/MohamedAsif07/Nearwork'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>Selected Work</h2>
      <p className="text-zinc-400 mb-16 text-lg">Case studies demonstrating creative engineering.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <Link 
            href={project.link} 
            key={idx}
            target="_blank"
            className={cn(
              "group relative rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:border-[#00FF94]/30 hover:-translate-y-2 cursor-pointer min-h-[450px] flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)]",
              project.color
            )}
          >
            {/* Image Container */}
            <div className="relative w-full h-64 overflow-hidden">
              <Image 
                src={project.image}
                alt={project.title}
                fill
                priority={idx < 2}
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
              />
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
            </div>

            {/* Content Container */}
            <div className="p-8 relative flex flex-col flex-grow">
              <div className="relative z-10 flex justify-between items-start mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00FF94]/80 group-hover:text-[#00FF94] transition-colors bg-[#00FF94]/10 px-3 py-1 rounded-full border border-[#00FF94]/20">
                  {project.category}
                </span>
                <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors group-hover:scale-110" />
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>{project.title}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}