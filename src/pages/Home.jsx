import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import HeroFullBackgroundSlider from '../components/HeroFullBackgroundSlider';
import HomePortfolioGrid from '../components/HomePortfolioGrid';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ClientReviewSlider from '../components/ClientReviewSlider';
import InstagramFeed from '../components/InstagramFeed';
import QuickEnquiryModal from '../components/QuickEnquiryModal';
import { STUDIO_INFO, HOME_CATEGORY_TILES, STUDIO_STATS, WHY_CHOOSE_US } from '../data/photographyData';
import { ArrowRight, Sparkles, Camera, Heart, ShieldCheck, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const handleTileClick = (catFilter) => {
    navigate(`/portfolio?category=${encodeURIComponent(catFilter)}`);
  };

  return (
    <PageTransition>
      {/* Full Canvas with Warm Ivory & Ambient Light Gradients */}
      <div className="w-full bg-[#F8F5EF] space-y-16 md:space-y-28 pb-16">
        
        {/* ================= 1. FULL PAGE BACKGROUND PHOTO HERO SECTION ================= */}
        <div className="w-full">
          <HeroFullBackgroundSlider />
        </div>

        {/* ================= 2. FEATURED PORTFOLIO CATEGORY TILES ================= */}
        <section className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E4D8C8]">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-[#5E6B51] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Specialized Craft</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18]">
                Explore Our <span className="italic font-normal text-gold-gradient">Collections</span>
              </h2>
            </div>
            <NavLink
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5E6B51] hover:text-[#241C18] transition-colors"
            >
              <span>View All Portfolios</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_CATEGORY_TILES.map((tile) => (
              <motion.div
                key={tile.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleTileClick(tile.categoryFilter)}
                className="group relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden cursor-pointer border border-[#E4D8C8] shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/90 via-[#241C18]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#F3E5AB] bg-[#241C18]/80 backdrop-blur-xs px-3 py-1 rounded-full w-fit border border-[#C5A059]/30">
                    Portfolio Category
                  </span>
                  <h3 className="font-serif text-3xl text-[#F8F5EF] font-normal">
                    {tile.title}
                  </h3>
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-[#C5A059] group-hover:text-[#F3E5AB] transition-colors">
                    <span>Explore Stories</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= 3. LIVE FILTERABLE PORTFOLIO GRID ================= */}
        <HomePortfolioGrid />

        {/* ================= 4. BEFORE & AFTER RETOUCHING COMPARISON SLIDER ================= */}
        <BeforeAfterSlider />

        {/* ================= 5. STUDIO STATS & LEGACY RIBBON ================= */}
        <section className="bg-[#EFE9DE] border-y border-[#E4D8C8] py-16">
          <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STUDIO_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-3 p-6 glass-card rounded-2xl border border-[#E4D8C8]/80 shadow-sm">
                <p className="font-serif text-4xl sm:text-5xl font-light text-[#5E6B51] text-gold-gradient">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#241C18]">
                  {stat.label}
                </p>
                <p className="text-[11px] text-[#83736A] font-light max-w-xs mx-auto">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 6. WHY CHOOSE US CARDS ================= */}
        <section className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DE] border border-[#E4D8C8] text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5E6B51]">
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Unmatched Signature Artistry</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18]">
              Why Couples Choose <span className="italic font-normal text-gold-gradient">Sachin Ghongade</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl glass-card border border-[#E4D8C8] space-y-4 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                  {idx === 0 && <Camera className="w-6 h-6" />}
                  {idx === 1 && <Heart className="w-6 h-6" />}
                  {idx === 2 && <Sparkles className="w-6 h-6" />}
                  {idx === 3 && <ShieldCheck className="w-6 h-6" />}
                </div>
                <h3 className="font-serif text-2xl text-[#241C18] font-normal">{item.title}</h3>
                <p className="text-xs text-[#83736A] font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 7. EDITORIAL CLIENT REVIEWS SLIDER ================= */}
        <ClientReviewSlider />

        {/* ================= 8. INSTAGRAM JOURNAL FEED ================= */}
        <InstagramFeed />

        {/* ================= 9. LUXURY CALL-TO-ACTION BANNER ================= */}
        <section className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-[#241C18] text-[#F8F5EF] p-10 sm:p-16 border border-[#C5A059]/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FFF2AA]">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Limited Booking Slots Available</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight">
                Ready to Preserve Your <br />
                <span className="italic font-normal text-gold-bright">Unforgettable Stories?</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#E4D8C8]/80 font-light">
                Let’s create timeless photograph collections, flush-mount albums, and cinematic films for your special day.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A059] to-[#AA771C] text-[#241C18] font-bold text-xs uppercase tracking-[0.25em] shadow-xl hover:scale-105 hover:brightness-110 transition-all duration-300 flex items-center gap-3"
              >
                <span>Book Your Date Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Quick Enquiry Modal */}
      <QuickEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </PageTransition>
  );
}
