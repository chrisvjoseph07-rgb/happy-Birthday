import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundEffects } from './components/BackgroundEffects';
import { OpeningGiftBox } from './components/OpeningGiftBox';
import { CakeCelebration } from './components/CakeCelebration';
import { LoveLetter } from './components/LoveLetter';
import { PhotoGallery } from './components/PhotoGallery';
import { GiftsFromMom } from './components/GiftsFromMom';
import { FinalScreen } from './components/FinalScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { Heart, Sparkles, Cake, Mail, Camera, Gift } from 'lucide-react';

export default function App() {
  const [hasOpenedGift, setHasOpenedGift] = useState(false);
  const [daughterName, setDaughterName] = useState(() => {
    return localStorage.getItem('princess_birthday_name') || 'Princess';
  });
  const [isEditingName, setIsEditingName] = useState(false);

  // Save daughter name if customized
  const handleSaveName = (newName) => {
    const trimmed = newName.trim();
    if (trimmed) {
      setDaughterName(trimmed);
      localStorage.setItem('princess_birthday_name', trimmed);
    }
    setIsEditingName(false);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasOpenedGift(false);
  };

  return (
    <div className="relative min-h-screen text-[#44282f] overflow-x-hidden selection:bg-pink-300 selection:text-pink-900">
      {/* Background Floating Hearts, Stars & Petals */}
      <BackgroundEffects />

      {/* OPENING ANIMATION SCENE */}
      <AnimatePresence mode="wait">
        {!hasOpenedGift && (
          <OpeningGiftBox
            key="opening-scene"
            onOpenComplete={() => {
              setHasOpenedGift(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </AnimatePresence>

      {/* MAIN CARD WEBSITE (Revealed after opening gift box) */}
      {hasOpenedGift && (
        <motion.div
          key="main-card-experience"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center w-full"
        >
          {/* FLOATING TOP NAVIGATION BAR */}
          <header className="sticky top-4 z-40 max-w-2xl w-[92%] sm:w-auto px-4 py-2.5 rounded-full glass-card shadow-lg border border-pink-200/80 flex items-center justify-between gap-3 sm:gap-6 mt-3">
            <div
              className="flex items-center gap-1.5 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-xl">👑</span>
              <span className="font-cursive text-xl sm:text-2xl text-rose-600 font-bold">
                For My {daughterName}
              </span>
            </div>

            {/* Quick Section Anchor Links */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <a
                href="#celebration"
                className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold text-rosegold-700 hover:text-pink-600 hover:bg-pink-100/60 transition flex items-center gap-1"
                title="Celebration"
              >
                <Cake className="w-3.5 h-3.5 text-pink-500" />
                <span className="hidden md:inline">Cake</span>
              </a>
              <a
                href="#letter"
                className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold text-rosegold-700 hover:text-pink-600 hover:bg-pink-100/60 transition flex items-center gap-1"
                title="Mom's Letter"
              >
                <Mail className="w-3.5 h-3.5 text-pink-500" />
                <span className="hidden md:inline">Letter</span>
              </a>
              <a
                href="#gallery"
                className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold text-rosegold-700 hover:text-pink-600 hover:bg-pink-100/60 transition flex items-center gap-1"
                title="Photo Memories"
              >
                <Camera className="w-3.5 h-3.5 text-pink-500" />
                <span className="hidden md:inline">14 Photos</span>
              </a>
              <a
                href="#gifts"
                className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold text-rosegold-700 hover:text-pink-600 hover:bg-pink-100/60 transition flex items-center gap-1"
                title="Gifts from Mom"
              >
                <Gift className="w-3.5 h-3.5 text-pink-500" />
                <span className="hidden md:inline">Gifts</span>
              </a>
            </nav>
          </header>

          {/* HERO BANNER SECTION */}
          <section className="relative w-full pt-10 pb-6 px-4 flex flex-col items-center text-center">
            {/* Name Badge with customization */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-pink-200/80 shadow-md mb-6"
            >
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={daughterName}
                    id="daughter-name-input"
                    className="px-2 py-0.5 rounded border border-pink-300 font-sans text-xs text-rose-700 outline-none w-28"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('daughter-name-input');
                      if (input) handleSaveName(input.value);
                    }}
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span
                  onClick={() => setIsEditingName(true)}
                  className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-rosegold-600 cursor-pointer hover:text-pink-600 flex items-center gap-1.5"
                  title="Click to personalize name"
                >
                  <span>To My Precious {daughterName}</span>
                  <span className="text-[10px] text-pink-400">✎</span>
                </span>
              )}
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-cursive text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 max-w-4xl tracking-wide leading-tight drop-shadow-sm mb-3"
            >
              Happy Birthday, Sweetheart
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-serif text-lg sm:text-xl md:text-2xl text-rosegold-700 max-w-2xl leading-relaxed italic mb-8"
            >
              "You brought infinite sunshine into my world the day you were born."
            </motion.p>

            {/* MINI POLAROID HERO BADGES (Showcasing her childhood & radiant smile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 sm:gap-6 my-2"
            >
              {/* Toddler smile polaroid */}
              <div className="w-28 sm:w-36 bg-white p-2 pb-3 rounded-md shadow-lg border border-pink-100 -rotate-4 hover:rotate-0 hover:scale-105 transition-all duration-300">
                <div className="w-full aspect-[4/5] rounded-sm overflow-hidden bg-pink-50">
                  <img
                    src="./photos/childhood-smile-2012.jpg"
                    alt="Childhood Smile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-handwriting text-xs sm:text-sm text-rose-700 text-center mt-1 font-bold">
                  Little Toddler 2012 ✨
                </p>
              </div>

              {/* Radiant flower smile polaroid */}
              <div className="w-32 sm:w-40 bg-white p-2 pb-3.5 rounded-md shadow-xl border border-pink-100 rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                <div className="w-full aspect-[4/5] rounded-sm overflow-hidden bg-pink-50">
                  <img
                    src="./photos/holding-flower.jpg"
                    alt="Radiant Smile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-handwriting text-xs sm:text-sm text-rose-700 text-center mt-1 font-bold">
                  My Beautiful Princess 🌸
                </p>
              </div>
            </motion.div>
          </section>

          {/* 1. BIRTHDAY CELEBRATION (CAKE, WISH & CANDLES) */}
          <CakeCelebration />

          {/* 2. MOTHER'S BIRTHDAY MESSAGE (HANDWRITTEN LOVE LETTER) */}
          <LoveLetter />

          {/* 3. PHOTO MEMORIES GALLERY (POLAROID & SCRAPBOOK) */}
          <PhotoGallery />

          {/* 4. INTERACTIVE GIFTS FROM MOM */}
          <GiftsFromMom />

          {/* 5. FINAL SCREEN WITH GLOWING HEART & REPLAY */}
          <FinalScreen onReplay={handleReplay} />

          {/* FLOATING MUSIC CONTROLLER */}
          <MusicPlayer />
        </motion.div>
      )}
    </div>
  );
}
