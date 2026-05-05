import { useState, useRef, useCallback } from 'react';

/**
 * Generates soothing ambient "singing bowl" tones using the Web Audio API.
 * No external files needed — 100% browser-generated, zero CORS issues.
 *
 * The soundscape uses layered sine/triangle waves with slow
 * volume modulation to create a meditative atmosphere.
 */
export function useAudio() {
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  // Fake ref for compatibility with <audio> element in App.jsx
  const audioRef = useRef(null);

  const startAmbient = useCallback(() => {
    // Create AudioContext on user gesture (required by browsers)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.warn('Web Audio API no soportado en este navegador');
      return;
    }

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.12;
    masterGain.connect(ctx.destination);

    // Chord frequencies (D minor pentatonic — meditative feel)
    const frequencies = [146.83, 174.61, 196.0, 220.0, 261.63, 293.66];

    frequencies.forEach((freq, i) => {
      // Main oscillator
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;

      // Subtle detuning for organic warmth
      osc.detune.value = (Math.random() - 0.5) * 10;

      // Individual gain with slow LFO modulation
      const gain = ctx.createGain();
      gain.gain.value = 0.0;

      // LFO for breathing volume effect
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.05 + Math.random() * 0.08; // Very slow

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.04 + Math.random() * 0.03;

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(masterGain);

      // Fade in gradually (staggered per voice)
      const fadeDelay = i * 0.8;
      gain.gain.setValueAtTime(0, ctx.currentTime + fadeDelay);
      gain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.04, ctx.currentTime + fadeDelay + 3);

      osc.start(ctx.currentTime + fadeDelay);
      lfo.start(ctx.currentTime);

      nodesRef.current.push({ osc, lfo, gain });
    });

    // Sub-bass drone for depth
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.value = 73.42; // D2
    const subGain = ctx.createGain();
    subGain.gain.value = 0;
    subGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 4);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start();
    nodesRef.current.push({ osc: subOsc, gain: subGain });

    setIsPlayingMusic(true);
  }, []);

  const stopAmbient = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Fade out gracefully
    nodesRef.current.forEach(({ osc, lfo, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      } catch (_) { /* ignore */ }
    });

    // Stop and clean up after fade
    setTimeout(() => {
      nodesRef.current.forEach(({ osc, lfo }) => {
        try { osc.stop(); } catch (_) { /* ignore */ }
        try { if (lfo) lfo.stop(); } catch (_) { /* ignore */ }
      });
      nodesRef.current = [];
      try { ctx.close(); } catch (_) { /* ignore */ }
      audioCtxRef.current = null;
    }, 1600);

    setIsPlayingMusic(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlayingMusic) {
      stopAmbient();
    } else {
      startAmbient();
    }
  }, [isPlayingMusic, startAmbient, stopAmbient]);

  return { audioRef, isPlayingMusic, toggleMusic };
}
