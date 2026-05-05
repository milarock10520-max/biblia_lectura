import { Crown } from 'lucide-react';

/**
 * App top header with title and quote.
 */
export default function Header() {
  return (
    <header className="p-6 text-center text-amber-100 z-10 flex-shrink-0 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Crown className="w-10 h-10 mx-auto text-[#d4af37] mb-2" />
        <h1
          className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-2"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          Cronos Bíblico
        </h1>
        <p className="text-amber-200/80 italic max-w-lg mx-auto">
          "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
        </p>
      </div>
    </header>
  );
}
