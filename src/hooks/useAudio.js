import { useState, useRef, useEffect } from 'react';
import { ambientMusicUrl } from '../data/readingPlan';

/**
 * Controls ambient background audio (play / pause / volume).
 */
export function useAudio() {
  const audioRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.35;

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch((err) => console.log('Bloqueo del navegador:', err));
    }
  };

  return { audioRef, isPlayingMusic, toggleMusic, ambientMusicUrl };
}
