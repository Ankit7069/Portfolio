import React from 'react';
import { Activity } from 'lucide-react';
import Reveal from '../ui/Reveal';

const Skill = () => {
  return (
    <section id="skill" className="relative z-10 py-16 md:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Signal Chain</h2>
              <p className="text-slate-400 mb-8 text-lg">
                My workflow combines the warmth of analog gear with the precision of digital processing. Every project receives a tailored approach to ensure the highest fidelity.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                    <span>Mixing</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full w-[95%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                    <span>Sound Design</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full w-[90%] shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                    <span>Mastering</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-fuchsia-500 h-full w-[85%] shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* DAW Mockup with floating animation */}
          <Reveal delay={200}>
            <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
                  <Activity className="w-3 h-3"/> DAW: PRO TOOLS / ABLETON
                </span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 h-48 items-end">
                <div className="bg-slate-800 rounded-t-lg h-[80%] relative group animate-[pulse_3s_ease-in-out_infinite]">
                  <div className="absolute bottom-0 w-full bg-cyan-500/20 h-full rounded-t-lg transition-all group-hover:bg-cyan-500/30"></div>
                  <div className="absolute bottom-[60%] left-0 w-full h-1 bg-white shadow-[0_0_10px_white]"></div>
                </div>
                <div className="bg-slate-800 rounded-t-lg h-[60%] relative group animate-[pulse_4s_ease-in-out_infinite_500ms]">
                  <div className="absolute bottom-0 w-full bg-violet-500/20 h-full rounded-t-lg transition-all group-hover:bg-violet-500/30"></div>
                  <div className="absolute bottom-[40%] left-0 w-full h-1 bg-white shadow-[0_0_10px_white]"></div>
                </div>
                <div className="bg-slate-800 rounded-t-lg h-[90%] relative group animate-[pulse_3.5s_ease-in-out_infinite_200ms]">
                  <div className="absolute bottom-0 w-full bg-fuchsia-500/20 h-full rounded-t-lg transition-all group-hover:bg-fuchsia-500/30"></div>
                  <div className="absolute bottom-[70%] left-0 w-full h-1 bg-white shadow-[0_0_10px_white]"></div>
                </div>
                <div className="bg-slate-800 rounded-t-lg h-[40%] relative group animate-[pulse_4.5s_ease-in-out_infinite_800ms]">
                  <div className="absolute bottom-0 w-full bg-emerald-500/20 h-full rounded-t-lg transition-all group-hover:bg-emerald-500/30"></div>
                  <div className="absolute bottom-[30%] left-0 w-full h-1 bg-white shadow-[0_0_10px_white]"></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Skill;