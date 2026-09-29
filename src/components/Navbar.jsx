

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { STUDIO_INFO } from '../data/photographyData';
import { Menu, X, ArrowRight, ChevronDown, Camera, Film, Heart, Baby, Users, Image } from 'lucide-react';
import { InstagramIcon } from './Icons';
import QuickEnquiryModal from './QuickEnquiryModal';

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  }, [location.pathname, location.search, location.hash]);

  // Close dropdown on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (linkName) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(linkName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const navItems = [
    {
      name: 'Home',
      path: '/',
      hasDropdown: false,
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
      hasDropdown: true,
      dropdownItems: [
        { label: 'All Stories', path: '/portfolio', icon: Image },
        { label: 'Weddings', path: '/portfolio?category=Weddings', icon: Heart },
        { label: 'Pre-Wedding', path: '/portfolio?category=Pre-Wedding', icon: Camera },
        { label: 'Events & Celebrations', path: '/portfolio?category=Family%20%26%20Events', icon: Image },
        { label: 'Baby & Kids', path: '/portfolio?category=Baby%20%26%20Kids', icon: Baby },
      ]
    },
    {
      name: 'Services',
      path: '/services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Wedding Photography & Films', path: '/services#wedding-photography', icon: Camera },
        { label: 'Pre-Wedding Shoots & Films', path: '/services#prewedding-shoots', icon: Heart },
        { label: 'Events & Celebrations', path: '/services#family-events', icon: Image },
        { label: 'Baby & Kids Shoots', path: '/services#baby-kids', icon: Baby },
      ]
    },
    {
      name: 'About',
      path: '/about',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Meet Sachin Ghongade', path: '/about#sachin-ghongade', icon: Users },
        { label: 'Our Approach', path: '/about#our-approach', icon: Heart },
        { label: 'Follow on Instagram', external: STUDIO_INFO.studioInstagram, icon: InstagramIcon },
      ]
    },
    {
      name: 'Contact',
      path: '/contact',
      hasDropdown: false,
    }
  ];

  const handleSubItemClick = (item) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (item.external) {
      window.open(item.external, '_blank', 'noopener,noreferrer');
    } else if (item.path.includes('#')) {
      const [route, hash] = item.path.split('#');
      if (location.pathname !== route) {
        navigate(item.path);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(item.path);
    }
  };

  const isHomePage = location.pathname === '/';
  // Dynamic smooth ratio from 0 (top of hero) to 1 (past 350px)
  const mergeRatio = isHomePage ? Math.min(Math.max(scrollY / 350, 0), 1) : 1;
  const isDarkNav = isHomePage && mergeRatio < 0.5;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-none"
      style={{
        backgroundColor: isHomePage 
          ? `rgba(248, 245, 239, ${mergeRatio * 0.78})`
          : 'rgba(248, 245, 239, 0.78)',
        backdropFilter: isHomePage && mergeRatio < 0.05 ? 'none' : `blur(${mergeRatio * 12}px)`,
        WebkitBackdropFilter: isHomePage && mergeRatio < 0.05 ? 'none' : `blur(${mergeRatio * 12}px)`,
        borderBottom: isHomePage && mergeRatio < 0.05 ? '1px solid transparent' : `1px solid rgba(228, 216, 200, ${mergeRatio * 0.6})`,
        boxShadow: mergeRatio > 0.3 ? '0 4px 20px 0 rgba(36, 28, 24, 0.03)' : 'none',
        paddingTop: `${Math.max(1.25 - mergeRatio * 0.4, 0.85)}rem`,
        paddingBottom: `${Math.max(1.25 - mergeRatio * 0.4, 0.85)}rem`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between nav-dropdown-container relative pointer-events-auto">
        {/* Left Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img 
            src="/sachin_ghongade_logo.jpg" 
            alt="Sachin Ghongade Photo Studio" 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#C5A059]/40 shadow-sm transition-transform group-hover:scale-105" 
          />
          <div className="flex flex-col">
            <span className={`font-serif text-base sm:text-lg font-bold tracking-[0.14em] uppercase transition-colors leading-tight drop-shadow-sm ${
              isDarkNav ? 'text-[#F8F5EF] group-hover:text-[#C5A059]' : 'text-[#241C18] group-hover:text-[#5E6B51]'
            }`}>
              SACHIN GHONGADE
            </span>
            <span className={`text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-semibold transition-colors ${
              isDarkNav ? 'text-[#C5A059]' : 'text-[#B86D56]'
            }`}>
              PHOTO STUDIO
            </span>
          </div>
        </NavLink>

        {/* Center Navigation Links with Submenus (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navItems.map((item) => {
            const isOpen = activeDropdown === item.name;
            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center gap-1">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative text-xs uppercase tracking-[0.2em] font-medium py-1.5 transition-colors duration-200 flex items-center gap-1 drop-shadow-sm ${
                        isActive
                          ? (isDarkNav ? 'text-[#C5A059] font-bold' : 'text-[#5E6B51] font-bold')
                          : (isDarkNav ? 'text-[#F8F5EF]/90 hover:text-[#C5A059]' : 'text-[#5D4B42] hover:text-[#241C18]')
                      }`
                    }
                    onFocus={() => handleMouseEnter(item.name)}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.name}</span>
                        {item.hasDropdown && (
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#C5A059]' : (isDarkNav ? 'text-[#F8F5EF]/70' : 'text-[#83736A]')
                            }`}
                          />
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                              isDarkNav ? 'bg-[#C5A059]' : 'bg-[#5E6B51]'
                            }`}
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </div>

                {/* Floating Dropdown Panel */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-60 rounded-2xl p-2 z-50 space-y-0.5 bg-[#F8F5EF]/95 backdrop-blur-xl border border-[#E4D8C8] shadow-2xl text-[#241C18]"
                      >
                        {item.dropdownItems.map((subItem) => {
                          const IconComp = subItem.icon;
                          return (
                            <button
                              key={subItem.label}
                              onClick={() => handleSubItemClick(subItem)}
                              className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 group text-[#241C18] hover:bg-[#8D9B7A]/15 hover:text-[#5E6B51]"
                            >
                              {IconComp && (
                                <IconComp className="w-3.5 h-3.5 text-[#83736A] group-hover:text-[#5E6B51] transition-colors" />
                              )}
                              <span>{subItem.label}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#C5A059] to-[#AA771C] text-[#241C18] shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
          >
            <span>Book a Shoot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`md:hidden p-2 transition-colors ${
              isDarkNav ? 'text-[#F8F5EF] hover:text-[#C5A059]' : 'text-[#241C18] hover:text-[#5E6B51]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Accordion Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[65px] z-40 bg-[#F8F5EF]/98 backdrop-blur-xl border-t border-[#E4D8C8] flex flex-col justify-between p-6 overflow-y-auto md:hidden"
          >
            <div className="flex flex-col gap-4 pt-2">
              {navItems.map((item) => {
                const isAccordionOpen = mobileAccordion === item.name;
                return (
                  <div key={item.name} className="border-b border-[#E4D8C8]/60 pb-3">
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `font-serif text-2xl tracking-wide transition-colors ${
                            isActive ? 'text-[#5E6B51] font-semibold italic' : 'text-[#241C18] font-light'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>

                      {item.hasDropdown && (
                        <button
                          onClick={() =>
                            setMobileAccordion(isAccordionOpen ? null : item.name)
                          }
                          className="p-2 text-[#83736A]"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              isAccordionOpen ? 'rotate-180 text-[#5E6B51]' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Sub-items */}
                    {item.hasDropdown && isAccordionOpen && (
                      <div className="pl-4 pt-3 space-y-2.5">
                        {item.dropdownItems.map((subItem) => (
                          <button
                            key={subItem.label}
                            onClick={() => handleSubItemClick(subItem)}
                            className="block w-full text-left text-xs uppercase tracking-wider text-[#5D4B42] hover:text-[#5E6B51] py-1"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 pt-6 border-t border-[#E4D8C8] mt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsEnquiryOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 text-xs uppercase font-semibold tracking-[0.2em] text-[#F8F5EF] bg-[#5E6B51] rounded-full shadow-md hover:bg-[#4B5640] transition-colors"
              >
                <span>Book a Shoot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-[#83736A] text-center tracking-widest uppercase font-mono">
                Sachin Ghongade Photo Studio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instant Enquiry Modal */}
      <QuickEnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </header>
  );
}
