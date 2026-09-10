import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS, STUDIO_INFO } from '../data/photographyData';
import Lightbox from '../components/Lightbox';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      setSelectedCategory(catFromUrl);
    }
  }, [searchParams]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setLightboxIndex(null);
    if (catId === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <PageTransition>
      {/* Full-width Warm Ivory Page Section */}
      <div className="w-full bg-[#F8F5EF] pt-24 sm:pt-28 pb-12 md:pb-16">
        
        {/* Inner Content Container */}
        <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto space-y-12">
          
          {/* Page Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#5E6B51] font-semibold">
              Samarth Studios Vita
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#241C18] tracking-tight">
              Selected Stories
            </h1>
          </div>

          {/* Category Filters */}
          <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto pb-4 border-b border-[#E4D8C8]">
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-200 ${
                    isActive
                      ? 'text-[#5E6B51] border-b-2 border-[#5E6B51] font-semibold'
                      : 'text-[#83736A] hover:text-[#241C18]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Masonry Gallery */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLightboxIndex(index)}
                  className="group cursor-pointer relative overflow-hidden editorial-zoom-container break-inside-avoid rounded-2xl border border-[#E4D8C8]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full object-cover filter brightness-95 group-hover:brightness-105 editorial-zoom-img"
                  />

                  {/* Subtle Hover Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#8D9B7A] font-semibold">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-light text-[#F8F5EF] mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Lightbox Modal */}
          <Lightbox
            item={currentLightboxItem}
            items={filteredItems}
            currentIndex={lightboxIndex || 0}
            onClose={() => setLightboxIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          {/* Bottom Booking & Instagram Strip */}
          <div className="pt-16 border-t border-[#E4D8C8] text-center max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#241C18]">
              Let’s make your story unforgettable.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase font-semibold tracking-[0.2em] text-[#F8F5EF] bg-[#5E6B51] hover:bg-[#4B5640] transition-all duration-300 rounded-full shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href={STUDIO_INFO.studioInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase font-semibold tracking-[0.2em] text-[#5E6B51] border border-[#5E6B51] hover:bg-[#5E6B51] hover:text-[#F8F5EF] transition-all duration-300 rounded-full"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}
