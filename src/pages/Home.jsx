import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import HeroFullBackgroundSlider from '../components/HeroFullBackgroundSlider';
import { STUDIO_INFO, HOME_CATEGORY_TILES, STUDIO_STATS } from '../data/photographyData';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

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
              <span className="text-xs uppercase tracking-[0.3em] text-[#5E6B51] font-semibold">
                Specialized Craft
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOME_CATEGORY_TILES.map((tile) => (
              <motion.div
                key={tile.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleTileClick(tile.categoryFilter)}
                className="group relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden cursor-pointer border border-[#E4D8C8] shadow-lg"
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/90 via-[#241C18]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#F3E5AB]">
                    Portfolio Category
                  </span>
                  <h3 className="font-serif text-3xl text-[#F8F5EF] font-normal">
                    {tile.title}
                  </h3>
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-[#C5A059] group-hover:text-[#F3E5AB] transition-colors">
                    <span>Explore Stories</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= 3. STUDIO STATS & LEGACY RIBBON ================= */}
        <section className="bg-[#EFE9DE] border-y border-[#E4D8C8] py-14">
          <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STUDIO_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-2 p-4">
                <p className="font-serif text-4xl sm:text-5xl font-light text-[#5E6B51]">
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




      </div>
    </PageTransition>
  );
}

