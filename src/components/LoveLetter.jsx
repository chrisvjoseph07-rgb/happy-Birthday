import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, MailOpen, Feather, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const paragraphs = [
    {
      type: 'greeting',
      text: "My precious daughter,",
    },
    {
      type: 'body',
      text: "Happy Birthday to the most beautiful blessing in my life. From the moment you came into my world, you filled my heart with a love that words can never truly explain.",
    },
    {
      type: 'body',
      text: "No matter how old you grow, you will always be my little girl, my happiness, my strength, and my greatest treasure. Watching you grow has been one of the most beautiful journeys of my life.",
    },
    {
      type: 'body',
      text: "I wish you a lifetime filled with happiness, love, success, beautiful memories, and dreams that come true. Whenever life gets difficult, remember that you will always have your mother's arms to come back to.",
    },
    {
      type: 'body',
      text: "I may not always express my love perfectly, but I hope you never forget how deeply, endlessly, and unconditionally I love you.",
    },
    {
      type: 'body',
      text: "Happy Birthday, my sweetheart. You will forever be my little princess.",
    },
    {
      type: 'signoff',
      text: "With all my love,\nMom ❤️",
    },
  ];

  const handleWaxSealClick = () => {
    soundEngine.playSparkle();
    setIsOpen(!isOpen);
  };

  const handleCopyLetter = () => {
    const fullText = `My precious daughter,\n\nHappy Birthday to the most beautiful blessing in my life. From the moment you came into my world, you filled my heart with a love that words can never truly explain.\n\nNo matter how old you grow, you will always be my little girl, my happiness, my strength, and my greatest treasure. Watching you grow has been one of the most beautiful journeys of my life.\n\nI wish you a lifetime filled with happiness, love, success, beautiful memories, and dreams that come true. Whenever life gets difficult, remember that you will always have your mother's arms to come back to.\n\nI may not always express my love perfectly, but I hope you never forget how deeply, endlessly, and unconditionally I love you.\n\nHappy Birthday, my sweetheart. You will forever be my little princess.\n\nWith all my love,\nMom ❤️`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    soundEngine.playSparkle();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="letter" className="relative w-full py-16 px-4 flex flex-col items-center justify-center">
      {/* Delicate Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-rosegold-700 text-xs font-semibold tracking-widest uppercase shadow-sm"
      >
        <Feather className="w-3.5 h-3.5 text-pink-500" />
        <span>From A Mother's Heart</span>
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl text-center font-bold text-rosegold-700 mb-2"
      >
        A Love Letter to My Daughter
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-cursive text-2xl text-pink-600 text-center mb-8"
      >
        Every word written with infinite warmth & maternal devotion
      </motion.p>

      {/* ENVELOPE & STATIONERY CONTAINER */}
      <div className="relative max-w-3xl w-full">
        {/* Soft Decorative Glow Behind Letter */}
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-200/50 via-peach-100/50 to-purple-200/50 rounded-3xl blur-xl -z-10" />

        {/* Envelope Flap Controls */}
        <div className="w-full flex justify-between items-center mb-3 px-3">
          <button
            onClick={handleWaxSealClick}
            className="flex items-center gap-2 text-xs font-medium text-rosegold-600 hover:text-rosegold-800 transition-colors cursor-pointer bg-white/80 px-3.5 py-1.5 rounded-full border border-pink-200 shadow-sm"
          >
            {isOpen ? <MailOpen className="w-3.5 h-3.5 text-pink-500" /> : <Mail className="w-3.5 h-3.5 text-pink-500" />}
            <span>{isOpen ? 'Fold Envelope' : 'Open Letter'}</span>
          </button>

          <button
            onClick={handleCopyLetter}
            className="flex items-center gap-1.5 text-xs font-medium text-rosegold-600 hover:text-rosegold-800 transition-colors cursor-pointer bg-white/80 px-3.5 py-1.5 rounded-full border border-pink-200 shadow-sm"
            title="Keep a copy of Mom's words"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
            <span>{copied ? 'Saved to Clipboard!' : "Save Mom's Words"}</span>
          </button>
        </div>

        {/* PARCHMENT LETTER */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="letter-open"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative p-6 sm:p-10 md:p-14 rounded-2xl bg-gradient-to-b from-[#fffefc] via-[#fffbf9] to-[#fff5f7] border-2 border-rose-200 shadow-2xl overflow-hidden"
            >
              {/* Gold Foil Border Inset */}
              <div className="absolute inset-2 sm:inset-3 rounded-xl border border-amber-300/40 pointer-events-none" />
              <div className="absolute inset-3 sm:inset-4 rounded-lg border border-pink-200/30 pointer-events-none" />

              {/* Corner Floral Filigree Ornaments */}
              <div className="absolute top-4 left-4 text-pink-300 text-lg opacity-70 pointer-events-none">🌸</div>
              <div className="absolute top-4 right-4 text-pink-300 text-lg opacity-70 pointer-events-none">🌸</div>
              <div className="absolute bottom-4 left-4 text-pink-300 text-lg opacity-70 pointer-events-none">🌸</div>
              <div className="absolute bottom-4 right-4 text-pink-300 text-lg opacity-70 pointer-events-none">🌸</div>

              {/* PINNED POLAROID OF MOM & DAUGHTER ON TOP RIGHT OF LETTER */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                animate={{ opacity: 1, scale: 1, rotate: 5 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                className="hidden md:block absolute top-10 right-10 w-44 bg-white p-2.5 pb-3.5 rounded-sm shadow-xl border border-pink-200 rotate-6 z-20 cursor-pointer group"
              >
                {/* Rose gold paperclip */}
                <div className="absolute -top-3 left-6 w-4 h-9 border-2 border-amber-400 rounded-full shadow-sm z-30" />
                <div className="w-full h-36 rounded-sm overflow-hidden bg-pink-50 border border-pink-100">
                  <img
                    src="./photos/mountain-with-mom.jpg"
                    alt="Mom and Daughter"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center font-handwriting text-base text-rose-700 mt-2 font-bold">
                  Mom & Princess ❤️
                </div>
              </motion.div>

              {/* Mobile version of pinned photo */}
              <div className="md:hidden flex justify-center mb-6">
                <div className="w-40 bg-white p-2.5 pb-3 rounded-sm shadow-md border border-pink-200 rotate-1">
                  <div className="w-full h-32 rounded-sm overflow-hidden bg-pink-50">
                    <img
                      src="./photos/mountain-with-mom.jpg"
                      alt="Mom and Daughter"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center font-handwriting text-sm text-rose-700 mt-1 font-bold">
                    Mom & My Princess ❤️
                  </div>
                </div>
              </div>

              {/* LETTER CONTENT - Appears line by line */}
              <div className="relative z-10 space-y-6 text-[#3d2328] max-w-xl">
                {paragraphs.map((p, index) => {
                  if (p.type === 'greeting') {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.25, duration: 0.8 }}
                        className="font-cursive text-3xl sm:text-4xl text-rose-700 tracking-wide font-bold"
                      >
                        {p.text}
                      </motion.div>
                    );
                  }

                  if (p.type === 'signoff') {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.25 + 0.3, duration: 0.9 }}
                        className="pt-6 flex flex-col items-start"
                      >
                        <div className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold whitespace-pre-line">
                          {p.text}
                        </div>
                        {/* Red Wax Seal Badge at Sign-off */}
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-700 shadow-md flex items-center justify-center text-white ring-2 ring-amber-300 font-cursive text-xs font-bold tracking-widest">
                            MOM
                          </div>
                          <span className="text-xs text-rosegold-500 font-serif italic">
                            Sealed with unconditional maternal love
                          </span>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.25, duration: 0.85 }}
                      className="font-serif text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-[#482b31] font-normal"
                    >
                      {p.text}
                    </motion.p>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* FOLDED ENVELOPE VIEW */
            <motion.div
              key="letter-closed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleWaxSealClick}
              className="cursor-pointer relative p-12 rounded-2xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-2 border-pink-300/80 shadow-xl flex flex-col items-center justify-center text-center group hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 shadow-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">
                💌
              </div>
              <h3 className="font-cursive text-3xl text-rosegold-700 mb-1">To My Dearest Daughter</h3>
              <p className="text-xs text-rose-500 uppercase tracking-widest font-semibold mb-4">Click wax seal to open</p>
              
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-md flex items-center justify-center text-rose-800 font-bold border-2 border-white ring-2 ring-amber-300">
                ❤️
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
