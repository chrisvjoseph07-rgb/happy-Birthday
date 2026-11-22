import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { triggerConfetti, triggerHeartShower } from '../utils/confetti';
import { soundEngine } from '../utils/audio';

export const OpeningGiftBox = ({ onOpenComplete }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio effects: start heartfelt lullaby and play magical chime
    soundEngine.playGiftOpen();
    setTimeout(() => {
      soundEngine.startMusic();
    }, 400);

    // Confetti and heart bursts
    triggerConfetti({ x: 0.5, y: 0.5 });
    triggerHeartShower();

    // After animation finishes, notify parent to reveal the card
    setTimeout(() => {
      onOpenComplete();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-[#fff1f5] via-[#fce7f3] to-[#f5e8ff]">
      {/* Dreamy Ambient Glows */}
      <div className="absolute w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full bg-pink-300/40 blur-3xl animate-pulse-glow" />
      <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full bg-peach-300/30 blur-2xl animate-float-slow" />

      {/* Floating Sparkles & Hearts in Scene */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            initial={{
              x: `${(i * 19) % 95}vw`,
              y: `${(i * 23) % 90}vh`,
              opacity: 0.3,
              scale: 0.7,
            }}
            animate={{
              y: [`${(i * 23) % 90}vh`, `${((i * 23) % 90) - 20}vh`, `${(i * 23) % 90}vh`],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.7, 1.1, 0.7],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          >
            {i % 2 === 0 ? <Heart className="w-5 h-5 fill-pink-300/60" /> : <Sparkles className="w-5 h-5 text-amber-300" />}
          </motion.div>
        ))}
      </div>

      {/* Main Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center max-w-md w-full text-center"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Little Crown / Delicate Tiara Accent */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="mb-2 text-3xl md:text-4xl filter drop-shadow-md"
        >
          👑
        </motion.div>

        {/* Header Text: "A little surprise for my princess..." */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-cursive text-3xl sm:text-4xl md:text-5xl text-rosegold-700 tracking-wide mb-8 drop-shadow-sm px-4"
        >
          A little surprise for my princess...
        </motion.h1>

        {/* 3D Animated Gift Box */}
        <div className="relative my-4 flex items-center justify-center cursor-pointer select-none group" onClick={handleOpenClick}>
          {/* Glowing Aura Behind Box */}
          <div className="absolute inset-0 w-56 h-56 bg-gradient-to-r from-pink-400/40 via-peach-300/40 to-purple-400/40 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />

          {/* Gift Box Container with Animations */}
          <motion.div
            className="relative w-48 h-48 sm:w-56 sm:h-56 flex flex-col items-center justify-center"
            animate={
              isOpening
                ? { scale: [1, 1.15, 0.9, 1.25], opacity: [1, 1, 1, 0] }
                : { y: [0, -10, 0] }
            }
            transition={
              isOpening
                ? { duration: 1.6, ease: 'easeInOut' }
                : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* GIFT BOX LID */}
            <motion.div
              className="absolute -top-4 z-30 w-52 sm:w-60 h-14 bg-gradient-to-r from-pink-400 via-blush-400 to-rose-400 rounded-t-xl shadow-lg border-b-2 border-rose-300/60 flex items-center justify-center"
              animate={
                isOpening
                  ? { y: -180, x: 40, rotate: 25, opacity: 0 }
                  : { y: 0 }
              }
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {/* Ribbon Bow on Lid */}
              <div className="absolute -top-7 flex items-center justify-center">
                {/* Left loop */}
                <div className="w-9 h-11 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 rounded-full -rotate-45 shadow-md border border-amber-100 transform origin-bottom-right" />
                {/* Center knot with sparkling jewel */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 z-10 shadow-inner flex items-center justify-center text-xs">
                  💎
                </div>
                {/* Right loop */}
                <div className="w-9 h-11 bg-gradient-to-bl from-amber-200 via-amber-300 to-amber-400 rounded-full rotate-45 shadow-md border border-amber-100 transform origin-bottom-left" />
              </div>

              {/* Vertical Gold Ribbon on Lid */}
              <div className="w-8 h-full bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-white/40 w-1/2 -skew-x-12 ribbon-shine" />
              </div>
            </motion.div>

            {/* GIFT BOX BODY */}
            <motion.div
              className="relative w-44 sm:w-52 h-40 sm:h-44 bg-gradient-to-b from-pink-300 via-blush-400 to-rose-400 rounded-b-2xl shadow-2xl overflow-hidden border-t-0 border-2 border-pink-200/60"
              animate={
                isOpening
                  ? { scaleY: [1, 1.1, 0.4, 0], opacity: [1, 1, 0.6, 0] }
                  : {}
              }
              transition={{ duration: 1.4, ease: 'easeIn' }}
            >
              {/* Satin Texture Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />

              {/* Vertical Ribbon */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 shadow-md flex items-center justify-center">
                <div className="w-0.5 h-full bg-amber-500/30" />
              </div>

              {/* Horizontal Ribbon */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8 bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-400 shadow-md">
                <div className="h-0.5 w-full bg-amber-500/30" />
              </div>

              {/* Delicate Gold Seal Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 shadow-lg flex items-center justify-center text-rose-600 font-bold text-xs ring-2 ring-white/60">
                  ❤️
                </div>
              </div>
            </motion.div>

            {/* Sparkles / Light Burst from Inside when opened */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 2.5, 4], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.3, ease: 'easeOut' }}
                  className="absolute z-40 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-200 filter blur-xl pointer-events-none"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Instruction Tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs sm:text-sm text-rosegold-500 tracking-wider uppercase mb-5 font-medium"
        >
          Wrapped with endless love by Mom
        </motion.p>

        {/* Glowing Button: "Open Your Gift 💝" */}
        <motion.button
          onClick={handleOpenClick}
          disabled={isOpening}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 15px rgba(244, 63, 94, 0.4)',
              '0 0 35px rgba(244, 63, 94, 0.8)',
              '0 0 15px rgba(244, 63, 94, 0.4)',
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-blush-400 via-pink-500 to-rose-400 text-white font-semibold text-lg md:text-xl shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/60"
        >
          {/* Shimmer sweep effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <span className="relative flex items-center justify-center gap-3 drop-shadow">
            <span>Open Your Gift 💝</span>
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};
