import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { STUDIO_INFO } from '../data/photographyData';
import { Phone, MapPin, MessageCircle, Send, Navigation, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { motion } from 'framer-motion';

import { saveContactMessage } from '../services/dataService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shootType: 'Wedding Photography',
    eventDate: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save inquiry to Firestore for Admin Messages tab
    try {
      await saveContactMessage({
        name: formData.name,
        phone: formData.phone,
        eventCategory: formData.shootType,
        date: formData.eventDate,
        message: formData.message
      });
    } catch (err) {
      console.error("Could not save inquiry to Firestore:", err);
    }

    const whatsappText = `Hello Sachin Ghongade,\n\nI want to enquire about a shoot at Sachin Ghongade Photo Studio.\n\n` +
      `• Name: ${formData.name || 'Not specified'}\n` +
      `• Mobile Number: ${formData.phone || 'Not specified'}\n` +
      `• Shoot Type: ${formData.shootType}\n` +
      `• Event Date: ${formData.eventDate || 'To be decided'}\n` +
      `• Message: ${formData.message || 'No additional message'}`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappRedirectUrl = `https://wa.me/919422427981?text=${encodedText}`;

    window.open(whatsappRedirectUrl, '_blank');
  };


  return (
    <PageTransition>
      {/* Full-width Warm Ivory Outer Wrapper */}
      <div className="w-full bg-[#F8F5EF] pt-24 sm:pt-28 pb-12 md:pb-16">

        {/* Inner Content Container */}
        <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto space-y-14">

          <div className="max-w-4xl mx-auto space-y-14">

            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.35em] text-[#5E6B51] font-semibold">
                Sachin Ghongade Photo Studio
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#241C18] tracking-tight">
                Let’s capture your story.
              </h1>
              <p className="text-sm sm:text-base text-[#5D4B42] font-light tracking-wide">
                Share a few details about your celebration and we will get back to you.
              </p>
            </div>

            {/* Premium Enquiry Form Panel */}
            <div className="bg-[#EFE9DE]/70 border border-[#E4D8C8] p-8 sm:p-12 rounded-2xl space-y-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.18em] text-[#5E6B51] font-semibold block">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-[#FFFFFF] border border-[#E4D8C8] text-[#241C18] placeholder-[#83736A]/50 focus:border-[#5E6B51] focus:outline-none transition-colors text-sm rounded-xl"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.18em] text-[#5E6B51] font-semibold block">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-[#FFFFFF] border border-[#E4D8C8] text-[#241C18] placeholder-[#83736A]/50 focus:border-[#5E6B51] focus:outline-none transition-colors text-sm rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Shoot Type */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.18em] text-[#5E6B51] font-semibold block">
                      Shoot Type *
                    </label>
                    <select
                      name="shootType"
                      value={formData.shootType}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-[#FFFFFF] border border-[#E4D8C8] text-[#241C18] focus:border-[#5E6B51] focus:outline-none transition-colors text-sm rounded-xl"
                    >
                      <option value="Wedding Photography">Wedding Photography</option>
                      <option value="Cinematic Wedding Film">Cinematic Wedding Film</option>
                      <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                      <option value="Maternity Shoot">Maternity Shoot</option>
                      <option value="Baby & Children Photography">Baby & Children Photography</option>
                      <option value="Couple & Family Portrait">Couple & Family Portrait</option>
                      <option value="Events & Keepsakes">Events & Keepsakes</option>
                    </select>
                  </div>

                  {/* Event Date */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.18em] text-[#5E6B51] font-semibold block">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-[#FFFFFF] border border-[#E4D8C8] text-[#241C18] focus:border-[#5E6B51] focus:outline-none transition-colors text-sm rounded-xl"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.18em] text-[#5E6B51] font-semibold block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Details about your event location, preferred timings, or questions..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-[#FFFFFF] border border-[#E4D8C8] text-[#241C18] placeholder-[#83736A]/50 focus:border-[#5E6B51] focus:outline-none transition-colors text-sm rounded-xl resize-none"
                  />
                </div>

                {/* Submit Pill Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 text-xs uppercase font-semibold tracking-[0.2em] text-[#F8F5EF] bg-[#5E6B51] hover:bg-[#4B5640] transition-all duration-300 rounded-full shadow-md"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>Send Enquiry on WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Below Form Contact Details Strip */}
            <div className="pt-6 border-t border-[#E4D8C8] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">

              {/* Phone / WhatsApp */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E6B51] font-semibold">
                  WhatsApp / Call
                </span>
                <a
                  href={STUDIO_INFO.callUrl}
                  className="text-base font-normal text-[#241C18] hover:text-[#5E6B51] transition-colors block"
                >
                  {STUDIO_INFO.phone}
                </a>
              </div>

              {/* Location & Get Directions */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E6B51] font-semibold">
                  Location
                </span>
                <p className="text-sm text-[#5D4B42]">Advi Peth, Vita, Maharashtra</p>
                <a
                  href={STUDIO_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#5E6B51] hover:text-[#241C18] pt-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Instagram */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E6B51] font-semibold">
                  Instagram
                </span>
                <a
                  href={STUDIO_INFO.studioInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-[#241C18] hover:text-[#5E6B51] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#5E6B51]" />
                  <span>{STUDIO_INFO.instagramHandle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  );
}
