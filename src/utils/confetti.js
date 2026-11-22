import confetti from 'canvas-confetti';

// Celebratory Confetti & Heart Bursts
export const triggerConfetti = (origin = { x: 0.5, y: 0.6 }) => {
  // Pastel blush, peach, lavender, rose gold, and cream palette
  const colors = ['#f472b6', '#fb7185', '#fed7aa', '#e9d5ff', '#fbbf24', '#fda4af', '#f3e8ff'];

  // Big central burst
  confetti({
    particleCount: 80,
    spread: 90,
    origin,
    colors,
    startVelocity: 35,
    scalar: 1.1,
    ticks: 200,
  });

  // Secondary soft burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: Math.max(0.1, origin.x - 0.2), y: origin.y },
      colors,
      startVelocity: 28,
      scalar: 0.9,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: Math.min(0.9, origin.x + 0.2), y: origin.y },
      colors,
      startVelocity: 28,
      scalar: 0.9,
    });
  }, 200);
};

// Candle blown magical celebration
export const triggerWishCelebration = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#fda4af', '#f472b6', '#e879f9', '#fed7aa', '#fde047', '#ffffff']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.4
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// Gentle continuous heart/petal shower
export const triggerHeartShower = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af'],
      shapes: ['circle'],
      scalar: 1.2,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};
