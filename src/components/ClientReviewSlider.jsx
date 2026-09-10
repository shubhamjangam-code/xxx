import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';

// Enhanced Editorial Client Testimonials Dataset
export const ENHANCED_REVIEWS = [
  {
    id: 1,
    quote: "Nana Lipare and the Samarth Studio team made our wedding memories look like a royal movie. Every haldi ritual and bridal portrait was captured with such grace and rich colors!",
    names: "Suraj & Pranali",
    venue: "Grand Palace Lawns, Vita",
    city: "Vita, Maharashtra",
    rating: 5,
    tag: "Wedding & Haldi",
    eventDate: "Nov 2025",
    portraitImg: "/Weddings/Image-44116.jpg"
  },
  {
    id: 2,
    quote: "Our pre-wedding shoot experience was unbelievable! Nana sir guided us so naturally — nothing felt staged or uncomfortable. The cinematic color tones are world-class.",
    names: "Tanvi & Digvijay",
    venue: "Sayaji Royal Gardens",
    city: "Karad",
    rating: 5,
    tag: "Pre-Wedding Shoot",
    eventDate: "Dec 2025",
    portraitImg: "/Weddings/Image-96657.jpg"
  },
  {
    id: 3,
    quote: "The baby photoshoot exceeded all our expectations! They were so gentle, patient, and creative with our 6-month-old. Truly the finest photography studio in the region.",
    names: "Priyanka & Rahul",
    venue: "Samarth Studio Indoor Set",
    city: "Sangli",
    rating: 5,
    tag: "Baby Milestone Shoot",
    eventDate: "Jan 2026",
    portraitImg: "/baby-shoot/Image-25018.jpg"
  },
  {
    id: 4,
    quote: "Professionalism, artistic vision, and incredible lighting. They captured our traditional Maharashtrian rituals with immense respect and perfection. Highly recommended!",
    names: "Akshay & Snehal",
    venue: "Hotel Saffron Executive",
    city: "Vita",
    rating: 5,
    tag: "Grand Wedding Ceremony",
    eventDate: "Feb 2026",
    portraitImg: "/Weddings/Image-33097.jpg"
  },
  {
    id: 5,
    quote: "From the Haldi yellow vibrant portraits to our emotional Bidaai frames, every single photograph tells an authentic emotional story. We will cherish these albums forever.",
    names: "Rohan & Shraddha",
    venue: "Green Acres Resort",
    city: "Satara",
    rating: 5,
    tag: "Haldi & Wedding Film",
    eventDate: "Jan 2026",
    portraitImg: "/Haldi/Image-19038.jpg"
  }
];

export default function ClientReviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = ENHANCED_REVIEWS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay Timer
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, nextSlide]);

  // Touch Swipe Handlers (Embla/Swiper gesture support)
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#F8F5EF] overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 aura-glow-gold rounded-full pointer-events-none blur-3xl opacity-40" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 aura-glow-sage rounded-full pointer-events-none blur-3xl opacity-30" />

      <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto relative z-10 space-y-12">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#E4D8C8]/80">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DE] border border-[#E4D8C8] text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5E6B51]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Real Couple Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18] leading-tight">
              Kind Words from <br />
              <span className="italic text-gold-gradient font-normal">Our Celebrations</span>
            </h2>
          </div>

          {/* Right Side Rating Summary Card */}
          <div className="flex items-center gap-4 bg-[#EFE9DE]/90 border border-[#E4D8C8] p-4 sm:px-6 sm:py-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] font-serif font-bold text-lg border border-[#C5A059]/30">
                4.9
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#241C18] tracking-wide">Google Verified Reviews</p>
                <p className="text-[10px] text-[#83736A] font-mono">500+ Happy Couples • Vita & Sangli</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= EDITORIAL REVIEW SLIDER CONTAINER ================= */}
        <div
          className="relative min-h-[380px] sm:min-h-[340px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            {ENHANCED_REVIEWS.map((review, idx) => {
              if (idx !== currentIndex) return null;
              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 40, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl glass-card border border-[#E4D8C8] gold-border-glow shadow-xl"
                >
                  {/* LEFT: Portrait Thumbnail & Couple Identity */}
                  <div className="lg:col-span-4 flex items-center lg:flex-col lg:items-start gap-6 border-b lg:border-b-0 lg:border-r border-[#E4D8C8]/70 pb-6 lg:pb-0 lg:pr-8">
                    {/* High-Res Portrait Thumbnail */}
                    <div className="relative w-24 h-28 sm:w-28 sm:h-36 rounded-2xl overflow-hidden shadow-md border-2 border-[#C5A059]/40 flex-shrink-0 group">
                      <img
                        src={review.portraitImg}
                        alt={review.names}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/60 to-transparent" />
                    </div>

                    <div className="space-y-2">
                      {/* Verified Badge */}
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#5E6B51] bg-[#EFE9DE] px-2.5 py-1 rounded-full w-fit">
                        <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                        <span>Verified Couple</span>
                      </div>

                      {/* Couple Names */}
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#241C18] font-normal leading-snug">
                        {review.names}
                      </h3>

                      {/* Venue & Location */}
                      <div className="space-y-1 text-xs text-[#83736A]">
                        <div className="flex items-center gap-1.5 font-medium text-[#5D4B42]">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                          <span className="truncate">{review.venue}</span>
                        </div>
                        <p className="font-mono text-[11px] pl-5">{review.city} • {review.eventDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Star Rating & Editorial Quote */}
                  <div className="lg:col-span-8 space-y-6 flex flex-col justify-between h-full">
                    
                    {/* 5-Star Gold Ratings & Service Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />
                        ))}
                        <span className="ml-2 text-xs font-semibold text-[#241C18] tracking-wider">
                          5.0 / 5.0 Rating
                        </span>
                      </div>

                      <span className="px-3.5 py-1.5 rounded-full bg-[#241C18] text-[#F8F5EF] text-[10px] uppercase tracking-[0.2em] font-semibold">
                        {review.tag}
                      </span>
                    </div>

                    {/* Editorial Italic Quote */}
                    <blockquote className="font-serif text-lg sm:text-2xl font-light italic text-[#241C18] leading-relaxed">
                      "{review.quote}"
                    </blockquote>

                    {/* Sub-Footer Detail */}
                    <div className="pt-4 border-t border-[#E4D8C8]/60 flex items-center justify-between text-xs text-[#83736A]">
                      <span className="font-mono">Photographed by Nana Lipare</span>
                      <span className="text-[#5E6B51] font-semibold underline underline-offset-4 decoration-[#C5A059]">
                        Samarth Studios Vita
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ================= PAGINATION DOTS ================= */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {ENHANCED_REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-[#C5A059]'
                  : 'w-2.5 bg-[#E4D8C8] hover:bg-[#83736A]'
              }`}
            />
          ))}
        </div>

      </div>



    </section>
  );
}
