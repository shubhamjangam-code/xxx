import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { SERVICES_LIST, STUDIO_INFO } from '../data/photographyData';
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
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

  const frameBackdrops = [
    'bg-gradient-to-br from-[#8D9B7A]/20 via-[#F8F5EF] to-[#D9A79B]/15',
    'bg-gradient-to-br from-[#D9A79B]/20 via-[#F8F5EF] to-[#8D9B7A]/15',
    'bg-gradient-to-br from-[#C5A059]/20 via-[#F8F5EF] to-[#8D9B7A]/15',
  ];

  return (
    <PageTransition>
      {/* Full-width Warm Ivory Outer Wrapper */}
      <div className="w-full bg-[#F8F5EF] pt-24 sm:pt-32 pb-16 md:pb-24">
        
        {/* Inner Content Container */}
        <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mx-auto space-y-24">
          
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5E6B51]/10 border border-[#5E6B51]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#5E6B51]" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#5E6B51] font-semibold">
                Sachin Ghongade Photo Studio
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#241C18] tracking-tight">
              Crafted Services & <span className="italic text-[#C5A059] font-light">Visual Stories.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5D4B42] font-light max-w-xl mx-auto leading-relaxed">
              Every celebration, emotion & detail thoughtfully captured by Sachin Ghongade & team.
            </p>
          </div>

          {/* Service Cards Section */}
          <div className="space-y-24">
            {SERVICES_LIST.map((service, index) => {
              const isEven = index % 2 === 0;
              const bgGradient = frameBackdrops[index % frameBackdrops.length];
              const whatsappEnquiryLink = `https://wa.me/919422427981?text=${encodeURIComponent(
                `Hello Sachin Ghongade, I am interested in ${service.title} at Sachin Ghongade Photo Studio.`
              )}`;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b border-[#E4D8C8]/80 pb-20 scroll-mt-32"
                >
                  {/* Photo Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className={`p-4 sm:p-5 rounded-3xl ${bgGradient} border border-[#E4D8C8] shadow-lg relative group`}>
                      {/* Floating Tag Badge */}
                      {service.tag && (
                        <div className="absolute top-8 right-8 z-20 px-4 py-1.5 rounded-full bg-[#241C18]/85 backdrop-blur-md text-[#F8F5EF] text-[10px] font-semibold tracking-[0.25em] uppercase border border-white/20 shadow-md">
                          ✦ {service.tag}
                        </div>
                      )}

                      <div className="aspect-[16/10] overflow-hidden editorial-zoom-container rounded-2xl shadow-sm relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover object-center filter brightness-[0.97] contrast-[1.03] editorial-zoom-img group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>

                  {/* Text Content Column */}
                  <div
                    className={`lg:col-span-5 space-y-5 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="space-y-1.5">
                      {service.subtitle && (
                        <span className="text-[11px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold block">
                          {service.subtitle}
                        </span>
                      )}

                      <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#241C18]">
                        {service.title}
                      </h2>
                    </div>

                    {/* Short Horizontal Pill Badges */}
                    {service.tags && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-[#EFE9DE] border border-[#E4D8C8] text-[11px] font-medium tracking-wider text-[#3E322B] uppercase"
                          >
                            ✦ {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Compact Stylish CTA */}
                    <div className="pt-2">
                      <a
                        href={whatsappEnquiryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F8F5EF] bg-gradient-to-r from-[#241C18] to-[#3E322B] hover:from-[#5E6B51] hover:to-[#4B5640] transition-all duration-300 rounded-full shadow-md group/btn"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#C5A059] fill-current" />
                        <span>Enquire</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Booking CTA Strip */}
          <section className="py-16 px-8 rounded-3xl bg-gradient-to-r from-[#241C18] via-[#352822] to-[#241C18] text-[#F8F5EF] text-center max-w-4xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#8D9B7A]/20 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-4">
              <span className="text-xs uppercase tracking-[0.35em] text-[#C5A059] font-semibold">
                Custom Photography Concepts
              </span>
              
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F8F5EF] tracking-tight">
                Ready to plan your <span className="italic text-[#C5A059]">special session?</span>
              </h2>

              <p className="text-sm sm:text-base text-[#E4D8C8]/90 font-light max-w-xl mx-auto leading-relaxed">
                Connect directly with lead photographer Sachin Ghongade on WhatsApp for personalized date availability, custom package quotes, and location planning.
              </p>

              <div className="pt-4">
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-9 py-4 text-xs uppercase font-semibold tracking-[0.22em] text-[#241C18] bg-[#F8F5EF] hover:bg-[#C5A059] hover:text-[#F8F5EF] transition-all duration-300 rounded-full shadow-lg group/bottom"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-[#5E6B51] group-hover/bottom:text-[#F8F5EF]" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover/bottom:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>
          </section>

        </div>

      </div>
    </PageTransition>
  );
}
