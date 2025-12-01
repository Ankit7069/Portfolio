import { useState, useRef, useCallback } from 'react';

// Demo songs configuration
const DEMO_SONGS = {
  'synth': { path: '/demos/Finding Her.mp3', name: 'Finding Her' },
  'drone': { path: '/demos/Dhundhala.mp3', name: 'Dhundhala' },
  'beat': { path: '/demos/Jhol - Acoustic.mp3', name: 'Jhol - Acoustic' }
};

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentType, setCurrentType] = useState(null);
  const [activeProgress, setActiveProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const analyserRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const audioSourceRef = useRef(null);
  const audioElementRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mediaNodeRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.value = 0.5;
      
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
      
      masterGainRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
    }
    // Always ensure context is running
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {
        // Resume may fail but that's ok
      });
    }
  };

  const createOscillator = (type, freq, detune = 0) => {
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.detune.value = detune;
    return osc;
  };

  const stopSound = useCallback(() => {
    // Stop oscillators
    oscillatorsRef.current.forEach(item => {
      try {
        if (item.stop) item.stop();
        if (item.disconnect) item.disconnect();
        if (item.clearInterval) clearInterval(item.id);
      } catch (e) {
        // Silently ignore errors
      }
    });
    oscillatorsRef.current = [];

    // Stop audio element playback
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    setCurrentType(null);
    setActiveProgress(0);
    setDuration(0);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const playSound = (type) => {
    initAudio();

    // Resume audio context
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    // If clicking the same song while playing, stop it
    if (isPlaying && currentType === type) {
      stopSound();
      return;
    }

    // Stop any currently playing audio before starting a new one
    if (isPlaying && currentType !== type) {
      stopSound();
    }

    const songConfig = DEMO_SONGS[type];
    if (!songConfig) return;

    setIsPlaying(true);
    setCurrentType(type);

    // Create audio element for demo song
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio();
      audioElementRef.current.crossOrigin = 'anonymous';
    }

    const audio = audioElementRef.current;
    audio.src = songConfig.path;
    audio.volume = 0.5;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.onended = () => {
      stopSound();
    };

    // Connect to analyser BEFORE playing
    try {
      if (!mediaNodeRef.current) {
        mediaNodeRef.current = audioCtxRef.current.createMediaElementAudioSource(audio);
        mediaNodeRef.current.connect(masterGainRef.current);
      }
    } catch (error) {
      // Source already connected, continue
    }

    // Play audio
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log('Playback error:', error.message);
      });
    }

    // Update progress with animation frame
    const updateProgress = () => {
      if (audio && audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setActiveProgress(Math.min(progress, 100));
      }
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const getSongName = (type) => {
    return DEMO_SONGS[type]?.name || '';
  };

  const seek = (percentage) => {
    if (audioElementRef.current && duration > 0) {
      const newTime = (percentage / 100) * duration;
      audioElementRef.current.currentTime = newTime;
      setActiveProgress((newTime / duration) * 100);
    }
  };

  return {
    isPlaying,
    currentType,
    activeProgress,
    duration,
    analyserRef,
    playSound,
    stopSound,
    getSongName,
    seek // Ensure the seek function is exposed
  };
};