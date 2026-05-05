import { Music, PauseCircle } from 'lucide-react';

/**
 * Floating music button in the top-right corner.
 */
export default function MusicButton({ isPlayingMusic, toggleMusic }) {
  return (
    <button
      id="btn-music"
      onClick={toggleMusic}
      className={`fixed top-4 right-4 md:top-8 md:right-8 z-[100] p-3 rounded-full text-[#f4e8d1] shadow-lg transition-all duration-300 hover:scale-110
        ${
          isPlayingMusic
            ? 'bg-[#4a2e15] border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.6)]'
            : 'bg-[#2c1a0f]/60 backdrop-blur border border-[#8b5a2b] hover:bg-[#4a2e15]'
        }`}
      title="Música Ambiental"
    >
      {isPlayingMusic ? (
        <PauseCircle size={22} className="text-[#d4af37]" />
      ) : (
        <Music size={22} />
      )}
    </button>
  );
}
