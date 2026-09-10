import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Award, Star } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';

export const HERO_BACKGROUND_SLIDES = [
  {
    id: 1,
    title: "Maharashtrian Royal Wedding",
    location: "Vita, Maharashtra",
    tag: "Wedding Ceremonies",
    image: "/Weddings/Image-44116.jpg"
  },
  {
    id: 2,
    title: "Cinematic Couple Portrait",
    location: "Karad, Maharashtra",
    tag: "Pre-Wedding Shoot",
    image: "/Weddings/Image-96657.jpg"
  },
  {
    id: 3,
    title: "Vibrant Yellow Haldi Rituals",
    location: "Sangli, Maharashtra",
    tag: "Traditional Rituals",
    image: "/Haldi/Image-19038.jpg"
  },
  {
    id: 4,
    title: "Golden Wedding Vows & Garlands",
    location: "Satara, Maharashtra",
    tag: "Sacred Moments",
    image: "/Weddings/Image-33416.jpg"
  },
  {
    id: 5,
    title: "Royal Bridal Fine Art",
    location: "Samarth Studio Vita",
    tag: "Portrait Craft",
    image: "/Weddings/Image-21450.jpg"
  }
];

export default function HeroFullBackgroundSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = HERO_BACKGROUND_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % total);
  }, [total]);

  // Continuous Auto Background Slide Timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const activeData = HERO_BACKGROUND_SLIDES[currentSlide];

  return (
    <section 
      className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden"
    >
      {/* ================= FULL PAGE BACKGROUND SLIDESHOW LAYER ================= */}
      <div className="absolute inset-0 z-0 bg-[#241C18]">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeData.image}
              alt={activeData.title}
              className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Editorial Gradient Overlay (Ensures Text Legibility) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#241C18]/85 via-[#241C18]/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/60 via-transparent to-[#241C18]/30 z-10" />
        <div className="absolute top-1/4 left-10 w-96 h-96 aura-glow-gold rounded-full pointer-events-none blur-3xl opacity-30 z-10" />
      </div>

      {/* ================= HERO CONTENT CONTAINER (OVERLAY) ================= */}
      <div className="relative z-20 max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mx-auto pt-28 lg:pt-36 pb-16 text-[#F8F5EF]">
        
        {/* Main Typography & CTAs */}
        <div className="max-w-3xl space-y-8">

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F8F5EF] leading-[1.1]"
          >
            Timeless Stories, <br />
            <span className="italic font-normal text-gold-gradient drop-shadow-sm">Beautifully Captured.</span>
          </motion.h1>





          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E4D8C8]/20 text-xs text-[#E4D8C8]/80"
          >
            <div className="flex items-center gap-2 font-mono uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>Vita, Maharashtra</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-[#F8F5EF]">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>10+ Years of Craft</span>
            </div>
            <div className="flex items-center gap-1 text-[#C5A059] font-semibold">
              <Star className="w-4 h-4 fill-current text-[#C5A059]" />
              <span>4.9 Rating (500+ Couples)</span>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}

