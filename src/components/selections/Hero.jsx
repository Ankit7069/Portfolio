import React from 'react';
import { Headphones } from 'lucide-react';
import Reveal from '../ui/Reveal';

const Hero = () => {
  return (
    <section id="about" className="relative z-10 min-h-screen flex items-center justify-center pt-20 px-4">
      {/* FIXED: bg-gradient-to-b */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto text-center">
        <Reveal>
          <h2 className="text-cyan-400 font-medium tracking-[0.2em] mb-4 uppercase text-xs md:text-sm animate-pulse">Sonic Architecture</h2>
        </Reveal>
        
        <Reveal delay={100}>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">
            Hi, I'm Kaizen. <br/>
            {/* FIXED: bg-gradient-to-r */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 animate-gradient-x bg-size-[200%_auto]">
              Sculpting Sound
            </span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 px-4">
            Professional Mixing Engineer & Sound Designer based in the digital realm.
            Specializing in immersive audio for games, film, and modern music production.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-8">
            <a href="#work" className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10">
            <span className="relative z-10 flex items-center justify-center gap-2">
            Listen to Demos <Headphones className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            {/* FIXED: bg-gradient-to-r */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            <button className="px-8 py-4 border border-slate-700 hover:border-cyan-400 rounded-full transition-all text-slate-300 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              CV
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;