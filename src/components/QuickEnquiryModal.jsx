import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, User, Phone, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO } from '../data/photographyData';

export default function QuickEnquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Wedding Photography',
    date: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hello Sachin Ghongade!%0A%0A*New Photoshoot Enquiry*%0A• *Name:* ${encodeURIComponent(formData.name)}%0A• *Phone:* ${encodeURIComponent(formData.phone)}%0A• *Event Type:* ${encodeURIComponent(formData.eventType)}%0A• *Event Date:* ${encodeURIComponent(formData.date || 'TBD')}%0A• *Location/City:* ${encodeURIComponent(formData.location || 'Maharashtra')}`;
    window.open(`https://wa.me/919422427981?text=${text}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#241C18]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-lg bg-[#F8F5EF] rounded-3xl p-6 sm:p-8 border border-[#C5A059]/40 shadow-2xl z-10 space-y-6 text-[#241C18]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#EFE9DE] text-[#5D4B42] hover:text-[#241C18] hover:bg-[#E4D8C8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[10px] uppercase tracking-widest font-semibold text-[#5E6B51]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Instant Consultation</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#241C18] font-normal">
                Book Your <span className="italic text-gold-gradient font-normal">Dream Shoot</span>
              </h3>
              <p className="text-xs text-[#83736A] font-light">
                Fill details below for an instant custom quote & session availability directly on WhatsApp.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#5D4B42] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Your Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul & Sneha"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#EFE9DE] border border-[#E4D8C8] text-xs font-medium focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#5D4B42] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>WhatsApp Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#EFE9DE] border border-[#E4D8C8] text-xs font-medium focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                />
              </div>

              {/* Event Type & Date (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#5D4B42]">
                    Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#EFE9DE] border border-[#E4D8C8] text-xs font-medium focus:outline-none focus:border-[#C5A059] transition-all"
                  >
                    <option value="Wedding Photography">Wedding Photography</option>
                    <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                    <option value="Event / Function">Event / Function</option>
                    <option value="Baby & Maternity">Baby & Maternity</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#5D4B42] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl bg-[#EFE9DE] border border-[#E4D8C8] text-xs font-medium focus:outline-none focus:border-[#C5A059] transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#5D4B42] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Venue Location / City</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vita, Sangli, Karad, Pune"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#EFE9DE] border border-[#E4D8C8] text-xs font-medium focus:outline-none focus:border-[#C5A059] transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#5E6B51] to-[#4B5640] text-[#F8F5EF] text-xs uppercase font-bold tracking-[0.2em] shadow-lg hover:shadow-xl hover:from-[#4B5640] hover:to-[#394230] transition-all duration-300 group mt-4"
              >
                <span>Send WhatsApp Enquiry</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
