import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Plus,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  X,
  Play,
  Pause,
  Filter
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

// Real uploaded family and daughter photos with heartfelt maternal captions
export const FAMILY_MEMORIES = [
  {
    id: 'photo-1',
    url: './photos/childhood-smile-2012.jpg',
    caption: 'My precious little girl ❤️',
    subnote: 'That sweetest toddler smile (2012) that stole my heart forever',
    category: 'childhood',
    rotation: -2.5,
  },
  {
    id: 'photo-2',
    url: './photos/mountain-with-mom.jpg',
    caption: 'Forever safe in my arms, my sweetheart',
    subnote: 'Mom & daughter atop the world, with blue skies & endless love',
    category: 'mom',
    rotation: 2,
  },
  {
    id: 'photo-3',
    url: './photos/holding-flower.jpg',
    caption: 'You make my world brighter',
    subnote: 'More vibrant and radiant than any flower in bloom 🌸',
    category: 'portraits',
    rotation: -1.5,
  },
  {
    id: 'photo-4',
    url: './photos/childhood-siblings-2013.jpg',
    caption: "A memory I'll cherish forever",
    subnote: 'You with your white flower headband & big brother (2013)',
    category: 'childhood',
    rotation: 3,
  },
  {
    id: 'photo-5',
    url: './photos/puppy-cuddle.jpg',
    caption: 'Pure warmth in your gentle soul',
    subnote: 'Cuddling your sweet puppy with that unforgettable dimpled smile 🐾',
    category: 'portraits',
    rotation: -2,
  },
  {
    id: 'photo-6',
    url: './photos/waterfall-adventure.jpg',
    caption: 'Wild, free, and full of joy',
    subnote: 'Sparkling mountain waters and your pure, carefree spirit',
    category: 'adventures',
    rotation: 1.8,
  },
  {
    id: 'photo-7',
    url: './photos/family-mountains.jpg',
    caption: 'Our pride, our happiness, our everything',
    subnote: 'Family standing strong together across every mountain peak',
    category: 'family',
    rotation: -2.2,
  },
  {
    id: 'photo-8',
    url: './photos/traditional-saree.jpg',
    caption: 'My little princess, all grown up',
    subnote: 'Breathtaking in traditional elegance and grace',
    category: 'portraits',
    rotation: 2.5,
  },
  {
    id: 'photo-9',
    url: './photos/family-kerala.jpg',
    caption: 'The heart and soul of our home',
    subnote: 'Surrounded by family warmth, greenery, and unconditional love',
    category: 'family',
    rotation: -1.8,
  },
  {
    id: 'photo-10',
    url: './photos/siblings-bond.jpg',
    caption: 'Two peas in a pod, always protecting each other',
    subnote: 'Brother and sister bond that distance and time can never shake',
    category: 'family',
    rotation: 2.2,
  },
  {
    id: 'photo-11',
    url: './photos/celebration-gown.jpg',
    caption: 'Royalty in grace and beauty',
    subnote: 'Our true princess shining brightly on her special throne 👑',
    category: 'portraits',
    rotation: -2.8,
  },
  {
    id: 'photo-12',
    url: './photos/cliff-pathway.jpg',
    caption: 'May you always walk ahead with strength & hope',
    subnote: 'Walking through life with quiet poise and fearless dreams',
    category: 'adventures',
    rotation: 1.5,
  },
  {
    id: 'photo-13',
    url: './photos/mural-smile.jpg',
    caption: 'Your smile lights up the whole room',
    subnote: 'Whimsical wonder, laughter, and that radiant glow',
    category: 'portraits',
    rotation: -2,
  },
  {
    id: 'photo-14',
    url: './photos/hills-polaroid.jpg',
    caption: 'Reaching for the skies with no limits',
    subnote: 'Hills beneath your feet, endless horizons in your eyes',
    category: 'adventures',
    rotation: 2.8,
  },
];

