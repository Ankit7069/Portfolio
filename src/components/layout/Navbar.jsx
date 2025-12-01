import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, id, label, className }) => (
    <a 
      href={href} 
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === id ? 'text-white' : 'text-slate-400 hover:text-white'} ${className}`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
      {activeSection === id && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse"></span>
      )}
    </a>
  );

  return (
    <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-1 h-6">
              <div className="w-1 bg-cyan-400 animate-bounce h-4"></div>
              <div className="w-1 bg-violet-500 animate-[bounce_1s_infinite_100ms] h-6"></div>
              <div className="w-1 bg-fuchsia-500 animate-[bounce_1s_infinite_200ms] h-3"></div>
            </div>
            <span 
              className="text-xl md:text-2xl font-bold tracking-tighter text-white cursor-pointer"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              KAIZEN<span className="text-cyan-400">.wav</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="#about" id="about" label="About" />
              <NavLink href="#work" id="work" label="Work" />
              <NavLink href="#skill" id="skill" label="Skill" />
              <NavLink href="#contact" id="contact" label="Contact" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 absolute w-full left-0 top-20 shadow-2xl animate-in slide-in-from-top-2">
           <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <NavLink href="#about" id="about" label="About" />
              <NavLink href="#work" id="work" label="Work" />
              <NavLink href="#skill" id="skill" label="Skill" />
              <NavLink href="#contact" id="contact" label="Contact" />
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;