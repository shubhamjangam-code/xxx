import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../data/photographyData';
import { ArrowRight, Maximize2, Sparkles, Filter } from 'lucide-react';
import Lightbox from './Lightbox';
import WatermarkOverlay from './WatermarkOverlay';

const CATEGORIES = [
  { key: 'All', label: 'All Stories' },
  { key: 'Weddings', label: 'Weddings' },
  { key: 'Pre-Wedding', label: 'Pre-Wedding' },
  { key: 'Family & Events', label: 'Events & Functions' },
  { key: 'Baby & Kids', label: 'Baby & Kids' }
];

export default function HomePortfolioGrid() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredWorks = activeTab === 'All'
    ? PORTFOLIO_ITEMS.slice(0, 8)
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeTab).slice(0, 8);

  return (
    <section className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto space-y-10">
      
      {/* Header and Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#E4D8C8]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#5E6B51] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18]">
            Masterwork <span className="italic font-normal text-gold-gradient">Gallery</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === cat.key
                  ? 'text-[#F8F5EF]'
                  : 'text-[#5D4B42] hover:text-[#241C18] hover:bg-[#EFE9DE]'
              }`}
            >
              {activeTab === cat.key && (
                <motion.div
                  layoutId="activeHomeTab"
                  className="absolute inset-0 bg-[#5E6B51] rounded-full shadow-md z-0"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-[#E4D8C8] shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.95]"
              />

              {/* Watermark Protection */}
              <WatermarkOverlay />

              {/* Gradient Darkening Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/90 via-[#241C18]/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              {/* Top Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#241C18]/70 backdrop-blur-md border border-[#C5A059]/40 flex items-center justify-center text-[#F3E5AB] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A059] bg-[#241C18]/80 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit">
                  {item.category}
                </span>
                <h3 className="font-serif text-2xl text-[#F8F5EF] font-normal leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#E4D8C8]/80 font-mono">
                  {item.location || 'Maharashtra'}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Component */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredWorks.map((w) => w.image)}
          titles={filteredWorks.map((w) => w.title)}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
