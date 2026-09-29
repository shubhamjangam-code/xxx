import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Award, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';
import { getHomeSettings } from '../services/dataService';

export const HERO_BACKGROUND_SLIDES = [
  {
    id: 1,
    title: "Maharashtrian Royal Wedding",
    location: "Maharashtra",
    tag: "Wedding Ceremonies",
    image: "/Weddings/wedding-4.jpg",
    objectPos: "50% 50%",
    scale: 1.0,
    fitMode: "cover"
  },
  {
    id: 2,
    title: "Alok & Alena Pre-Wedding",
    location: "Karad, Maharashtra",
    tag: "Pre-Wedding Shoot",
    image: "/Prewedding/prewedding-1.jpg",
    objectPos: "50% 40%",
    scale: 1.0,
    fitMode: "cover"
  },
  {
    id: 3,
    title: "Mahantesh & Rutuja Wedding",
    location: "Sangli, Maharashtra",
    tag: "Traditional Rituals",
    image: "/Weddings/wedding-2.webp",
    objectPos: "50% 50%",
    scale: 1.0,
    fitMode: "cover"
  },
  {
    id: 4,
    title: "Endless Laughter & Love",
    location: "Satara, Maharashtra",
    tag: "Romantic Stories",
    image: "/Prewedding/prewedding-8.jpg",
    objectPos: "50% 50%",
    scale: 1.0,
    fitMode: "cover"
  },
  {
    id: 5,
    title: "Royal Fine Art Portrait",
    location: "Sachin Ghongade Photo Studio",
    tag: "Portrait Craft",
    image: "/Weddings/wedding-6.jpg",
    objectPos: "50% 50%",
    scale: 1.0,
    fitMode: "cover"
  }
];

function formatStylishTitle(title) {
  const text = (title && title !== "TIMELINES & UNGUARDED EMOTIONS") ? title : "Capturing Real Emotions.";
  const parts = text.trim().split(" ");
  
  if (parts.length >= 3) {
    const main = parts.slice(0, parts.length - 2).join(" ");
    const accent = parts.slice(parts.length - 2).join(" ");
    return (
      <>
        {main} <br />
        <span className="italic font-serif font-normal text-gold-gradient drop-shadow-lg">{accent}</span>
      </>
    );
  } else if (parts.length === 2) {
    return (
      <>
        {parts[0]} <br />
        <span className="italic font-serif font-normal text-gold-gradient drop-shadow-lg">{parts[1]}</span>
      </>
    );
  }
  return text;
}

export default function HeroFullBackgroundSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(HERO_BACKGROUND_SLIDES);
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function loadHeroSettings() {
      try {
        const data = await getHomeSettings();
        if (data) {
          if (data.heroTitle) setHeroTitle(data.heroTitle);
          if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
          if (data.heroSlides && Array.isArray(data.heroSlides) && data.heroSlides.length > 0) {
            setSlides(data.heroSlides);
          } else if (data.heroImage) {
            setSlides([
              {
                id: 'custom-hero-banner',
                title: data.heroTitle || "Active Custom Hero Image",
                location: "Sachin Ghongade Photo Studio",
                tag: "Featured Banner",
                image: data.heroImage,
                objectPos: "50% 50%",
                scale: 1.0,
                fitMode: "cover"
              },
              ...HERO_BACKGROUND_SLIDES
            ]);
          }
        }
      } catch (err) {
        console.error("Error loading home settings in hero:", err);
      }
    }
    loadHeroSettings();
  }, []);

  const total = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Continuous Auto Background Slide Timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15; // subtle tilt
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  const activeData = slides[currentSlide] || slides[0];

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden perspective-1000 bg-[#0E0A08]"
    >
      {/* ================= FULL PAGE HD PARALLAX BACKGROUND SLIDESHOW LAYER ================= */}
      <div className="absolute inset-0 z-0 bg-[#0E0A08] overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeData.id || currentSlide}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              rotateX: -mousePos.y * 0.08,
              rotateY: mousePos.x * 0.08,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full transform-gpu flex items-center justify-center"
          >
            {/* Ambient Blurred Backdrop for Smart Fit / Zero Crop Fill */}
            <img
              src={activeData.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-3xl opacity-40 filter brightness-[0.7] contrast-[1.1]"
            />

            {/* Foreground Main Image with exact fit and custom positioning */}
            <img
              src={activeData.image}
              alt={activeData.title || "Background photo"}
              style={{ 
                objectPosition: (activeData.objectPos || activeData.objectPosition || '50% 50%')
                  .replace('object-[', '')
                  .replace(']', '')
                  .replace(/_/g, ' '),
                transform: `scale(${activeData.scale || activeData.zoom || 1.0})`
              }}
              className={`relative z-10 w-full h-full filter brightness-[1.0] contrast-[1.08] saturate-[1.08] shadow-2xl transition-all duration-300 ${
                activeData.fitMode === 'contain' ? 'object-contain max-h-full' : 'object-cover'
              }`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Minimal Subtle Gradient Overlay for Clean Photo Clarity & Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 z-10" />
        <div className="absolute top-1/4 left-10 w-96 h-96 aura-glow-gold rounded-full pointer-events-none blur-3xl opacity-30 z-10" />
      </div>

      {/* ================= HERO CONTENT CONTAINER ================= */}
      <div className="relative z-20 max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mx-auto pt-24 lg:pt-32 pb-16 text-[#F8F5EF] flex flex-col justify-between h-full min-h-[700px]">
        
        {/* Main Content Layout */}
        <div className="my-auto max-w-3xl space-y-6 pt-12">

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-normal text-[#F8F5EF] leading-[1.15] drop-shadow-2xl"
          >
            {formatStylishTitle(heroTitle)}
          </motion.h1>

        </div>

      </div>

    </section>
  );
}

