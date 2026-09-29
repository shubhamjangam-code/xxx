import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Upload, 
  Check, 
  Image as ImageIcon, 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit3,
  Sparkles, 
  Layers, 
  ArrowRight,
  Info,
  Sliders,
  RotateCcw,
  MoveVertical,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Smartphone
} from 'lucide-react';
import { 
  getHomeSettings, 
  updateHomeSettings, 
  addHeroSlide, 
  deleteHeroSlide,
  updateHeroSlide,
  resetDefaultHeroSlides,
  DEFAULT_HERO_SLIDES 
} from '../../../services/dataService';

// Helper to parse 2D object position values
function parsePos(posStr) {
  if (!posStr) return { x: 50, y: 50 };
  const str = String(posStr).replace('object-[', '').replace(']', '').replace(/_/g, ' ');
  const parts = str.split(' ');
  let x = 50;
  let y = 50;
  
  if (parts.length >= 2) {
    if (parts[0].includes('%')) x = parseInt(parts[0], 10);
    else if (parts[0] === 'left') x = 0;
    else if (parts[0] === 'right') x = 100;
    else if (parts[0] === 'center') x = 50;

    if (parts[1].includes('%')) y = parseInt(parts[1], 10);
    else if (parts[1] === 'top') y = 0;
    else if (parts[1] === 'bottom') y = 100;
    else if (parts[1] === 'center') y = 50;
  } else if (parts.length === 1 && parts[0].includes('%')) {
    y = parseInt(parts[0], 10);
  }
  return { x: isNaN(x) ? 50 : x, y: isNaN(y) ? 50 : y };
}

