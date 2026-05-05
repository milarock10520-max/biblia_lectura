import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { totalDays } from '../data/readingPlan';
import { getEraIcon, getGatewayUrl } from '../utils/helpers';

/**
 * Daily reading card — shows the current day, chapters to read,
 * navigation arrows, and action buttons.
 */
export default function DailyCard({
  currentDayData,
  currentViewDay,
  setCurrentViewDay,
  isCompleted,
  toggleDayCompletion,
  onOpenReader,
}) {
  return (
    <div className="parchment-bg leather-border rounded-sm w-full max-w-lg p-8 md:p-12 relative flex flex-col items-center text-center">
      {/* Navigation arrows */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[#4a2e15]">
        <button
          id="btn-prev-day"
          onClick={() => setCurrentViewDay((p) => Math.max(1, p - 1))}
          disabled={currentViewDay === 1}
          className="p-2 hover:bg-[#8b5a2b]/20 rounded-full disabled:opacity-30"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="font-cinzel font-bold text-sm tracking-widest opacity-60">RETO DIARIO</span>
        <button
          id="btn-next-day"
          onClick={() => setCurrentViewDay((p) => Math.min(totalDays, p + 1))}
          disabled={currentViewDay === totalDays}
          className="p-2 hover:bg-[#8b5a2b]/20 rounded-full disabled:opacity-30"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Era badge */}
      <div className="mt-6 mb-2 flex items-center gap-2 text-[#8b5a2b]">
        {getEraIcon(currentDayData.era)}
        <span className="font-bold text-sm uppercase tracking-wider">{currentDayData.era}</span>
      </div>

      {/* Day number */}
      <h2 className="font-cinzel text-5xl md:text-6xl font-bold text-[#2c1a0f] mb-6">
        Día {currentDayData.day}
      </h2>

      {/* Chapter list */}
      <div className="w-full border-y border-[#8b5a2b]/30 py-6 mb-8">
        <h3 className="text-xl italic mb-4 opacity-80">Porciones de hoy:</h3>
        <ul className="space-y-3">
          {currentDayData.chapters.map((chap, idx) => (
            <li key={idx} className="text-2xl font-bold text-[#4a2e15]">
              {chap.book} {chap.chapter}
            </li>
          ))}
        </ul>
      </div>

      {/* Action buttons */}
      <div className="w-full flex flex-col gap-3">
        <button
          id="btn-open-reader"
          onClick={() => onOpenReader(currentDayData.chapters)}
          className="w-full flex justify-center gap-2 bg-[#4a2e15] hover:bg-[#2c1a0f] text-[#f4e8d1] py-4 rounded shadow-lg transition-colors font-cinzel font-bold text-lg"
        >
          <BookOpen size={20} /> Leer Textos Aquí (RV)
        </button>

        <a
          href={getGatewayUrl(currentDayData.chapters)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex justify-center gap-2 text-[#8b5a2b] hover:bg-[#8b5a2b]/10 py-2 border border-[#8b5a2b]/50 rounded transition-colors font-cinzel font-bold text-sm"
        >
          <ExternalLink size={16} /> Abrir externamente en NTV
        </a>

        <button
          id="btn-toggle-complete"
          onClick={() => toggleDayCompletion(currentViewDay)}
          className={`mt-4 w-full flex justify-center gap-2 py-4 rounded shadow border-2 transition-all duration-300 font-cinzel font-bold text-lg ${
            isCompleted
              ? 'bg-green-800/10 text-green-800 border-green-800 hover:bg-green-800/20'
              : 'bg-transparent text-[#8b5a2b] border-[#8b5a2b] hover:bg-[#8b5a2b]/10'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle size={20} className="text-green-800" /> Día Completado
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-[#8b5a2b]" /> Marcar como Hecho
            </>
          )}
        </button>
      </div>
    </div>
  );
}
