import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

const RETOUCH_SAMPLES = [
  {
    id: 'sample-1',
    title: 'Bridal Portrait Color Grading',
    category: 'Wedding Retouching',
    beforeImg: '/Weddings/wedding-1.jpg', // Original raw feel
    afterImg: '/Weddings/wedding-4.jpg',  // Enhanced vibrant feel
    description: 'Custom film color grading, skin texture refinement, and warm tone optimization for royal Indian weddings.'
  },
  {
    id: 'sample-2',
    title: 'Sunset Pre-Wedding Mood & Lighting',
    category: 'Pre-Wedding Magic',
    beforeImg: '/Prewedding/prewedding-2.jpg',
    afterImg: '/Prewedding/prewedding-1.jpg',
    description: 'Golden hour sunlight glow enhancement, dynamic range balancing, and signature cinematic depth.'
  }
];

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const sample = RETOUCH_SAMPLES[activeSampleIndex];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.type !== 'click') return;
    handleMove(e.clientX);
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#241C18] text-[#F8F5EF] overflow-hidden border-y border-[#C5A059]/30">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] aura-glow-gold rounded-full blur-[140px] opacity-20 pointer-events-none" />

      <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#C5A059]/20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Master Artistry & Retouching</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F8F5EF] leading-tight">
              Before & After <span className="italic font-normal text-gold-bright">Mastery</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#E4D8C8]/70 font-light max-w-xl">
              Drag the slider left or right to experience the magic of our signature color grading, skin retouching, and atmospheric enhancement.
            </p>
          </div>

          {/* Sample Switcher Tabs */}
          <div className="flex items-center gap-3">
            {RETOUCH_SAMPLES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSampleIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  idx === activeSampleIndex
                    ? 'bg-[#C5A059] text-[#241C18] shadow-lg shadow-[#C5A059]/20'
                    : 'bg-[#241C18] text-[#E4D8C8]/80 border border-[#C5A059]/30 hover:border-[#C5A059]'
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={(e) => handleMove(e.clientX)}
          className="relative h-[400px] sm:h-[550px] md:h-[620px] rounded-3xl overflow-hidden border border-[#C5A059]/40 shadow-2xl select-none cursor-ew-resize group"
        >
          {/* AFTER IMAGE (Full Base Image) */}
          <img
            src={sample.afterImg}
            alt="After Edit"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-[#241C18]/80 backdrop-blur-md border border-[#C5A059]/40 text-xs font-semibold tracking-widest text-[#FFF2AA] uppercase flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Signature Luxury Edit</span>
          </div>

          {/* BEFORE IMAGE (Clipped Overlay) */}
          <div
            className="absolute inset-0 overflow-hidden z-10 pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={sample.beforeImg}
              alt="Before Edit"
              className="absolute top-0 left-0 h-full max-w-none object-cover filter brightness-[0.92] contrast-[0.95]"
              style={{
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              }}
            />
            <div className="absolute top-6 left-6 z-20 px-3.5 py-1.5 rounded-full bg-[#241C18]/80 backdrop-blur-md border border-[#E4D8C8]/30 text-xs font-semibold tracking-widest text-[#E4D8C8] uppercase">
              SOOC / Raw Shot
            </div>
          </div>

          {/* DRAG HANDLE BAR */}
          <div
            className="absolute top-0 bottom-0 z-30 w-1 bg-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.8)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Center Handle Button */}
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#241C18] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-xl group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>
        </div>

        {/* Bottom Description Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-card-dark border border-[#C5A059]/30">
          <div className="space-y-1">
            <h4 className="font-serif text-xl font-normal text-[#FFF2AA]">{sample.title}</h4>
            <p className="text-xs text-[#E4D8C8]/80 font-light">{sample.description}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] uppercase tracking-wider flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Drag slider left/right to compare</span>
          </div>
        </div>

      </div>
    </section>
  );
}
