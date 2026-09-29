import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Eye, Camera } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: "Royal Couple Portrait",
    subtitle: "Maharashtrian Wedding Splendor",
    categoryFilter: "Weddings",
    image: "/Weddings/wedding-4.jpg",
    tag: "Featured Story"
  },
  {
    id: 2,
    title: "Cinematic Pre-Wedding",
    subtitle: "Natural & Candid Moments",
    categoryFilter: "Pre-Wedding",
    image: "/Prewedding/prewedding-1.jpg",
    tag: "Romantic Frames"
  },
  {
    id: 3,
    title: "Mahantesh & Rutuja Wedding",
    subtitle: "Real Colors & Pure Joy",
    categoryFilter: "Weddings",
    image: "/Weddings/wedding-2.webp",
    tag: "Traditional Ceremony"
  },
  {
    id: 4,
    title: "Endless Laughter & Love",
    subtitle: "Timeless Emotion & Heritage",
    categoryFilter: "Pre-Wedding",
    image: "/Prewedding/prewedding-8.jpg",
    tag: "Golden Memories"
  },
  {
    id: 5,
    title: "Bridal Elegance",
    subtitle: "Editorial Lighting & Craft",
    categoryFilter: "Weddings",
    image: "/Weddings/wedding-6.jpg",
    tag: "Fine Art Portrait"
  }
];

export default function Hero3DPhotoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const total = HERO_SLIDES.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto 3D Carousel Timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  // 3D Parallax Tilt on Mouse Movement
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 18, y: -y * 14 }); // Rotates up to 18deg on Y, 14deg on X
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsPaused(false);
  };

  const handleCardClick = (slideIndex, catFilter) => {
    if (slideIndex === activeIndex) {
      navigate(`/portfolio?category=${encodeURIComponent(catFilter)}`);
    } else {
      setActiveIndex(slideIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg lg:max-w-xl mx-auto aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Decorative Gold Ring Frame */}
      <div className="absolute -top-12 -right-12 w-80 h-80 border border-[#C5A059]/30 rounded-full pointer-events-none animate-float-slow hidden sm:block" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-[#5E6B51]/20 rounded-full pointer-events-none hidden sm:block" />

      {/* 3D Stack Container */}
      <motion.div
        animate={{
          rotateY: mousePos.x,
          rotateX: mousePos.y,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {HERO_SLIDES.map((slide, idx) => {
          // Calculate relative position offset in loop
          const offset = (idx - activeIndex + total) % total;
          
          let zIndex = 10;
          let translateX = 0;
          let translateY = 0;
          let translateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let opacity = 1;
          let blur = 'blur(0px)';

          if (offset === 0) {
            // FRONT ACTIVE CARD
            zIndex = 30;
            translateX = 0;
            translateY = 0;
            translateZ = 60;
            rotateY = -4;
            scale = 1;
            opacity = 1;
          } else if (offset === 1) {
            // BACK CARD 1 (Right Stack)
            zIndex = 20;
            translateX = 36;
            translateY = 24;
            translateZ = -40;
            rotateY = 10;
            scale = 0.92;
            opacity = 0.85;
            blur = 'blur(1px)';
          } else if (offset === 2) {
            // BACK CARD 2 (Far Right Stack)
            zIndex = 10;
            translateX = 68;
            translateY = 48;
            translateZ = -120;
            rotateY = 18;
            scale = 0.84;
            opacity = 0.6;
            blur = 'blur(2px)';
          } else if (offset === total - 1) {
            // BACK CARD LEFT (Previous Stack)
            zIndex = 15;
            translateX = -36;
            translateY = 24;
            translateZ = -50;
            rotateY = -12;
            scale = 0.9;
            opacity = 0.7;
            blur = 'blur(1px)';
          } else {
            // HIDDEN STACK CARDS
            zIndex = 5;
            translateZ = -200;
            opacity = 0;
            scale = 0.75;
          }

          return (
            <motion.div
              key={slide.id}
              onClick={() => handleCardClick(idx, slide.categoryFilter)}
              initial={false}
              animate={{
                x: translateX,
                y: translateY,
                z: translateZ,
                rotateY: rotateY,
                scale: scale,
                opacity: opacity,
                filter: blur,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex }}
              className={`absolute w-[82%] sm:w-[85%] h-[90%] rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 border border-[#E4D8C8]/60 ${
                offset === 0 ? 'gold-border-glow ring-2 ring-[#C5A059]/40' : ''
              }`}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-[center_20%] filter brightness-95 hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Overlay Gradient & Glass Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/90 via-[#241C18]/20 to-transparent p-6 flex flex-col justify-between">
                
                {/* Top Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F5EF]/90 backdrop-blur-md text-[10px] uppercase font-semibold tracking-wider text-[#5E6B51] shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#C5A059]" />
                    <span>{slide.tag}</span>
                  </span>

                  {offset === 0 && (
                    <span className="w-8 h-8 rounded-full bg-[#241C18]/60 backdrop-blur-md text-[#F8F5EF] flex items-center justify-center hover:bg-[#C5A059] transition-colors">
                      <Eye className="w-4 h-4" />
                    </span>
                  )}
                </div>

                {/* Bottom Caption Title */}
                <div className="space-y-1 transform group-hover:translate-y-0 transition-transform">
                  <span className="text-[11px] uppercase tracking-widest text-[#F3E5AB] font-mono">
                    {slide.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F8F5EF] font-light leading-snug">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2 rounded-full glass-card border border-[#C5A059]/40 shadow-xl">
        {/* Prev Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous 3D Slide"
          className="w-8 h-8 rounded-full bg-[#F8F5EF] hover:bg-[#5E6B51] hover:text-[#F8F5EF] text-[#241C18] flex items-center justify-center transition-all shadow-sm active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5 px-1">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Jump to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-[#C5A059]'
                  : 'w-2 bg-[#E4D8C8] hover:bg-[#83736A]'
              }`}
            />
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next 3D Slide"
          className="w-8 h-8 rounded-full bg-[#F8F5EF] hover:bg-[#5E6B51] hover:text-[#F8F5EF] text-[#241C18] flex items-center justify-center transition-all shadow-sm active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
