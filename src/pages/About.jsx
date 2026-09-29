import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { STUDIO_INFO } from '../data/photographyData';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { motion } from 'framer-motion';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <PageTransition>
      {/* Full-width Warm Ivory Outer Wrapper */}
      <div className="w-full bg-[#F8F5EF] pt-24 sm:pt-28 pb-12 md:pb-16">
        
        {/* Inner Content Container */}
        <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto space-y-16">
          
          {/* Main Content Layout */}
          <div id="sachin-ghongade" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center scroll-mt-28 max-w-5xl mx-auto">
            
            {/* Main Photographer Image / Logo */}
            <div className="md:col-span-5 relative">
              <div className="absolute -inset-3 bg-[#C5A059]/20 rounded-2xl transform -rotate-1 pointer-events-none" />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden editorial-zoom-container border-4 border-[#F8F5EF] shadow-xl bg-black flex items-center justify-center">
                <img
                  src="/sachin_ghongade_logo.jpg"
                  alt="Sachin Ghongade - Sachin Ghongade Photo Studio"
                  className="w-full h-full object-cover filter brightness-95 contrast-105 editorial-zoom-img"
                />
              </div>
            </div>

            {/* Text Bio Content */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.35em] text-[#5E6B51] font-semibold">
                  Behind the Lens
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#241C18]">
                  {STUDIO_INFO.owner}
                </h1>
                <p className="text-xs text-[#83736A] uppercase tracking-widest font-mono pt-0.5">
                  Founder & Lead Photographer
                </p>
              </div>

              <p className="text-base text-[#5D4B42] font-light leading-relaxed">
                At Sachin Ghongade Photo Studio, every photograph begins with a real moment. Sachin Ghongade brings a calm, personal and cinematic approach to weddings, portraits and celebrations — creating images that feel as meaningful years later as they do today.
              </p>

              {/* Our Approach Section */}
              <div id="our-approach" className="pt-2 pb-2 border-l-2 border-[#B89A62] pl-4 scroll-mt-28">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#5E6B51] font-semibold block mb-1">
                  OUR PHILOSOPHY
                </span>
                <p className="font-serif italic text-2xl text-[#B89A62]">
                  “Preserve moments. Keep stories alive.”
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a
                  href={STUDIO_INFO.nanaInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#5E6B51] border border-[#5E6B51] hover:bg-[#5E6B51] hover:text-[#F8F5EF] transition-all duration-300 rounded-full"
                >
                  <InstagramIcon className="w-4 h-4 text-[#5E6B51]" />
                  <span>Follow on Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F8F5EF] bg-[#5E6B51] hover:bg-[#4B5640] transition-all duration-300 rounded-full shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Book a Shoot</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  );
}
