import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ item, items, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#241C18]/98 backdrop-blur-xl p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
          {/* Image Counter */}
          <span className="text-xs uppercase tracking-[0.25em] text-[#8D9B7A] font-mono pointer-events-auto">
            {currentIndex + 1} / {items.length}
          </span>

          <div className="flex items-center gap-3 pointer-events-auto">
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#5E6B51] text-[#F8F5EF] text-xs font-semibold uppercase tracking-wider hover:bg-[#4B5640] transition-colors rounded-full"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Enquire Shoot</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close Lightbox"
              className="p-2.5 text-[#F8F5EF]/80 hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A] rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 z-40 p-3 text-[#F8F5EF]/70 hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A] rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Next Button */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 z-40 p-3 text-[#F8F5EF]/70 hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A] rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Main Lightbox Image View */}
        <motion.div
          key={item.id}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
        >
          <img
            src={item.image}
            alt={item.title || 'Samarth Studios Photography'}
            className="max-h-[78vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
          />

          {/* Minimal Caption */}
          <div className="pt-4 text-center space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8D9B7A] font-semibold">
              {item.category}
            </span>
            {item.title && (
              <h3 className="font-serif text-lg font-normal text-[#F8F5EF]">
                {item.title}
              </h3>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
