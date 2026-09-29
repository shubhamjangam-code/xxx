import React from 'react';
import { STUDIO_INFO } from '../data/photographyData';
import { InstagramIcon } from './Icons';
import { Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import WatermarkOverlay from './WatermarkOverlay';

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: '/Weddings/wedding-4.jpg',
    likes: '1,420',
    comments: '88',
    caption: 'Royal wedding portraits captured in natural warmth ✨ #MaharashtrianWedding #SachinGhongade'
  },
  {
    id: 2,
    image: '/Prewedding/prewedding-1.jpg',
    likes: '2,150',
    comments: '134',
    caption: 'Golden hour silhouette & romance at Sayaji Gardens 🌅 #PreWeddingStory'
  },
  {
    id: 3,
    image: '/baby-shoot/Image-25018.jpg',
    likes: '980',
    comments: '45',
    caption: 'Little moments, everlasting joy! 🍼 Newborn milestone session #BabyPhotography'
  },
  {
    id: 4,
    image: '/Weddings/wedding-2.webp',
    likes: '1,890',
    comments: '102',
    caption: 'Haldi vibrant emotions & happiness! Sacred rituals preserved forever 💛 #BridalPortraits'
  }
];

export default function InstagramFeed() {
  return (
    <section className="w-full py-16 bg-[#EFE9DE]/60 border-y border-[#E4D8C8]">
      <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E4D8C8]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#5E6B51] font-semibold">
              <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
              <span>@sachin_ghongade_sg</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18]">
              Follow Our <span className="italic font-normal text-gold-gradient">Instagram Journal</span>
            </h2>
          </div>

          <a
            href={STUDIO_INFO.studioInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#241C18] text-[#F8F5EF] text-xs font-semibold uppercase tracking-[0.2em] shadow-lg hover:bg-[#5E6B51] transition-all duration-300 group"
          >
            <InstagramIcon className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E4D8C8]" />
          </a>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={STUDIO_INFO.studioInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[320px] rounded-2xl overflow-hidden cursor-pointer border border-[#E4D8C8] shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={post.image}
                alt="Instagram Post"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              <WatermarkOverlay />

              {/* Hover Overlay with Likes/Comments & Caption */}
              <div className="absolute inset-0 bg-[#241C18]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-[#F8F5EF]">
                <div className="flex items-center justify-between text-xs font-mono text-[#C5A059]">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-current text-[#C5A059]" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-[#C5A059]" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <p className="text-xs text-[#E4D8C8] font-light line-clamp-3 italic">
                  "{post.caption}"
                </p>

                <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFF2AA]">
                  <span>View Post on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
