import { useState, useRef } from 'react';

/**
 * Controls ambient background audio (play / pause / volume).
 * Uses a local MP3 file served from /audio/ambient.mp3
 * (Bach - Air on the G String, public domain).
 */
export function useAudio() {
  const audioRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    if (isPlayingMusic) {
      audio.pause();
      setIsPlayingMusic(false);
    } else {
      audio.play()
        .then(() => setIsPlayingMusic(true))
        .catch((err) => console.log('Bloqueo del navegador:', err));
    }
  };

  return { audioRef, isPlayingMusic, toggleMusic };
}
