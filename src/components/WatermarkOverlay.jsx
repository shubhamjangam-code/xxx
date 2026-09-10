import React from 'react';

export default function WatermarkOverlay({ className = "" }) {
  return (
    <div
      className={`absolute bottom-3 right-3 z-10 pointer-events-none select-none flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded border border-white/15 text-white/90 shadow-sm ${className}`}
    >
      <span className="font-serif text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium text-amber-100/90">
        SAMARTH STUDIOS
      </span>
      <span className="text-[8px] text-white/40 font-mono">•</span>
      <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-semibold text-white/80">
        NANA LIPARE
      </span>
    </div>
  );
}
