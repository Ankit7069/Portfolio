import React from 'react';
import { Music, Wind, Speaker, Play, Square } from 'lucide-react';
import Reveal from '../ui/Reveal';

const Work = ({ playSound, isPlaying, currentType, activeProgress, seek, getSongName }) => {
  return (
    <section id="work" className="relative z-10 py-16 md:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Demo Tracks</h2>
            <p className="text-slate-400">Click play to listen to demo tracks.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Demo Track 1 - SYNTH */}
          <Reveal delay={100}>
            <div className={`group bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:-translate-y-2 ${currentType === 'synth' ? 'border-cyan-500/50' : 'border-slate-700'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-fuchsia-500/10 rounded-lg text-fuchsia-400 group-hover:bg-fuchsia-500/20 transition-colors">
                  <Music className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">DEMO 1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{getSongName('synth')}</h3>
              <p className="text-slate-400 text-sm mb-6">Listen to the first demo track.</p>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => playSound('synth')}
                    className="w-12 h-12 shrink-0 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center text-slate-900 transition-all hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  >
                    {isPlaying && currentType === 'synth' ? <Square className="fill-current w-4 h-4" /> : <Play className="fill-current w-5 h-5 ml-1" />}
                  </button>
                  {/* PROGRESS BAR 1 */}
                  <div 
                    className="w-full bg-slate-800 h-1 rounded-full overflow-hidden relative cursor-pointer py-1"
                    onMouseDown={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const handleSeek = (clientX) => {
                        const clickX = clientX - rect.left;
                        const percentage = Math.max(0, Math.min((clickX / rect.width) * 100, 100));
                        seek(percentage);
                      };
                      handleSeek(e.clientX); // Seek immediately on click
                      
                      const onMouseMove = (moveEvent) => handleSeek(moveEvent.clientX);
                      const onMouseUp = () => {
                        window.removeEventListener('mousemove', onMouseMove);
                        window.removeEventListener('mouseup', onMouseUp);
                      };
                      window.addEventListener('mousemove', onMouseMove);
                      window.addEventListener('mouseup', onMouseUp);
                    }}
                  >
                    {/* Inner Bar - removed isPlaying check so it stays visible */}
                    <div className="w-full h-1 bg-slate-800 absolute top-1 left-0 rounded-full"></div>
                    <div 
                      className="bg-cyan-500 h-1 absolute top-1 left-0 rounded-full transition-all duration-100 ease-linear"
                      style={{ width: currentType === 'synth' ? `${activeProgress}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Demo Track 2 - DRONE */}
          <Reveal delay={200}>
            <div className={`group bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:-translate-y-2 ${currentType === 'drone' ? 'border-violet-500/50' : 'border-slate-700'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-violet-500/10 rounded-lg text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                  <Wind className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">DEMO 2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{getSongName('drone')}</h3>
              <p className="text-slate-400 text-sm mb-6">Listen to the second demo track.</p>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => playSound('drone')}
                    className="w-12 h-12 shrink-0 rounded-full bg-violet-500 hover:bg-violet-400 flex items-center justify-center text-white transition-all hover:scale-110 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  >
                    {isPlaying && currentType === 'drone' ? <Square className="fill-current w-4 h-4" /> : <Play className="fill-current w-5 h-5 ml-1" />}
                  </button>
                  {/* PROGRESS BAR 2 */}
                  <div 
                    className="w-full bg-slate-800 h-1 rounded-full overflow-hidden relative cursor-pointer py-1"
                    onMouseDown={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const handleSeek = (clientX) => {
                        const clickX = clientX - rect.left;
                        const percentage = Math.max(0, Math.min((clickX / rect.width) * 100, 100));
                        seek(percentage);
                      };
                      handleSeek(e.clientX);

                      const onMouseMove = (moveEvent) => handleSeek(moveEvent.clientX);
                      const onMouseUp = () => {
                        window.removeEventListener('mousemove', onMouseMove);
                        window.removeEventListener('mouseup', onMouseUp);
                      };
                      window.addEventListener('mousemove', onMouseMove);
                      window.addEventListener('mouseup', onMouseUp);
                    }}
                  >
                    <div className="w-full h-1 bg-slate-800 absolute top-1 left-0 rounded-full"></div>
                    <div 
                      className="bg-violet-500 h-1 absolute top-1 left-0 rounded-full transition-all duration-100 ease-linear"
                      style={{ width: currentType === 'drone' ? `${activeProgress}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Demo Track 3 - BEAT */}
          <Reveal delay={300}>
            <div className={`group bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:-translate-y-2 ${currentType === 'beat' ? 'border-emerald-500/50' : 'border-slate-700'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  <Speaker className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">DEMO 3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{getSongName('beat')}</h3>
              <p className="text-slate-400 text-sm mb-6">Listen to the third demo track.</p>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => playSound('beat')}
                    className="w-12 h-12 shrink-0 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-slate-900 transition-all hover:scale-110 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  >
                    {isPlaying && currentType === 'beat' ? <Square className="fill-current w-4 h-4" /> : <Play className="fill-current w-5 h-5 ml-1" />}
                  </button>
                  {/* PROGRESS BAR 3 */}
                  <div 
                    className="w-full bg-slate-800 h-1 rounded-full overflow-hidden relative cursor-pointer py-1"
                    onMouseDown={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const handleSeek = (clientX) => {
                        const clickX = clientX - rect.left;
                        const percentage = Math.max(0, Math.min((clickX / rect.width) * 100, 100));
                        seek(percentage);
                      };
                      handleSeek(e.clientX);

                      const onMouseMove = (moveEvent) => handleSeek(moveEvent.clientX);
                      const onMouseUp = () => {
                        window.removeEventListener('mousemove', onMouseMove);
                        window.removeEventListener('mouseup', onMouseUp);
                      };
                      window.addEventListener('mousemove', onMouseMove);
                      window.addEventListener('mouseup', onMouseUp);
                    }}
                  >
                    <div className="w-full h-1 bg-slate-800 absolute top-1 left-0 rounded-full"></div>
                    <div 
                      className="bg-emerald-500 h-1 absolute top-1 left-0 rounded-full transition-all duration-100 ease-linear"
                      style={{ width: currentType === 'beat' ? `${activeProgress}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Work;