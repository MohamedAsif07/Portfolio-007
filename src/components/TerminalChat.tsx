'use client';

import { useState, useRef, useEffect } from 'react';
import { askAsifAI } from '@/lib/gemini';
import { Terminal } from 'lucide-react';

type Message = { role: 'user' | 'model'; content: string };

const CANNED_RESPONSES: Record<string, string> = {
  'whoami': 'Mohammed Asif | Android Dev | Cyber Enthusiast | Automation Wizard',
  'ls projects/': 'rescue_rover/  udemy_bot/  dark_web_crawler/  [20+ more on GitHub]',
  'cat skills.txt': `
MOBILE....: Android, Kotlin, Java, Firebase
AUTOMATION: Python, Scrapy, Selenium
SECURITY..: Wireshark, Kali Linux, OSINT
DEVOPS....: GitHub Actions, Linux CLI, Git
`.trim(),
  'ping asif': "PING asif (93.44.0.58): 56 bytes... Reply: I'm available for hire!",
  './hire_me.sh': "Executing... Email: mohamedasifappdev@gmail.com | Status: OPEN TO WORK"
};

const SUGGESTIONS = Object.keys(CANNED_RESPONSES);

export default function TerminalChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Connection established. Type a command or ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent | string) => {
    let cmd = '';
    if (typeof e === 'string') {
      cmd = e;
    } else {
      e.preventDefault();
      cmd = input;
    }
    
    cmd = cmd.trim();
    if (!cmd) return;

    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: cmd }];
    setMessages(newMessages);

    setIsTyping(true);

    if (CANNED_RESPONSES[cmd]) {
      setTimeout(() => {
        setMessages([...newMessages, { role: 'model', content: CANNED_RESPONSES[cmd] }]);
        setIsTyping(false);
      }, 400);
      return;
    }

    try {
      const responseText = await askAsifAI(newMessages.slice(-10), cmd);
      setMessages([...newMessages, { role: 'model', content: responseText }]);
    } catch {
      setMessages([...newMessages, { role: 'model', content: "Connection timeout. Try: mohamedasifappdev@gmail.com" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>Interact with Asif-AI</h2>
        <p className="text-zinc-400">Powered by Gemini 2.0 Flash</p>
      </div>

      <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative scanlines">
        {/* Title Bar */}
        <div className="bg-[#1A1A1A] px-4 py-3 flex items-center border-b border-white/5 relative z-20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> asif@portfolio:~$ — ZSH
            </span>
          </div>
        </div>

        {/* Console Area */}
        <div 
          ref={scrollRef}
          className="p-6 h-96 overflow-y-auto font-mono text-sm leading-relaxed relative z-20"
          style={{ fontFamily: 'var(--font-syne-mono), monospace' }}
        >
          <div className="flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col">
                {msg.role === 'user' && (
                  <div className="text-zinc-400">
                    <span className="text-[#00FF94]">guest@asif:~$</span> <span className="text-white">{msg.content}</span>
                  </div>
                )}
                {msg.role === 'model' && (
                  <div className="text-zinc-300 whitespace-pre-wrap ml-4 opacity-90 border-l border-white/10 pl-4 py-1 mt-1">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="text-zinc-500 ml-4 border-l border-white/10 pl-4 py-1">
                Asif-AI is thinking<span className="animate-pulse">...</span>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#111111] border-t border-white/5 relative z-20">
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTIONS.map(sug => (
              <button 
                key={sug}
                onClick={() => handleSubmit(sug)}
                className="bg-white/5 hover:bg-[#00FF94]/20 hover:text-[#00FF94] text-xs font-mono px-3 py-1.5 rounded text-zinc-400 transition-colors border border-white/10 hover:border-[#00FF94]/30"
              >
                {sug}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-[#00FF94] font-mono text-sm mr-2 flex-shrink-0 cursor">
              guest@asif:~$ 
            </span>
            <input 
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full bg-transparent outline-none text-white font-mono text-sm caret-[#00FF94]"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}
