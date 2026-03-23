'use client';

import { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Globe, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: form */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>Open a Channel</h2>
          <p className="text-zinc-400 mb-8 max-w-md">Send a transmission to discuss open source, security research, or full-time roles.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input 
                  {...register('name', { required: true })}
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 transition-all outline-none"
                />
                {errors.name && <span className="text-red-400 text-xs mt-1">Required</span>}
              </div>
              <div>
                <input 
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 transition-all outline-none"
                />
                {errors.email && <span className="text-red-400 text-xs mt-1">Valid email required</span>}
              </div>
            </div>
            
            <div>
              <select 
                {...register('subject', { required: true })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 transition-all outline-none appearance-none"
                defaultValue=""
              >
                <option value="" disabled hidden>Select Subject</option>
                <option value="Job Offer">Job Offer</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Open Source">Open Source</option>
                <option value="Just Saying Hi">Just Saying Hi</option>
              </select>
              {errors.subject && <span className="text-red-400 text-xs mt-1">Required</span>}
            </div>

            <div>
              <textarea 
                {...register('message', { required: true, minLength: 10 })}
                placeholder="Your Message..." 
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 transition-all outline-none resize-none"
              />
              {errors.message && <span className="text-red-400 text-xs mt-1">Message too short</span>}
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full md:w-auto bg-[#00FF94] text-black font-bold flex items-center justify-center gap-3 rounded-xl px-8 py-4 hover:bg-[#00FF94]/90 hover:shadow-[0_0_30px_rgba(0,255,148,0.4)] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Transmission →'}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-[#00FF94] font-mono text-sm mt-4 animate-pulse">
                <CheckCircle2 className="w-4 h-4" /> Transmission received. Asif will respond within 24h.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 font-mono text-sm mt-4">
                <AlertCircle className="w-4 h-4" /> Signal lost. Try directly: mohamedasifappdev@gmail.com
              </div>
            )}
          </form>
        </div>

        {/* RIGHT: Info */}
        <div className="flex flex-col gap-4 justify-center">
          <ContactCard icon={<Mail />} label="mohamedasifappdev@gmail.com" action="mailto:mohamedasifappdev@gmail.com" />
          <ContactCard icon={<Phone />} label="+91 93440 58212" action="tel:+919344058212" />
          <ContactCard icon={<Github />} label="github.com/MohamedAsif07" action="https://github.com/MohamedAsif07" />
          <ContactCard icon={<Linkedin />} label="linkedin.com/in/mohamed-asif-8a0a81294" action="https://linkedin.com/in/mohamed-asif-8a0a81294" />
          <ContactCard icon={<Globe className="animate-[spin_4s_linear_infinite]" />} label="asifappdev.tech" action="https://asifappdev.tech" />
          
          <div className="flex items-center gap-3 mt-8 bg-white/5 border border-white/10 rounded-full px-6 py-3 w-fit">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF94]"></span>
            </span>
            <span className="text-zinc-300 font-mono text-sm">Available for freelance & full-time roles</span>
          </div>
        </div>

      </div>
    </div>
  );
}

function ContactCard({ icon, label, action }: { icon: React.ReactNode, label: string, action: string }) {
  return (
    <a 
      href={action} 
      target={action.startsWith('http') ? '_blank' : '_self'}
      rel="noreferrer"
      className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FF94]/40 hover:bg-[#00FF94]/5 transition-all w-full"
    >
      <div className="w-10 h-10 rounded-lg bg-[#00FF94]/10 flex items-center justify-center text-[#00FF94] group-hover:rotate-[360deg] transition-transform duration-700">
        <div className="w-5 h-5">{icon}</div>
      </div>
      <span className="text-zinc-300 font-medium group-hover:text-white transition-colors truncate">
        {label}
      </span>
    </a>
  );
}
