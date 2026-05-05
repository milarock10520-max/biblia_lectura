import { ChevronRight } from 'lucide-react';
import { bibleVersions } from '../data/bibleVersions';

/**
 * Dropdown-style version selector pill.
 * Shows current version label and opens a dropdown on click.
 */
export default function VersionSelector({ selectedVersion, onVersionChange }) {
  const currentLabel = bibleVersions.find((v) => v.slug === selectedVersion)?.label || selectedVersion;

  return (
    <div className="relative group inline-block">
      <select
        id="version-selector"
        value={selectedVersion}
        onChange={(e) => onVersionChange(e.target.value)}
        className="appearance-none cursor-pointer bg-[#4a2e15] text-[#f4e8d1] pl-3 pr-8 py-1.5 rounded-full
          font-cinzel font-bold text-xs tracking-wide border border-[#8b5a2b]
          hover:bg-[#2c1a0f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37]
          shadow-md"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        {bibleVersions.map((v) => (
          <option key={v.slug} value={v.slug}>
            {v.label}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <ChevronRight
        size={12}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 text-[#d4af37] pointer-events-none"
      />
    </div>
  );
}
