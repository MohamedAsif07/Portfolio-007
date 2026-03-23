import Nav from '@/components/Nav';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import Projects from '@/components/Projects';
import SkillsMatrix from '@/components/SkillsMatrix';
import Timeline from '@/components/Timeline';
import Stats from '@/components/Stats';
import TerminalChat from '@/components/TerminalChat';
import HackerGame from '@/components/HackerGame';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[#121212] min-h-screen">
        {/* HERO — Scrolly sequence (500vh) */}
        <section id="home">
          <ScrollyCanvas />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="min-h-screen py-32 border-t border-white/5">
          <Projects />
        </section>

        {/* SKILLS */}
        <section id="skills" className="min-h-screen py-32 border-t border-white/5 bg-white/[0.01]">
          <SkillsMatrix />
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="about" className="min-h-screen py-32 border-t border-white/5">
          <Timeline />
        </section>

        {/* STATS + CERTIFICATIONS */}
        <section id="stats" className="bg-[#0A0A0A] border-t border-white/5">
          <Stats />
        </section>

        {/* AI TERMINAL */}
        <section id="terminal" className="py-32 border-t border-white/5">
          <TerminalChat />
        </section>

        {/* HACKER GAME */}
        <section id="game" className="py-32 border-t border-white/5">
          <HackerGame />
        </section>

        {/* CONTACT */}
        <section id="contact" className="min-h-screen bg-transparent border-t border-white/5 relative z-10 flex flex-col justify-center">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}
