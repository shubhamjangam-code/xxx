import React from 'react';
import { NavLink } from 'react-router-dom';
import { STUDIO_INFO } from '../data/photographyData';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#241C18] border-t border-[#5E6B51]/30 text-[#F8F5EF]/80 pt-16 pb-8">
      <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F8F5EF]/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.15em] uppercase text-[#F8F5EF]">
                SAMARTH STUDIOS VITA
              </span>
              <span className="text-[11px] text-[#8D9B7A] tracking-[0.25em] font-semibold uppercase mt-0.5">
                Photography by Nana Lipare
              </span>
            </div>
            <p className="text-sm font-serif italic text-[#F8F5EF]/90 max-w-sm">
              “Capturing moments. Preserving stories.”
            </p>
          </div>

          {/* Links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#F8F5EF] uppercase font-sans">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <NavLink to="/" className="hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A]">Home</NavLink>
              </li>
              <li>
                <NavLink to="/portfolio" className="hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A]">Portfolio</NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A]">Services</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A]">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A]">Contact</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#F8F5EF] uppercase font-sans">
              Contact & Studio
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={STUDIO_INFO.callUrl}
                className="flex items-center gap-2 text-[#F8F5EF]/90 hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A]"
              >
                <Phone className="w-3.5 h-3.5 text-[#8D9B7A]" />
                <span>{STUDIO_INFO.phone}</span>
              </a>

              <a
                href={STUDIO_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F8F5EF]/90 hover:text-[#8D9B7A] transition-colors focus-visible:outline-2 focus-visible:outline-[#8D9B7A]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8D9B7A]" />
                <span>Advi Peth, Vita, Maharashtra</span>
              </a>

              <a
                href={STUDIO_INFO.studioInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#B89A62] hover:text-[#F8F5EF] transition-colors pt-1 focus-visible:outline-2 focus-visible:outline-[#8D9B7A]"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>@samarth_studio_vita</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EF]/50 tracking-wider">
          <p>© 2026 Samarth Studios Vita. All rights reserved.</p>
          <p className="font-mono text-[11px]">Crafted for Nana Lipare</p>
        </div>

      </div>
    </footer>
  );
}
