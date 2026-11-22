import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Check, Smile, Star } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/audio';

const GIFTS_DATA = [
  {
    id: 1,
    title: 'A Hug',
    emoji: '🤗',
    icon: Smile,
    color: 'from-pink-400 to-rose-400',
    ribbon: 'from-amber-200 to-yellow-300',
    tag: 'Gift No. 1',
    message: "If I could, I'd wrap you in a hug and keep you safe from every sadness in the world.",
    subnote: 'Always safe in Mom’s embrace',
  },
  {
    id: 2,
    title: 'A Wish',
    emoji: '✨',
    icon: Star,
    color: 'from-peach-300 via-amber-200 to-rose-300',
    ribbon: 'from-pink-300 to-purple-300',
    tag: 'Gift No. 2',
    message: 'May every dream in your heart find its way into your life.',
    subnote: 'May the universe conspire for your happiness',
  },
  {
    id: 3,
    title: 'My Love',
    emoji: '❤️',
    icon: Heart,
    color: 'from-purple-300 via-lavender-400 to-pink-400',
    ribbon: 'from-amber-200 to-rose-300',
    tag: 'Gift No. 3',
    message: 'No matter where life takes you, my love will always follow you.',
    subnote: 'Endless, timeless, unconditional',
  },
];

export const GiftsFromMom = () => {
  const [openedGifts, setOpenedGifts] = useState({});

  const handleOpenGift = (gift, e) => {
    soundEngine.playSurprise();

    // Trigger local confetti burst near the clicked gift
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerConfetti({ x, y });

    setOpenedGifts((prev) => ({
      ...prev,
      [gift.id]: !prev[gift.id],
    }));
  };

  const openedCount = Object.values(openedGifts).filter(Boolean).length;

  return (
    <section id="gifts" className="relative w-full py-16 px-4 flex flex-col items-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-rosegold-700 text-xs font-semibold tracking-widest uppercase shadow-sm"
      >
        <Gift className="w-3.5 h-3.5 text-pink-500" />
        <span>Surprises to Unbox</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl text-center font-bold text-rosegold-700 mb-2"
      >
        A Few Little Gifts From Mom 🎁
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-cursive text-2xl text-pink-600 text-center mb-4 max-w-lg"
      >
        Tap each gift box to reveal a special blessing for your birthday
      </motion.p>

      {/* Keepsake counter */}
      <div className="flex items-center gap-2 mb-10 text-xs uppercase tracking-wider font-semibold text-rosegold-500 bg-white/70 px-4 py-1.5 rounded-full border border-pink-200/60 shadow-sm">
        <span>Gifts Unwrapped:</span>
        <span className="text-rose-600 font-bold">{openedCount} / 3</span>
        {openedCount === 3 && <span className="text-emerald-500">🎉 All Blessings Unveiled!</span>}
      </div>

      {/* 3 GIFT BOXES GRID */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-start justify-items-center">
        {GIFTS_DATA.map((gift, idx) => {
          const isOpen = !!openedGifts[gift.id];

          return (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="w-full max-w-xs flex flex-col items-center"
            >
              {/* THE GIFT BOX CONTAINER */}
              <div
                onClick={(e) => handleOpenGift(gift, e)}
                className="w-full relative cursor-pointer select-none group flex flex-col items-center"
              >
                {/* Visual Glow */}
                <div className="absolute inset-0 bg-pink-200/30 rounded-3xl blur-xl group-hover:scale-105 transition-transform duration-300" />

                {/* Top Lid & Ribbon */}
                <motion.div
                  className="relative z-20 w-44 sm:w-48 h-12 rounded-t-xl shadow-md border-b border-pink-300/40 flex items-center justify-center bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300"
                  animate={isOpen ? { y: -24, rotate: -8, scale: 0.95 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  {/* Ribbon Knot / Bow */}
                  <div className="absolute -top-4 flex items-center justify-center">
                    <div className="w-6 h-7 bg-amber-300 rounded-full -rotate-45 shadow-sm border border-amber-100" />
                    <div className="w-4 h-4 bg-yellow-400 rounded-full z-10 shadow-inner flex items-center justify-center text-[10px]">
                      {gift.emoji}
                    </div>
                    <div className="w-6 h-7 bg-amber-300 rounded-full rotate-45 shadow-sm border border-amber-100" />
                  </div>

                  {/* Ribbon band */}
                  <div className="w-6 h-full bg-gradient-to-r from-amber-200 to-amber-300 shadow-sm" />
                </motion.div>

                {/* Gift Box Base */}
                <motion.div
                  className={`relative z-10 w-40 sm:w-44 h-36 rounded-b-2xl shadow-xl border-2 border-white/60 flex flex-col items-center justify-center p-4 bg-gradient-to-b ${gift.color}`}
                  animate={isOpen ? { scale: 0.98 } : { y: [0, -4, 0] }}
                  transition={
                    isOpen
                      ? { duration: 0.3 }
                      : { duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  {/* Vertical Ribbon */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-300 shadow-sm" />

                  {/* Tag on front */}
                  <div className="relative z-10 px-3 py-1.5 rounded-full bg-white/90 shadow-md border border-pink-200 text-center">
                    <span className="font-serif text-xs font-bold text-rosegold-700 block">
                      {gift.title}
                    </span>
                    <span className="text-[10px] text-pink-500 font-medium">
                      {isOpen ? 'Tap to close' : 'Tap to open'}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* REVEALED BLESSING CARD (Appears below or expands) */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="mt-4 w-full p-5 rounded-2xl bg-white/95 border-2 border-pink-200 shadow-xl relative overflow-hidden text-center"
                  >
                    {/* Golden accent bar on top */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400" />

                    <div className="text-2xl mb-2">{gift.emoji}</div>
                    
                    <h4 className="font-serif font-bold text-lg text-rosegold-800 mb-2">
                      {gift.title}
                    </h4>

                    <p className="font-serif text-sm sm:text-base leading-relaxed text-[#4a2e35] mb-3 italic">
                      "{gift.message}"
                    </p>

                    <div className="pt-2 border-t border-pink-100 flex items-center justify-center gap-1.5 text-xs text-rose-500 font-cursive text-lg">
                      <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                      <span>{gift.subnote}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
