import { planByEra } from '../data/readingPlan';
import { getEraIcon } from '../utils/helpers';

/**
 * Timeline view — shows all 7 eras with day grids and per-era progress.
 */
export default function TimelineView({ completedDays, currentViewDay, setCurrentViewDay, setViewMode }) {
  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 pb-12">
      {planByEra.map((era, index) => {
        const completedInEra = era.days.filter((d) => completedDays.includes(d.day)).length;
        const eraProgress = (completedInEra / era.days.length) * 100;

        return (
          <div
            key={era.name}
            className="parchment-bg leather-border rounded-lg p-6 relative overflow-hidden"
          >
            {/* Era header */}
            <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-[#8b5a2b]/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#4a2e15] text-[#f4e8d1] p-3 rounded-full shadow-lg">
                  {getEraIcon(era.name)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#8b5a2b] uppercase tracking-wider">
                    Era {index + 1}
                  </span>
                  <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-[#2c1a0f]">
                    {era.name}
                  </h3>
                </div>
              </div>

              {/* Era progress */}
              <div className="mt-4 md:mt-0 text-right">
                <span className="font-cinzel font-bold text-[#8b5a2b] text-lg">
                  {completedInEra} / {era.days.length} días
                </span>
                <div className="w-full md:w-32 h-2 bg-[#dcb88c] rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-green-700 transition-all duration-500"
                    style={{ width: `${eraProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 mt-4">
              {era.days.map((d) => (
                <button
                  key={d.day}
                  onClick={() => {
                    setCurrentViewDay(d.day);
                    setViewMode('daily');
                  }}
                  className={`aspect-square rounded flex justify-center items-center font-cinzel font-bold text-sm transition-all
                    ${
                      completedDays.includes(d.day)
                        ? 'bg-green-800 text-[#f4e8d1] shadow-inner'
                        : 'bg-[#e3ceaa] text-[#4a2e15] border border-[#c19a6b] hover:bg-[#dcb88c]'
                    }
                    ${
                      currentViewDay === d.day
                        ? 'ring-2 ring-offset-2 ring-offset-[#f4e8d1] ring-[#8b5a2b]'
                        : ''
                    }`}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
