import React, { useEffect, useRef } from 'react';

const AudioBackground = ({ analyserRef, vizRefs, currentType }) => {
  const canvasRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      rafIdRef.current = requestAnimationFrame(render);
      
      if (!ctx) return;
      
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!analyserRef?.current) return;

      try {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Draw Background Bars
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] * 2;
          const r = barHeight + (25 * (i / bufferLength));
          const g = 250 * (i / bufferLength);
          const b = 255;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
          x += barWidth + 1;
        }

        // Update Mini Viz Bars in Work Section
        if (currentType && vizRefs?.current?.[currentType]?.current) {
          const container = vizRefs.current[currentType].current;
          if (container && container.children.length > 0) {
            const bars = container.children;
            const step = Math.floor(bufferLength / bars.length);
            for (let i = 0; i < bars.length; i++) {
              const val = dataArray[i * step] || 0;
              const bar = bars[i];
              bar.style.height = `${Math.max(10, val / 2)}%`;
              if (val > 200) {
                bar.classList.add('bg-white');
              } else {
                bar.classList.remove('bg-white');
              }
            }
          }
        } else {
          // Reset all visualizer bars when no song is playing
          if (vizRefs?.current) {
            Object.values(vizRefs.current).forEach(vizRef => {
              if (vizRef?.current?.children) {
                const bars = vizRef.current.children;
                for (let i = 0; i < bars.length; i++) {
                  bars[i].style.height = '10%';
                  bars[i].classList.remove('bg-white');
                }
              }
            });
          }
        }
      } catch (e) {
        // Silently handle any analyser errors
      }
    };

    render();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [currentType, analyserRef, vizRefs]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0"
    />
  );
};

export default AudioBackground;