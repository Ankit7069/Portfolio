import { useState, useRef, useCallback } from 'react';

// HELPER: Get correct path for GitHub Pages or Localhost
const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const DEMO_SONGS = {
  'synth': { path: getAssetPath('demos/Finding Her.mp3'), name: 'Finding Her' },
  'drone': { path: getAssetPath('demos/Dhundhala.mp3'), name: 'Dhundhala' },
  'beat':  { path: getAssetPath('demos/Jhol - Acoustic.mp3'), name: 'Jhol - Acoustic' }
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
  const audioElementRef = useRef(null);
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
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  };

  const stopSound = useCallback(() => {
    // Stop Oscillators
    oscillatorsRef.current.forEach(item => {
      try {
        if (item.stop) item.stop();
        if (item.disconnect) item.disconnect();
      } catch (e) {}
    });
    oscillatorsRef.current = [];

    // Stop Audio Element
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      // Remove the event listener to stop progress updates
      audioElementRef.current.ontimeupdate = null; 
    }

    setIsPlaying(false);
    setCurrentType(null);
    setActiveProgress(0);
    setDuration(0);
  }, []);

  const playSound = (type) => {
    initAudio();

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying && currentType === type) {
      stopSound();
      return;
    }

    if (isPlaying && currentType !== type) {
      stopSound();
    }

    const songConfig = DEMO_SONGS[type];
    if (!songConfig) return;

    setIsPlaying(true);
    setCurrentType(type);

    if (!audioElementRef.current) {
      audioElementRef.current = new Audio();
      audioElementRef.current.crossOrigin = 'anonymous';
    }

    const audio = audioElementRef.current;
    audio.src = songConfig.path;
    audio.volume = 0.5;

    // 1. Handle Metadata (Set Duration)
    audio.onloadedmetadata = () => {
      if(isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    // 2. Handle Progress (The FIX: Use ontimeupdate instead of requestAnimationFrame)
    audio.ontimeupdate = () => {
      if (audio.duration && isFinite(audio.duration) && audio.duration > 0) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setActiveProgress(progress);
      } else {
        setActiveProgress(0);
      }
    };

    audio.onended = () => {
      stopSound();
    };

    // Audio Graph Connection
    try {
      if (!mediaNodeRef.current) {
        mediaNodeRef.current = audioCtxRef.current.createMediaElementAudioSource(audio);
        mediaNodeRef.current.connect(masterGainRef.current);
      }
    } catch (error) {
      // Ignore if already connected
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log('Playback error:', error.message);
        // Debugging: If error is 404, the path is wrong
        if(error.message.includes('supported')) {
            console.error("Audio format not supported or path not found");
        }
      });
    }
  };

  const getSongName = (type) => {
    return DEMO_SONGS[type]?.name || '';
  };

  const seek = (percentage) => {
    if (audioElementRef.current && duration > 0) {
      const newTime = (percentage / 100) * duration;
      audioElementRef.current.currentTime = newTime;
      setActiveProgress(percentage);
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
    seek
  };
};