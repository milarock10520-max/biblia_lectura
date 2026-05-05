/**
 * Overall reading progress bar.
 */
export default function ProgressBar({ completedDays, totalDays, progressPercentage }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 z-10 flex-shrink-0 mb-6">
      <div className="flex justify-between text-xs text-amber-200/70 mb-1 font-cinzel font-bold">
        <span>El Viaje: {completedDays} días</span>
        <span>{totalDays} días</span>
      </div>
      <div className="h-2 w-full bg-[#1a0f09] rounded-full overflow-hidden border border-[#4a2e15]">
        <div
          className="h-full bg-gradient-to-r from-[#8b5a2b] to-[#d4af37] transition-all duration-1000"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