// Smartphone Wallpaper-Style Photo Framing & Zoom Component
function WallpaperStylePhotoAdjuster({ imageSrc, objectPos, scale = 1.0, fitMode = 'cover', onChangePos, onChangeScale, onChangeFitMode }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startPosRef = useRef({ x: 50, y: 50 });
  const touchDistRef = useRef(null);

  const { x: currentX, y: currentY } = parsePos(objectPos);
  const currentScale = scale || 1.0;

  // Touch 2-finger distance calculator
  const getTouchDistance = (e) => {
    if (e.touches && e.touches.length >= 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      return Math.hypot(dx, dy);
    }
    return null;
  };

  const handlePointerDown = (e) => {
    if (e.touches && e.touches.length >= 2) {
      touchDistRef.current = getTouchDistance(e);
      return;
    }
    setIsDragging(true);
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    startXRef.current = clientX;
    startYRef.current = clientY;
    startPosRef.current = { x: currentX, y: currentY };
  };

  const handlePointerMove = useCallback((e) => {
    // 2-finger Pinch Zoom check
    if (e.touches && e.touches.length >= 2) {
      const dist = getTouchDistance(e);
      if (dist && touchDistRef.current) {
        const delta = (dist - touchDistRef.current) * 0.008;
        let newScale = Math.round((currentScale + delta) * 100) / 100;
        newScale = Math.max(1.0, Math.min(3.0, newScale));
        onChangeScale(newScale);
        touchDistRef.current = dist;
      }
      return;
    }

    if (!isDragging || !containerRef.current) return;
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const rect = containerRef.current.getBoundingClientRect();
    
    // Pan calculation
    const deltaX = clientX - startXRef.current;
    const deltaY = clientY - startYRef.current;
    
    const sensitivity = 90 / (currentScale || 1.0);
    const pctChangeX = (deltaX / rect.width) * sensitivity;
    const pctChangeY = (deltaY / rect.height) * sensitivity;

    let newX = Math.round(startPosRef.current.x - pctChangeX);
    let newY = Math.round(startPosRef.current.y - pctChangeY);

    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));
    
    onChangePos(`${newX}% ${newY}%`);
  }, [isDragging, currentScale, onChangePos, onChangeScale]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    touchDistRef.current = null;
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08;
    let newScale = Math.round((currentScale + zoomDelta) * 100) / 100;
    newScale = Math.max(1.0, Math.min(3.0, newScale));
    onChangeScale(newScale);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    } else {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <div className="space-y-4">
      {/* Fit Mode Selector Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-[#F8F5EF] rounded-xl border border-[#241C18]/10">
        <span className="text-xs font-semibold text-[#241C18] flex items-center gap-1.5 pl-1">
          <Maximize2 className="w-3.5 h-3.5 text-[#8D9B7A]" />
          <span>Display Fit Mode:</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChangeFitMode && onChangeFitMode('cover')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              fitMode === 'cover' 
                ? 'bg-[#8D9B7A] text-white shadow-sm' 
                : 'bg-white text-[#241C18] hover:bg-gray-100 border border-[#241C18]/10'
            }`}
          >
            Full Cover
          </button>
          <button
            type="button"
            onClick={() => onChangeFitMode && onChangeFitMode('contain')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              fitMode === 'contain' 
                ? 'bg-[#8D9B7A] text-white shadow-sm' 
                : 'bg-white text-[#241C18] hover:bg-gray-100 border border-[#241C18]/10'
            }`}
          >
            Smart Fit (0% Crop)
          </button>
        </div>
      </div>

      {/* Title & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold text-[#241C18]">
        <span className="flex items-center gap-1.5 text-[#8D9B7A]">
          <Smartphone className="w-4 h-4" />
          <span>Photo Framing & Adjustments</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[#8D9B7A] font-bold font-mono text-[11px] bg-[#8D9B7A]/15 px-2.5 py-0.5 rounded-full">
            Pan: X {currentX}% | Y {currentY}%
          </span>
          <span className="text-amber-800 font-bold font-mono text-[11px] bg-amber-100 px-2.5 py-0.5 rounded-full">
            Zoom: {Math.round(currentScale * 100)}%
          </span>
        </div>
      </div>

      {/* Smartphone Wallpaper Viewport Canvas */}
      <div 
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onWheel={handleWheel}
        className={`relative h-64 w-full rounded-2xl overflow-hidden border-2 transition-all select-none shadow-xl flex items-center justify-center ${
          isDragging 
            ? 'border-[#8D9B7A] cursor-grabbing ring-4 ring-[#8D9B7A]/30' 
            : 'border-[#8D9B7A]/60 hover:border-[#8D9B7A] cursor-grab bg-black/90'
        }`}
      >
        {/* Ambient Blurred Background Layer */}
        <img 
          src={imageSrc} 
          alt="" 
          aria-hidden="true" 
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-35" 
        />

        {/* Main Foreground Image */}
        <img 
          src={imageSrc} 
          alt="Wallpaper Style Preview" 
          style={{ 
            objectPosition: `${currentX}% ${currentY}%`,
            transform: `scale(${currentScale})` 
          }}
          className={`relative z-10 w-full h-full pointer-events-none transition-transform duration-75 ${
            fitMode === 'contain' ? 'object-contain max-h-full' : 'object-cover'
          }`} 
        />

        {/* Viewport Frame Guidelines Overlay */}
        <div className="absolute inset-0 z-20 border-[3px] border-white/20 rounded-2xl pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 z-20 border-t border-dashed border-white/30 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 z-20 border-l border-dashed border-white/30 pointer-events-none" />

        {/* Phone Gesture Instructional Badge */}
        <div className="absolute top-3 left-3 z-20 px-3 py-1.5 bg-black/80 text-white text-[11px] font-semibold rounded-xl backdrop-blur-md flex items-center gap-2 shadow-lg pointer-events-none border border-white/10">
          <span>
            {isDragging 
              ? 'Adjusting photo position...' 
              : 'Drag photo to position • Scroll or Pinch to Zoom'}
          </span>
        </div>

        {/* Quick Reset Floating Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChangeScale(1.0);
            onChangePos('50% 50%');
            if (onChangeFitMode) onChangeFitMode('cover');
          }}
          className="absolute bottom-3 right-3 z-20 px-3 py-1 bg-white/90 hover:bg-white text-[#241C18] font-semibold text-[11px] rounded-lg shadow-md backdrop-blur-md transition-all cursor-pointer flex items-center gap-1"
        >
          <span>Reset Fit</span>
        </button>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-3.5 bg-[#F8F5EF] rounded-xl border border-[#241C18]/10 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[#241C18]">
          <span className="flex items-center gap-1.5 text-[#8D9B7A]">
            <ZoomIn className="w-4 h-4" />
            <span>Pinch & Scroll Zoom Controller</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChangeScale(Math.max(1.0, Math.round((currentScale - 0.1) * 10) / 10))}
              className="px-3 py-1 bg-white hover:bg-gray-100 text-[#241C18] border border-[#241C18]/15 rounded-lg text-xs font-bold cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <ZoomOut className="w-3.5 h-3.5 text-[#8D9B7A]" />
              <span>Zoom Out</span>
            </button>
            <span className="text-xs font-mono font-bold px-2 text-[#8D9B7A]">{Math.round(currentScale * 100)}%</span>
            <button
              type="button"
              onClick={() => onChangeScale(Math.min(3.0, Math.round((currentScale + 0.1) * 10) / 10))}
              className="px-3 py-1 bg-white hover:bg-gray-100 text-[#241C18] border border-[#241C18]/15 rounded-lg text-xs font-bold cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#8D9B7A]" />
              <span>Zoom In</span>
            </button>
          </div>
        </div>

        {/* Zoom Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-[#241C18]/60">100% (Fit)</span>
          <input
            type="range"
            min="1.0"
            max="3.0"
            step="0.05"
            value={currentScale}
            onChange={(e) => onChangeScale(parseFloat(e.target.value))}
            className="w-full accent-[#8D9B7A] cursor-pointer"
          />
          <span className="text-[11px] font-medium text-[#241C18]/60">300% (Max)</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminHome({ onNavigateTab }) {
  const [settings, setSettings] = useState({
    heroTitle: 'Capturing Real Emotions.',
    heroSubtitle: 'Candid & Fine Art Wedding Photography',
    heroImage: '',
    heroSlides: DEFAULT_HERO_SLIDES
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Add Slide Modal States
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideTag, setNewSlideTag] = useState('Wedding Ceremonies');
  const [newSlideLocation, setNewSlideLocation] = useState('Maharashtra');
  const [newSlideObjectPos, setNewSlideObjectPos] = useState('50% 50%');
  const [newSlideScale, setNewSlideScale] = useState(1.0);
  const [newSlideFitMode, setNewSlideFitMode] = useState('cover');
  const [newSlideFile, setNewSlideFile] = useState(null);
  const [newSlidePreview, setNewSlidePreview] = useState('');
  const [uploadingSlide, setUploadingSlide] = useState(false);

  // Edit Slide Modal States
  const [editingSlide, setEditingSlide] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTag, setEditTag] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editObjectPos, setEditObjectPos] = useState('50% 50%');
  const [editScale, setEditScale] = useState(1.0);
  const [editFitMode, setEditFitMode] = useState('cover');
  const [editImageFile, setEditImageFile] = useState(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState('');
  const [savingSlideEdit, setSavingSlideEdit] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    try {
      const data = await getHomeSettings();
      if (data) {
        setSettings({
          heroTitle: data.heroTitle || 'Capturing Real Emotions.',
          heroSubtitle: data.heroSubtitle || 'Candid & Fine Art Wedding Photography',
          heroImage: data.heroImage || '',
          heroSlides: (data.heroSlides && data.heroSlides.length > 0) ? data.heroSlides : DEFAULT_HERO_SLIDES
        });
      }
    } catch (err) {
      console.error("Error loading home settings:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveTagline(e) {
    e.preventDefault();
    setSaving(true);
    setStatusMsg('');

    try {
      const updated = await updateHomeSettings({
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        heroSlides: settings.heroSlides
      });
      setSettings(prev => ({ ...prev, ...updated }));
      setStatusMsg('✅ Home page titles & text saved successfully!');
    } catch (err) {
      console.error(err);
      setStatusMsg('❌ Error saving home page settings.');
    } finally {
      setSaving(false);
    }
  }

  function handleSlideFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setNewSlideFile(file);
      setNewSlidePreview(URL.createObjectURL(file));
    }
  }

  function handleEditFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      setEditPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleAddSlideSubmit(e) {
    e.preventDefault();
    if (!newSlideFile) {
      alert("Please select a photo file to upload.");
      return;
    }

    setUploadingSlide(true);
    try {
      const updatedSlides = await addHeroSlide(
        newSlideTitle || "Hero Background Photo", 
        newSlideFile, 
        newSlideObjectPos, 
        newSlideScale,
        newSlideFitMode
      );
      setSettings(prev => ({ ...prev, heroSlides: updatedSlides }));
      setStatusMsg('🎉 New background photo added to Home Hero slideshow!');
      setNewSlideTitle('');
      setNewSlideFile(null);
      setNewSlidePreview('');
      setNewSlideObjectPos('50% 50%');
      setNewSlideScale(1.0);
      setNewSlideFitMode('cover');
      setShowAddSlideModal(false);
    } catch (err) {
      console.error("Error uploading slide:", err);
      alert("Failed to upload background photo. Please try again.");
    } finally {
      setUploadingSlide(false);
    }
  }

  function handleOpenEditSlide(slide) {
    setEditingSlide(slide);
    setEditTitle(slide.title || '');
    setEditTag(slide.tag || 'Hero Slide');
    setEditLocation(slide.location || 'Sachin Ghongade Photo Studio');
    
    // Normalize objectPos, scale & fitMode
    let rawPos = slide.objectPos || slide.objectPosition || '50% 50%';
    rawPos = rawPos.replace('object-[', '').replace(']', '').replace(/_/g, ' ');
    setEditObjectPos(rawPos);
    setEditScale(slide.scale || slide.zoom || 1.0);
    setEditFitMode(slide.fitMode || 'cover');

    setEditPreviewUrl(slide.image || '');
    setEditImageFile(null);
  }

  async function handleSaveEditSlide(e) {
    e.preventDefault();
    if (!editingSlide) return;

    setSavingSlideEdit(true);
    try {
      const updatedSlides = await updateHeroSlide(
        editingSlide.id,
        {
          title: editTitle,
          tag: editTag,
          location: editLocation,
          objectPos: editObjectPos,
          scale: editScale,
          fitMode: editFitMode,
          image: editPreviewUrl
        },
        editImageFile
      );
      setSettings(prev => ({ ...prev, heroSlides: updatedSlides }));
      setStatusMsg(`✅ Hero slide framing & zoom updated successfully!`);
      setEditingSlide(null);
    } catch (err) {
      console.error("Error editing hero slide:", err);
      alert("Failed to update slide. Please try again.");
    } finally {
      setSavingSlideEdit(false);
    }
  }

  async function handleDeleteSlide(slideId, title) {
    if (!window.confirm(`Are you sure you want to delete slide "${title || 'this photo'}" from the home background slideshow?`)) {
      return;
    }

    try {
      const updatedSlides = await deleteHeroSlide(slideId);
      setSettings(prev => ({ ...prev, heroSlides: updatedSlides }));
      setStatusMsg('🗑️ Photo deleted from Home Hero slideshow.');
    } catch (err) {
      console.error("Error deleting slide:", err);
      alert("Error deleting slide.");
    }
  }

  async function handleResetSlides() {
    if (!window.confirm("Restore default studio slides? Custom added slides will be reset.")) return;
    try {
      const resetted = await resetDefaultHeroSlides();
      setSettings(prev => ({ ...prev, heroSlides: resetted }));
      setStatusMsg("🔄 Default hero background slides restored.");
    } catch (err) {
      console.error(err);
      alert("Error resetting slides.");
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-3 border-[#8D9B7A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#241C18]/60 font-medium">Loading Home Page & Slideshow Settings...</p>
      </div>
    );
  }

  const slidesCount = settings.heroSlides?.length || 0;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#241C18]/10 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-[#241C18]">Home Page & Background Slideshow Manager</h2>
            <span className="px-2.5 py-0.5 bg-[#8D9B7A]/15 text-[#8D9B7A] text-[10px] font-semibold uppercase tracking-wider rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Live Slideshow
            </span>
          </div>
          <p className="text-xs text-[#241C18]/60 mt-1">
            Manage main hero titles, background photos, framing, zoom, and display fit options.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetSlides}
            className="p-2.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer text-xs font-medium flex items-center gap-1.5"
            title="Reset to default slides"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={loadSettings}
            className="p-2.5 rounded-xl border border-[#241C18]/15 hover:bg-[#F8F5EF] text-[#241C18] transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-2 text-xs font-medium"
            title="Reload Home Settings"
          >
            <RefreshCw className="w-4 h-4 text-[#8D9B7A]" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl text-xs font-medium flex items-center gap-2 bg-green-50 text-green-700 border border-green-200">
          <Check className="w-4 h-4 flex-shrink-0 text-green-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* ================= SECTION 1: HERO BACKGROUND SLIDESHOW MANAGER ================= */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#241C18]/10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#241C18]/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8D9B7A]" />
              <h3 className="font-serif text-lg text-[#241C18] font-bold">
                1. Background Slideshow Photos ({slidesCount} Active)
              </h3>
            </div>
            <p className="text-xs text-[#241C18]/60 mt-1">
              Select any photo below to customize framing, pan, zoom, or fit mode.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddSlideModal(true)}
            className="px-4 py-2.5 bg-[#8D9B7A] hover:bg-[#7A8868] text-white rounded-xl text-xs font-medium flex items-center gap-2 shadow-md shadow-[#8D9B7A]/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Background Photo</span>
          </button>
        </div>

        {/* Counter Badge */}
        <div className="p-3.5 bg-[#F8F5EF] rounded-xl border border-[#241C18]/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#241C18]">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-semibold">Current Active Slideshow:</span>
            <span className="text-[#8D9B7A] font-bold">{slidesCount} Photos in Rotation</span>
          </div>
          <span className="text-[11px] text-[#241C18]/60">Auto-slides every 5.5s</span>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {settings.heroSlides?.map((slide, index) => {
            const rawPos = slide.objectPos || slide.objectPosition || '50% 20%';
            const normalizedPos = rawPos.replace('object-[', '').replace(']', '').replace(/_/g, ' ');
            const slideScale = slide.scale || slide.zoom || 1.0;
            const { x, y } = parsePos(normalizedPos);

            return (
              <div 
                key={slide.id || index}
                className="group relative bg-[#F8F5EF] rounded-xl border border-[#241C18]/15 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                {/* Photo Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-black/10">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    style={{ 
                      objectPosition: normalizedPos,
                      transform: `scale(${slideScale})` 
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md">
                    Slide #{index + 1}
                  </span>

                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 text-white text-[9px] font-semibold rounded-md backdrop-blur-md flex items-center gap-1.5">
                    <span>Pos: X{x}% Y{y}%</span>
                    <span>•</span>
                    <span className="text-amber-300">Zoom: {Math.round(slideScale * 100)}%</span>
                  </div>
                </div>

                {/* Slide Info & Action Controls */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#241C18] truncate">{slide.title || 'Studio Showcase'}</h4>
                    <div className="flex items-center justify-between text-[11px] mt-1 text-[#8D9B7A]">
                      <span className="font-semibold">{slide.tag || 'Hero Slide'}</span>
                      <span className="text-[#241C18]/50 truncate max-w-[120px]">{slide.location || 'Maharashtra'}</span>
                    </div>
                  </div>

                  {/* Edit & Delete Actions */}
                  <div className="pt-3 border-t border-[#241C18]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditSlide(slide)}
                      className="flex-1 py-1.5 px-3 bg-white hover:bg-[#8D9B7A] hover:text-white text-[#241C18] rounded-lg border border-[#241C18]/15 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit, Drag & Zoom</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(slide.id, slide.title)}
                      className="py-1.5 px-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center"
                      title="Delete slide from home hero"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= SECTION 2: HERO TITLE & TAGLINE ================= */}
      <form onSubmit={handleSaveTagline} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#241C18]/10 shadow-sm space-y-6">
        <div className="border-b border-[#241C18]/10 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#8D9B7A]" />
            <h3 className="font-serif text-lg text-[#241C18] font-bold">2. Hero Tagline & Subtitle Settings</h3>
          </div>
          <p className="text-xs text-[#241C18]/60 mt-1">
            This headline appears over the hero slideshow on the homepage in stylized typography.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Title Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241C18]/80 mb-2">
                Main Headline Title
              </label>
              <input
                type="text"
                required
                value={settings.heroTitle}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                placeholder="e.g. Capturing Real Emotions."
                className="w-full px-4 py-3 border border-[#241C18]/15 rounded-xl text-sm font-serif text-[#241C18] focus:ring-2 focus:ring-[#8D9B7A] focus:outline-none bg-[#F8F5EF]/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#241C18]/80 mb-2">
                Hero Subtitle
              </label>
              <input
                type="text"
                required
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                placeholder="e.g. Candid & Fine Art Wedding Photography"
                className="w-full px-4 py-3 border border-[#241C18]/15 rounded-xl text-sm text-[#241C18] focus:ring-2 focus:ring-[#8D9B7A] focus:outline-none bg-[#F8F5EF]/40"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-[#8D9B7A] hover:bg-[#7A8868] text-white font-medium rounded-xl text-xs uppercase tracking-wider shadow-md shadow-[#8D9B7A]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Tagline & Title</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Styling Preview Box */}
          <div className="p-5 bg-[#140E0C] text-[#F8F5EF] rounded-xl border border-[#241C18]/20 flex flex-col justify-center relative overflow-hidden shadow-inner">
            <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest text-[#8D9B7A] font-semibold bg-white/10 px-2 py-0.5 rounded backdrop-blur-md">
              Live Website Preview
            </span>
            <div className="space-y-3 pt-4">
              <span className="text-[10px] uppercase tracking-widest text-[#8D9B7A] font-bold">
                {settings.heroSubtitle || "Candid & Fine Art Photography"}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#F8F5EF] leading-snug">
                Capturing <br />
                <span className="italic font-normal text-amber-400 font-serif">
                  {settings.heroTitle.replace("Capturing ", "") || "Real Emotions."}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </form>

      {/* ================= SECTION 3: WEBSITE SECTIONS DIRECTORY GUIDE ================= */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#241C18]/10 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-[#241C18]/10 pb-4">
          <Info className="w-5 h-5 text-[#8D9B7A]" />
          <div>
            <h3 className="font-serif text-lg text-[#241C18] font-bold">
              3. Quick Gallery Shortcuts
            </h3>
            <p className="text-xs text-[#241C18]/60 mt-0.5">
              Manage photo collections across different shoot categories:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#241C18]/10 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#241C18]">Weddings Gallery</h4>
              <p className="text-xs text-[#241C18]/60 mt-1">Manage wedding ceremony photos in portfolio gallery.</p>
            </div>
            <button
              onClick={() => onNavigateTab && onNavigateTab('portfolio')}
              className="w-full py-2 px-3 bg-white hover:bg-[#8D9B7A] hover:text-white text-[#241C18] text-xs font-semibold rounded-lg border border-[#241C18]/15 transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Manage Portfolio Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#241C18]/10 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#241C18]">Pre-Wedding Shoots</h4>
              <p className="text-xs text-[#241C18]/60 mt-1">Manage pre-wedding session photos and couple stories.</p>
            </div>
            <button
              onClick={() => onNavigateTab && onNavigateTab('portfolio')}
              className="w-full py-2 px-3 bg-white hover:bg-[#8D9B7A] hover:text-white text-[#241C18] text-xs font-semibold rounded-lg border border-[#241C18]/15 transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Manage Pre-Wedding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#241C18]/10 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#241C18]">Events & Festivals</h4>
              <p className="text-xs text-[#241C18]/60 mt-1">Manage event and celebration shoot photos.</p>
            </div>
            <button
              onClick={() => onNavigateTab && onNavigateTab('portfolio')}
              className="w-full py-2 px-3 bg-white hover:bg-[#8D9B7A] hover:text-white text-[#241C18] text-xs font-semibold rounded-lg border border-[#241C18]/15 transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Manage Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= ADD SLIDE MODAL ================= */}
      {showAddSlideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#241C18]/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#241C18]/10 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241C18]">Upload New Background Photo</h3>
                <p className="text-xs text-[#241C18]/60">Add a new photo to the Home Page Hero slideshow</p>
              </div>
              <button 
                onClick={() => setShowAddSlideModal(false)} 
                className="p-2 text-[#241C18]/50 hover:text-[#241C18] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSlideSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                  Photo Title / Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Pre-Wedding Shoot"
                  value={newSlideTitle}
                  onChange={(e) => setNewSlideTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                  Select Image File
                </label>
                <div className="relative border-2 border-dashed border-[#241C18]/20 rounded-xl p-6 text-center hover:bg-[#F8F5EF] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleSlideFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {newSlidePreview ? (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-green-700 block">Photo Selected ✓</span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-[#8D9B7A] mx-auto mb-2" />
                      <span className="text-xs font-semibold text-[#8D9B7A]">Click to select photo from device</span>
                      <p className="text-[10px] text-[#241C18]/50 mt-1">JPG, PNG or WEBP landscape photo</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Wallpaper Style Interactive Photo Adjuster */}
              {newSlidePreview && (
                <WallpaperStylePhotoAdjuster
                  imageSrc={newSlidePreview}
                  objectPos={newSlideObjectPos}
                  scale={newSlideScale}
                  fitMode={newSlideFitMode}
                  onChangePos={(pos) => setNewSlideObjectPos(pos)}
                  onChangeScale={(s) => setNewSlideScale(s)}
                  onChangeFitMode={(fm) => setNewSlideFitMode(fm)}
                />
              )}

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddSlideModal(false)}
                  className="w-1/2 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingSlide}
                  className="w-1/2 py-2.5 bg-[#8D9B7A] hover:bg-[#7A8868] text-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {uploadingSlide ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>Add to Slideshow</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT SLIDE MODAL WITH WALLPAPER STYLE DRAG & PINCH ================= */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-[#241C18]/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#241C18]/10 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241C18]">Edit Hero Slide</h3>
                <p className="text-xs text-[#241C18]/60 font-medium">Adjust framing, position, zoom, and display fit mode</p>
              </div>
              <button 
                onClick={() => setEditingSlide(null)} 
                className="p-2 text-[#241C18]/50 hover:text-[#241C18] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditSlide} className="space-y-4">
              {/* Wallpaper Style Interactive Adjuster */}
              <WallpaperStylePhotoAdjuster
                imageSrc={editPreviewUrl}
                objectPos={editObjectPos}
                scale={editScale}
                fitMode={editFitMode}
                onChangePos={(pos) => setEditObjectPos(pos)}
                onChangeScale={(s) => setEditScale(s)}
                onChangeFitMode={(fm) => setEditFitMode(fm)}
              />

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                  Photo Title / Headline
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
                />
              </div>

              {/* Tag & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                    Tag / Category
                  </label>
                  <input
                    type="text"
                    value={editTag}
                    onChange={(e) => setEditTag(e.target.value)}
                    placeholder="e.g. Wedding Ceremonies"
                    className="w-full px-3 py-2 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="e.g. Karad, Maharashtra"
                    className="w-full px-3 py-2 border border-[#241C18]/15 rounded-xl text-xs focus:ring-2 focus:ring-[#8D9B7A]"
                  />
                </div>
              </div>

              {/* Replace Photo File */}
              <div>
                <label className="block text-xs font-semibold text-[#241C18]/80 mb-1">
                  Replace Image File (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditFileChange}
                  className="w-full text-xs text-[#241C18]/70 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#8D9B7A]/15 file:text-[#8D9B7A] hover:file:bg-[#8D9B7A]/25 cursor-pointer"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="w-1/2 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingSlideEdit}
                  className="w-1/2 py-2.5 bg-[#8D9B7A] hover:bg-[#7A8868] text-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {savingSlideEdit ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Slide Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
