import { Calendar, List } from 'lucide-react';

/**
 * Tab switcher between "Reto Diario" and "Las 7 Eras" views.
 */
export default function NavTabs({ viewMode, setViewMode }) {
  const tabClass = (mode) =>
    `flex-1 py-2 font-cinzel font-bold border-2 rounded transition-colors flex justify-center gap-2 ${
      viewMode === mode
        ? 'bg-[#8b5a2b] text-amber-100 border-[#8b5a2b]'
        : 'border-[#8b5a2b] text-[#8b5a2b] bg-transparent hover:bg-[#8b5a2b]/20'
    }`;

  return (
    <div className="w-full max-w-md mx-auto px-4 z-10 flex-shrink-0 mb-6 flex gap-2">
      <button id="tab-daily" onClick={() => setViewMode('daily')} className={tabClass('daily')}>
        <Calendar size={18} /> Reto Diario
      </button>
      <button id="tab-timeline" onClick={() => setViewMode('timeline')} className={tabClass('timeline')}>
        <List size={18} /> Las 7 Eras
      </button>
    </div>
  );
}
