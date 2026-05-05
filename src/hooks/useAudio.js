import { useState, useRef } from 'react';

/**
 * Lista de pistas de música ambiental de dominio público.
 * Múltiples fuentes como respaldo (CORS-friendly, MP3/OGG).
 *
 * - ccMixter / Free Music Archive CDN sirven CORS correctamente.
 * - El primer elemento que cargue exitosamente será el que se use.
 */
const MUSIC_SOURCES = [
  // Bach - Air on the G String (dominio público, MP3 desde musopen.org CDN)
  'https://files.musopen.org/recordings/6da5f8fc-3548-4f2a-a14c-6a70efb80c64.mp3',
  // Pachelbel Canon in D (dominio público - Internet Archive)
  'https://archive.org/download/PachelbelCanon/Pachelbel_Canon.mp3',
  // Fuente OGG original como último fallback
  'https://upload.wikimedia.org/wikipedia/commons/4/4b/Oud_-_Maqam_Bayati_-_improvisation.ogg',
];

/**
 * Controls ambient background audio (play / pause / volume).
 * Tries multiple sources in order until one plays successfully.
 */
export function useAudio() {
  const audioRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  const tryPlay = async (audio, index = 0) => {
    if (index >= MUSIC_SOURCES.length) {
      console.warn('No se pudo cargar ninguna fuente de audio.');
      return;
    }

    try {
      audio.src = MUSIC_SOURCES[index];
      audio.volume = 0.35;
      audio.loop = true;

      // Espera a que haya suficientes datos para reproducir
      await new Promise((resolve, reject) => {
        const onCanPlay = () => { audio.removeEventListener('canplay', onCanPlay); resolve(); };
        const onError   = () => { audio.removeEventListener('error', onError);    reject(); };
        audio.addEventListener('canplay', onCanPlay);
        audio.addEventListener('error', onError);
        audio.load();
      });

      await audio.play();
      setSourceIndex(index);
      setIsPlayingMusic(true);
    } catch {
      // Fuente falló → intenta la siguiente
      console.log(`Fuente ${index} falló, probando siguiente...`);
      tryPlay(audio, index + 1);
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingMusic) {
      audio.pause();
      setIsPlayingMusic(false);
    } else {
      // Si ya tiene src cargado correctamente, sólo da play
      if (audio.src && audio.readyState >= 2) {
        audio.play()
          .then(() => setIsPlayingMusic(true))
          .catch(() => tryPlay(audio, 0));
      } else {
        tryPlay(audio, sourceIndex);
      }
    }
  };

  return { audioRef, isPlayingMusic, toggleMusic };
}
