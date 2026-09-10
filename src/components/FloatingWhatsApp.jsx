import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href={STUDIO_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp"
        className="relative flex items-center justify-center w-13 h-13 rounded-full bg-[#5E6B51] text-[#F8F5EF] border border-[#B89A62]/60 shadow-xl hover:bg-[#4B5640] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-6 h-6 fill-current" />

        {/* Refined Tooltip */}
        <span className="absolute right-15 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#241C18] text-[#F8F5EF] border border-[#B89A62]/30 px-3 py-1.5 rounded-full text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
          Book on WhatsApp
        </span>
      </a>
    </div>
  );
}
