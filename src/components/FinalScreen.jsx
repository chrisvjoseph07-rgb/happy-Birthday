import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

export const FinalScreen = ({ onReplay }) => {
  const handleReplayClick = () => {
    soundEngine.playSparkle();
    triggerConfetti({ x: 0.5, y: 0.5 });
    onReplay();
  };

  return (
    <footer id="final" className="relative w-full min-h-screen py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-transparent via-[#ffe8ee]/50 to-[#ffd6e0]/70">
      {/* Background Soft Glows */}
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-pink-300/35 blur-3xl animate-pulse-glow" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-300/30 blur-2xl animate-float-slow" />

      {/* Floating Sparkles in Climax */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-300"
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.25,
            }}
            style={{
              top: `${(i * 17) % 85 + 5}%`,
              left: `${(i * 23) % 90 + 5}%`,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* GIANT PINK GLOWING HEART & PORTRAIT OF DAUGHTER */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, type: 'spring' }}
        className="relative mb-8 flex flex-col items-center justify-center"
      >
        {/* Pulsing Aura Rings */}
        <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-pink-400/40 blur-2xl animate-pulse" />
        <div className="absolute w-72 h-72 sm:w-84 sm:h-84 rounded-full bg-rose-300/30 blur-3xl animate-pulse-glow" />

        {/* Circular Glowing Portrait of Daughter with Beating Heart Frame */}
        <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-[0_0_35px_rgba(244,63,94,0.6)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-pink-100 border-2 border-white">
            <img
              src="./photos/holding-flower.jpg"
              alt="My Precious Daughter"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Heart Badge on Corner */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-xl shadow-lg border-2 border-white ring-2 ring-pink-300"
          >
            💖
          </motion.div>
        </div>
      </motion.div>

      {/* BEAUTIFUL GLOWING TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-3xl z-10 px-4 mb-8"
      >
        {/* Primary Quote */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug sm:leading-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 drop-shadow-sm mb-6">
          "You are not just my daughter… You are my heart walking outside my body. ❤️"
        </h2>

        {/* Secondary Subtitle */}
        <p className="font-cursive text-3xl sm:text-4xl md:text-5xl text-rosegold-700 drop-shadow-sm">
          Happy Birthday, my baby girl. Forever loved by Mom.
        </p>
      </motion.div>

      {/* Decorative Crown & Love Stamp */}
      <div className="flex items-center gap-3 text-pink-400 mb-10 z-10">
        <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-pink-300" />
        <span className="text-xl">🌸</span>
        <span className="text-xl">👑</span>
        <span className="text-xl">🌸</span>
        <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-pink-300" />
      </div>

      {/* REPLAY BUTTON: "Replay Our Little Surprise ↻" */}
      <motion.button
        onClick={handleReplayClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{
          boxShadow: [
            '0 0 15px rgba(244, 63, 94, 0.35)',
            '0 0 35px rgba(244, 63, 94, 0.7)',
            '0 0 15px rgba(244, 63, 94, 0.35)',
          ],
        }}
        transition={{
          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-semibold text-lg sm:text-xl shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/60 z-20"
      >
        <span className="relative flex items-center justify-center gap-3">
          <RotateCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-700" />
          <span>Replay Our Little Surprise ↻</span>
          <Sparkles className="w-5 h-5 text-amber-200" />
        </span>
      </motion.button>

      {/* Subtle Footer Note */}
      <p className="text-xs text-rosegold-400 mt-8 font-medium tracking-wider uppercase z-10">
        Created with eternal love • Happy Birthday My Princess
      </p>
    </footer>
  );
};
