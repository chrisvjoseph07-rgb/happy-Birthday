import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundEffects = () => {
  // Static set of background floating elements to keep performance optimal
  const [particles, setParticles] = useState([]);
  const [clickHearts, setClickHearts] = useState([]);

  useEffect(() => {
    // Generate gentle floating hearts, petals, and stars
    const items = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      const type = i % 3 === 0 ? 'petal' : i % 3 === 1 ? 'heart' : 'star';
      items.push({
        id: i,
        type,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100,
        size: type === 'star' ? Math.random() * 8 + 6 : Math.random() * 14 + 12,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.5 + 0.25,
        color: ['#f472b6', '#fda4af', '#fbcfe8', '#fed7aa', '#e9d5ff', '#ffffff'][i % 6],
      });
    }
    setParticles(items);
  }, []);

  // Spawn a floating heart on screen click
  const handleGlobalClick = (e) => {
    const id = Date.now() + Math.random();
    const newHeart = {
      id,
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 16 + 18,
      color: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#d946ef'][Math.floor(Math.random() * 5)],
    };

    setClickHearts((prev) => [...prev.slice(-15), newHeart]);
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1800);
  };

  return (
    <div
      onClick={handleGlobalClick}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Dreamy Ambient Background Mesh / Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-purple-200/35 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full bg-peach-200/40 blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Floating Hearts, Petals, and Twinkling Stars */}
      {particles.map((p) => {
        if (p.type === 'heart') {
          return (
            <motion.div
              key={p.id}
              initial={{ y: '110vh', x: `${p.x}vw`, opacity: 0 }}
              animate={{
                y: '-10vh',
                x: [`${p.x}vw`, `${p.x + (p.id % 2 === 0 ? 4 : -4)}vw`, `${p.x}vw`],
                opacity: [0, p.opacity, p.opacity, 0],
                rotate: [0, p.id % 2 === 0 ? 25 : -25, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                fontSize: `${p.size}px`,
                color: p.color,
                filter: 'drop-shadow(0 0 6px rgba(244,114,182,0.4))',
              }}
            >
              ❤️
            </motion.div>
          );
        }

        if (p.type === 'petal') {
          return (
            <motion.div
              key={p.id}
              initial={{ y: '-10vh', x: `${p.x}vw`, opacity: 0, rotate: 0 }}
              animate={{
                y: '110vh',
                x: [`${p.x}vw`, `${p.x + 6}vw`, `${p.x - 4}vw`, `${p.x}vw`],
                opacity: [0, p.opacity * 0.9, p.opacity * 0.9, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: p.duration + 4,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                width: `${p.size}px`,
                height: `${p.size * 1.5}px`,
                background: 'linear-gradient(135deg, #fbcfe8 0%, #fda4af 100%)',
                borderRadius: '50% 0 50% 50%',
                transform: 'rotate(-45deg)',
                boxShadow: '0 2px 8px rgba(251, 113, 133, 0.25)',
              }}
            />
          );
        }

        // Star / Sparkle
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.1, scale: 0.6 }}
            animate={{
              opacity: [0.2, p.opacity * 1.2, 0.2],
              scale: [0.7, 1.25, 0.7],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: p.duration * 0.35 + 2,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: `${p.y}vh`,
              left: `${p.x}vw`,
              fontSize: `${p.size}px`,
              color: '#fbbf24',
              textShadow: '0 0 8px rgba(251, 191, 36, 0.8)',
            }}
          >
            ✦
          </motion.div>
        );
      })}

      {/* Dynamic Hearts Spawned by Clicking Anywhere */}
      <AnimatePresence>
        {clickHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.4, x: h.x - 12, y: h.y - 12 }}
            animate={{
              opacity: 0,
              scale: [0.4, 1.3, 1],
              y: h.y - 90,
              x: h.x - 12 + (Math.random() * 40 - 20),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              fontSize: `${h.size}px`,
              color: h.color,
              filter: 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.7))',
              zIndex: 9999,
            }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
