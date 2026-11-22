import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wand2 } from 'lucide-react';
import { triggerWishCelebration } from '../utils/confetti';
import { soundEngine } from '../utils/audio';

export const CakeCelebration = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleMakeAWish = () => {
    if (isBlowing) return;
    setIsBlowing(true);

    // Audio effect: candle blowing swoosh + celebratory chimes
    soundEngine.playCandleBlow();

    setTimeout(() => {
      setCandlesLit(false);
      setWishMade(true);
      setIsBlowing(false);
      triggerWishCelebration();
    }, 450);
  };

  const handleRelight = () => {
    soundEngine.playSparkle();
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section id="celebration" className="relative w-full py-16 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Floating Pastel Balloons on the Sides */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Balloon Cluster */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [-2, 3, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-4 top-12 md:left-8 flex flex-col items-center opacity-85"
        >
          <div className="w-16 h-20 md:w-20 md:h-24 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-tr from-pink-400 via-rose-300 to-blush-200 shadow-lg relative">
            <div className="absolute top-3 left-3 w-4 h-6 bg-white/40 rounded-full blur-[1px] -rotate-45" />
          </div>
          <div className="w-1 h-20 bg-pink-300/60 -mt-1" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -22, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute left-10 top-24 md:left-24 flex flex-col items-center opacity-80"
        >
          <div className="w-14 h-18 md:w-16 md:h-20 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-tr from-purple-300 via-lavender-300 to-pink-200 shadow-md relative">
            <div className="absolute top-2 left-2 w-3 h-5 bg-white/40 rounded-full blur-[1px] -rotate-45" />
          </div>
          <div className="w-1 h-24 bg-purple-300/50 -mt-1" />
        </motion.div>

        {/* Right Balloon Cluster */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [2, -4, 2] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -right-4 top-16 md:right-10 flex flex-col items-center opacity-85"
        >
          <div className="w-16 h-20 md:w-20 md:h-24 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-tr from-peach-300 via-amber-200 to-rose-200 shadow-lg relative">
            <div className="absolute top-3 right-3 w-4 h-6 bg-white/40 rounded-full blur-[1px] rotate-45" />
          </div>
          <div className="w-1 h-20 bg-amber-300/60 -mt-1" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -16, 0], rotate: [-3, 2, -3] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="absolute right-12 top-28 md:right-28 flex flex-col items-center opacity-80"
        >
          <div className="w-14 h-18 md:w-16 md:h-20 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-tr from-pink-300 via-blush-200 to-lavender-200 shadow-md relative">
            <div className="absolute top-2 right-2 w-3 h-5 bg-white/40 rounded-full blur-[1px] rotate-45" />
          </div>
          <div className="w-1 h-24 bg-pink-300/50 -mt-1" />
        </motion.div>
      </div>

      {/* Princess Tiara Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-pink-200 shadow-sm mb-4"
      >
        <span className="text-xl">👑</span>
        <span className="text-xs uppercase tracking-widest font-semibold text-rosegold-600">
          The Celebration of My Daughter
        </span>
        <Sparkles className="w-4 h-4 text-amber-400" />
      </motion.div>

      {/* Headline: HAPPY BIRTHDAY, MY PRINCESS! 🎂 */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 mb-3 px-4 drop-shadow-sm"
      >
        HAPPY BIRTHDAY, MY PRINCESS! 🎂
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="font-cursive text-2xl sm:text-3xl text-rosegold-600 text-center mb-10 max-w-xl"
      >
        May every candle on your cake bring a thousand blessings to your life
      </motion.p>

      {/* THE TIERED BIRTHDAY CAKE */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: 'spring' }}
        className="relative flex flex-col items-center mt-6 mb-8 select-none"
      >
        {/* Soft magical glow under the cake */}
        <div className="absolute -bottom-6 w-80 h-16 bg-gradient-to-r from-pink-300/40 via-peach-300/40 to-lavender-300/40 rounded-full blur-xl" />

        {/* 3 CANDLES ON TOP */}
        <div className="flex items-end justify-center gap-7 sm:gap-9 mb-1 z-20">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              {/* Flame or Smoke */}
              <div className="h-10 flex items-center justify-center relative">
                {candlesLit ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 0.95, 1.1],
                      rotate: [idx === 1 ? 0 : idx === 0 ? -3 : 3, 2, -2],
                    }}
                    transition={{
                      duration: 0.8 + idx * 0.2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Outer Fire Glow */}
                    <div className="w-5 h-9 rounded-[50%_50%_35%_35%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_20px_#f59e0b] animate-flame" />
                    {/* Inner Core Flame */}
                    <div className="absolute bottom-1 w-2.5 h-5 rounded-[50%_50%_35%_35%] bg-gradient-to-t from-blue-300 via-white to-amber-100" />
                  </motion.div>
                ) : (
                  /* Soft smoke rising after blown */
                  <div className="relative w-3 h-8">
                    <div className="w-2.5 h-6 rounded-full bg-gray-400/40 blur-[2px] animate-smoke" />
                    <Sparkles className="w-3 h-3 text-amber-300/70 absolute -top-2 left-1 animate-ping" />
                  </div>
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-stone-700" />

              {/* Candle Stick */}
              <div
                className={`w-4 sm:w-5 h-12 rounded-t-sm shadow-md border-t border-white/50 relative overflow-hidden ${
                  idx === 0
                    ? 'bg-gradient-to-b from-rose-200 to-pink-300'
                    : idx === 1
                    ? 'bg-gradient-to-b from-amber-100 to-peach-300'
                    : 'bg-gradient-to-b from-purple-200 to-lavender-300'
                }`}
              >
                {/* Spiral Gold Stripes on Candle */}
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#d97706_0,#d97706_2px,transparent_2px,transparent_7px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* CAKE TOP TIER */}
        <div className="relative w-44 sm:w-52 h-16 bg-gradient-to-r from-cream-100 via-pink-100 to-cream-100 rounded-t-2xl shadow-md border-b-2 border-pink-200 flex flex-col items-center justify-between z-10 overflow-hidden">
          {/* Top frosting drips */}
          <div className="w-full h-4 bg-gradient-to-r from-pink-300 via-blush-300 to-pink-300 rounded-b-xl flex justify-around px-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-pink-300 rounded-full -mb-1.5 shadow-sm" />
            ))}
          </div>

          {/* Strawberry / Rose Accents */}
          <div className="flex gap-4 items-center mb-1">
            <span className="text-xs">🍓</span>
            <span className="text-xs">🌸</span>
            <span className="text-xs">🍓</span>
          </div>
        </div>

        {/* CAKE MIDDLE TIER */}
        <div className="relative w-60 sm:w-72 h-20 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 rounded-t-2xl shadow-md border-b-2 border-pink-300 flex flex-col items-center justify-between z-0 -mt-1 overflow-hidden">
          {/* Middle frosting decorative scallops */}
          <div className="w-full h-4 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 rounded-b-xl flex justify-around px-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-4 h-3.5 bg-rose-300 rounded-full -mb-2 shadow-sm" />
            ))}
          </div>

          {/* Pearl & flower garland */}
          <div className="flex gap-3 text-xs opacity-85 mb-2">
            <span>✨</span>
            <span>💖</span>
            <span>✨</span>
            <span>💖</span>
            <span>✨</span>
          </div>
        </div>

        {/* CAKE BASE TIER */}
        <div className="relative w-76 sm:w-92 h-24 bg-gradient-to-r from-cream-50 via-blush-100 to-cream-50 rounded-t-2xl shadow-xl flex flex-col items-center justify-between -mt-1 border-b-4 border-rose-200 overflow-hidden">
          {/* Base tier scalloped cream swirls */}
          <div className="w-full h-5 bg-gradient-to-r from-pink-200 via-blush-200 to-pink-200 flex justify-around px-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-pink-200 rounded-full -mb-2 shadow-sm" />
            ))}
          </div>

          {/* Golden Lettering on Cake */}
          <div className="font-cursive text-xl sm:text-2xl text-rose-500 drop-shadow-sm font-semibold tracking-wide mb-3">
            To My Princess with Love
          </div>

          {/* Bottom Pearl border */}
          <div className="w-full flex justify-center gap-1.5 pb-1">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-b from-white to-amber-200 shadow-sm" />
            ))}
          </div>
        </div>

        {/* LUXURIOUS CAKE PEDESTAL / STAND */}
        <div className="w-84 sm:w-98 h-4 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 rounded-full shadow-lg border border-amber-300/80 -mt-0.5" />
        <div className="w-32 h-6 bg-gradient-to-b from-amber-200 to-amber-300 rounded-b-xl shadow-md border-x border-amber-400" />
      </motion.div>

      {/* INTERACTIVE ACTION BUTTON */}
      <div className="flex flex-col items-center gap-4 z-20">
        <AnimatePresence mode="wait">
          {candlesLit ? (
            <motion.button
              key="blow-btn"
              onClick={handleMakeAWish}
              disabled={isBlowing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:shadow-pink-300/60 transition-all duration-300 flex items-center gap-3 cursor-pointer group"
            >
              <Wand2 className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>Make a Wish ✨</span>
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
            </motion.button>
          ) : (
            <motion.div
              key="wish-granted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center p-4 rounded-2xl glass-card-pink max-w-md shadow-lg border border-pink-200"
            >
              <div className="flex items-center gap-2 text-rose-600 font-bold text-lg mb-1">
                <span>🌟 Your Wish Has Been Sent to the Stars! 🌟</span>
              </div>
              <p className="text-sm text-rosegold-700 mb-3">
                "May every prayer in your heart blossom into reality, my darling daughter."
              </p>
              <button
                onClick={handleRelight}
                className="text-xs text-rose-500 hover:text-rose-700 underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Light the candles again 🕯️</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