const STORAGE_KEY = 'princess_birthday_photos_real_v2';

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState('scrapbook'); // 'scrapbook' | 'slideshow'
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Initialize photos: either from localStorage or with the 14 real uploaded photos
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotos(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to load photos from storage', e);
    }
    setPhotos(FAMILY_MEMORIES);
  }, []);

  // Save to LocalStorage
  const savePhotos = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPhotos));
    } catch (e) {
      console.warn('Storage quota issue or error', e);
    }
  };

  // Upload new photo
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    soundEngine.playSparkle();

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          const newPhoto = {
            id: 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            url: compressedDataUrl,
            caption: 'A memory I will treasure forever ❤️',
            subnote: 'Added with motherly love',
            category: 'all',
            rotation: (Math.random() * 5 - 2.5).toFixed(1),
            isUserUploaded: true,
          };

          setPhotos((prev) => {
            const nextList = [newPhoto, ...prev];
            savePhotos(nextList);
            return nextList;
          });
        };
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Delete photo
  const handleDeletePhoto = (id, e) => {
    e.stopPropagation();
    soundEngine.playSparkle();
    const updated = photos.filter((p) => p.id !== id);
    if (updated.length === 0) {
      savePhotos(FAMILY_MEMORIES);
    } else {
      savePhotos(updated);
    }
    if (currentIndex >= updated.length) {
      setCurrentIndex(Math.max(0, updated.length - 1));
    }
  };

  // Save edited caption
  const handleSaveCaption = (id, newCaption, newSubnote) => {
    const updated = photos.map((p) =>
      p.id === id ? { ...p, caption: newCaption, subnote: newSubnote } : p
    );
    savePhotos(updated);
    setEditingPhoto(null);
  };

  // Reset to original 14 real memories
  const handleResetDefaults = () => {
    soundEngine.playSparkle();
    savePhotos(FAMILY_MEMORIES);
  };

  // Filtered photos
  const filteredPhotos = filterCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === filterCategory);

  // Slideshow timer
  useEffect(() => {
    if (activeTab !== 'slideshow' || !isPlaying || filteredPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeTab, isPlaying, filteredPhotos.length]);

  const nextSlide = () => {
    soundEngine.playSparkle();
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevSlide = () => {
    soundEngine.playSparkle();
    setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="relative w-full py-20 px-4 flex flex-col items-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-rosegold-700 text-xs font-semibold tracking-widest uppercase shadow-sm"
      >
        <Camera className="w-3.5 h-3.5 text-pink-500" />
        <span>Precious Memory Album • 14 Cherished Moments</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold text-rosegold-700 mb-2"
      >
        Treasured Memories of My Princess
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-cursive text-2xl sm:text-3xl text-pink-600 text-center mb-8 max-w-xl"
      >
        From your tiny childhood giggles to the gorgeous, graceful woman you are today
      </motion.p>

      {/* FILTER CATEGORY PILLS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 z-10 max-w-2xl">
        {[
          { key: 'all', label: 'All 14 Memories ✨' },
          { key: 'childhood', label: 'Little Toddler Days (2012–2013) 👶' },
          { key: 'mom', label: 'With Mom ❤️' },
          { key: 'family', label: 'Family & Siblings 🏡' },
          { key: 'adventures', label: 'Adventures & Mountains 🏔️' },
          { key: 'portraits', label: 'Our Princess 👑' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              soundEngine.playSparkle();
              setFilterCategory(tab.key);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              filterCategory === tab.key
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white/80 text-rosegold-700 hover:bg-pink-100/60 border border-pink-200/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTION CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12 z-10">
        {/* Toggle View: Scrapbook vs Slideshow */}
        <div className="flex rounded-full bg-white/90 p-1 border border-pink-200 shadow-sm">
          <button
            onClick={() => setActiveTab('scrapbook')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'scrapbook'
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm'
                : 'text-rosegold-700 hover:text-pink-600'
            }`}
          >
            Polaroid Scrapbook 📸
          </button>
          <button
            onClick={() => setActiveTab('slideshow')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'slideshow'
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm'
                : 'text-rosegold-700 hover:text-pink-600'
            }`}
          >
            Story Slideshow Movie 🎞️
          </button>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span>Add More Memories</span>
        </button>

        {/* Reset button */}
        <button
          onClick={handleResetDefaults}
          className="px-3.5 py-2 rounded-full bg-white/80 text-rosegold-600 hover:text-rose-600 text-xs font-medium border border-pink-200 hover:bg-pink-50 transition shadow-sm cursor-pointer"
          title="Restore original 14 photos"
        >
          Reset Photos
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* VIEW 1: POLAROID SCRAPBOOK WALL */}
      {activeTab === 'scrapbook' && (
        <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 justify-items-center">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
              style={{ transform: `rotate(${photo.rotation || 0}deg)` }}
              onClick={() => setLightboxPhoto(photo)}
              className="relative w-68 sm:w-72 bg-[#ffffff] p-3.5 pb-6 rounded-md polaroid-shadow border border-pink-100 cursor-pointer group transition-all duration-300 flex flex-col justify-between"
            >
              {/* Decorative Washi Tape & Stamp on Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 washi-tape -rotate-1 rounded-sm shadow-inner pointer-events-none z-10 flex items-center justify-center text-[10px] text-pink-900/60 font-cursive font-bold tracking-widest">
                MEMORIES WITH LOVE
              </div>

              {/* Photo Image Frame with Soft Drop Shadow */}
              <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden bg-pink-50 border border-pink-100/80 flex items-center justify-center">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Subtle Glow Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Hover Actions: Edit Caption & Delete */}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingPhoto(photo);
                    }}
                    className="p-1.5 rounded-full bg-white/95 text-rosegold-700 hover:text-pink-600 shadow-md cursor-pointer hover:scale-110 transition"
                    title="Edit Caption"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeletePhoto(photo.id, e)}
                    className="p-1.5 rounded-full bg-white/95 text-rose-500 hover:text-red-700 shadow-md cursor-pointer hover:scale-110 transition"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="mt-4 px-1 text-center">
                <h4 className="font-handwriting text-2xl sm:text-3xl text-rose-800 leading-tight font-bold drop-shadow-sm">
                  {photo.caption}
                </h4>
                {photo.subnote && (
                  <p className="font-sans text-xs text-rosegold-500 mt-1 leading-snug">
                    {photo.subnote}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* VIEW 2: CINEMATIC STORY SLIDESHOW */}
      {activeTab === 'slideshow' && filteredPhotos.length > 0 && (
        <div className="relative max-w-3xl w-full flex flex-col items-center">
          {/* Main Slide Card */}
          <div className="relative w-full max-w-xl aspect-[3/4] sm:aspect-[4/5] bg-white p-5 sm:p-7 pb-14 rounded-2xl polaroid-shadow border-2 border-pink-100 flex flex-col items-center justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredPhotos[currentIndex]?.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.65 }}
                className="w-full h-[78%] rounded-xl overflow-hidden relative shadow-inner bg-pink-50"
              >
                <img
                  src={filteredPhotos[currentIndex]?.url}
                  alt={filteredPhotos[currentIndex]?.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Heart Sticker on Image */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-semibold text-rose-600 flex items-center gap-1 shadow-md">
                  <Heart className="w-3 h-3 fill-rose-500" />
                  <span>Mom's Memory #{currentIndex + 1}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={'cap-' + filteredPhotos[currentIndex]?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="w-full text-center mt-3"
              >
                <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold leading-tight">
                  {filteredPhotos[currentIndex]?.caption}
                </h3>
                {filteredPhotos[currentIndex]?.subnote && (
                  <p className="font-serif text-sm text-rosegold-600 mt-1 italic">
                    "{filteredPhotos[currentIndex]?.subnote}"
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-rosegold-700 hover:text-pink-600 shadow-lg hover:scale-110 transition-all cursor-pointer z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-rosegold-700 hover:text-pink-600 shadow-lg hover:scale-110 transition-all cursor-pointer z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slideshow Controls Bar */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white text-rose-500 shadow-md border border-pink-200 hover:scale-105 transition cursor-pointer"
              title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Dots */}
            <div className="flex gap-1.5 flex-wrap justify-center max-w-md">
              {filteredPhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-7 bg-rose-500' : 'w-2 bg-pink-200 hover:bg-pink-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT CAPTION MODAL */}
      <AnimatePresence>
        {editingPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl border border-pink-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-serif text-xl font-bold text-rosegold-700">Edit Memory Caption</h3>
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full h-36 rounded-xl overflow-hidden mb-4 bg-pink-50 flex items-center justify-center">
                <img
                  src={editingPhoto.url}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="block text-xs font-semibold text-rosegold-600 uppercase tracking-wider mb-1">
                Main Caption
              </label>
              <input
                type="text"
                defaultValue={editingPhoto.caption}
                id="edit-caption-input"
                className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 font-handwriting text-xl text-rose-700 mb-3"
                placeholder="E.g., My precious little girl ❤️"
              />

              <label className="block text-xs font-semibold text-rosegold-600 uppercase tracking-wider mb-1">
                Mom's Memory Note
              </label>
              <input
                type="text"
                defaultValue={editingPhoto.subnote || ''}
                id="edit-subnote-input"
                className="w-full px-4 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 font-sans text-sm text-rosegold-700 mb-5"
                placeholder="E.g., A day at the mountains that I'll never forget"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-rosegold-600 hover:bg-pink-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const cap = document.getElementById('edit-caption-input')?.value;
                    const sub = document.getElementById('edit-subnote-input')?.value;
                    handleSaveCaption(editingPhoto.id, cap, sub);
                  }}
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-rose-500 text-white hover:bg-rose-600 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white p-4 sm:p-6 pb-8 rounded-2xl shadow-2xl flex flex-col items-center"
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-stone-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[72vh] rounded-xl overflow-hidden mb-4 flex items-center justify-center bg-stone-900">
                <img
                  src={lightboxPhoto.url}
                  alt={lightboxPhoto.caption}
                  className="max-h-[70vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="text-center px-4">
                <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-600 font-bold mb-1">
                  {lightboxPhoto.caption}
                </h3>
                {lightboxPhoto.subnote && (
                  <p className="font-serif text-sm text-rosegold-600 italic">
                    "{lightboxPhoto.subnote}"
                  </p>
                )}
                <span className="text-[11px] text-pink-400 uppercase tracking-widest mt-2 block font-semibold">
                  Mother's Treasured Keepsake
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
