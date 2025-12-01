import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/selections/Hero';
import Work from './components/selections/Work';
import Skill from './components/selections/Skill';
import Contact from './components/selections/Contacts';
import AudioBackground from './components/AudioBackground';
import { useAudio } from './assets/hooks/audio';

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  
  // Use custom hook for audio logic
  const { 
    isPlaying, 
    currentType, 
    activeProgress, 
    analyserRef, 
    playSound,
    stopSound,
    getSongName
  } = useAudio();

  // Refs for mini visualizers in the Work section
  // These are passed down to Work and AudioBackground to keep the loop synchronized
  const vizRefs = useRef({
    synth: useRef(null),
    drone: useRef(null),
    beat: useRef(null)
  });

  // Scroll Spy for Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'work', 'skill', 'contact'];
      const scrollPosition = window.scrollY + 200; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans bg-slate-900 text-slate-200 min-h-screen overflow-x-hidden relative selection:bg-cyan-500 selection:text-white">
      
      {/* Background Visualizer Canvas */}
      <AudioBackground 
        analyserRef={analyserRef} 
        vizRefs={vizRefs} 
        currentType={currentType} 
      />

      <Navbar activeSection={activeSection} />

      <Hero />
      
      <Work 
        playSound={playSound}
        isPlaying={isPlaying}
        currentType={currentType}
        activeProgress={activeProgress}
        vizRefs={vizRefs}
        getSongName={getSongName}
      />
      
      <Skill />
      
      <Contact />
      
      <Footer />
    </div>
  );
};

export default App;