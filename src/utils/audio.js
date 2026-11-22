// Web Audio API Procedural Heartfelt Music & Sound Effects Generator
// Ensures 100% reliable, offline-ready, beautiful ambient music and sound effects

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.melodyTimer = null;
    this.noteIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft piano / music-box note synthesizer
  playTone(freq, duration = 1.2, timeOffset = 0, type = 'sine', gainVal = 0.3) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime + timeOffset;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Harmonics for a bell/celesta/music-box warmth
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope: soft attack, gentle decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(gainVal, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(gainVal * 0.4, now + duration * 0.3);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Filter for mellow acoustic sweetness
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Heartfelt Lullaby / Melodic Theme for Daughter
  startMusic() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Sweet F-major / C-major peaceful lullaby notes
    // F4, A4, C5, D5, C5, A4, G4, F4, G4, A4, C5, F5, E5, D5, C5, A4
    const melody = [
      { f: 349.23, d: 1.6 }, // F4
      { f: 440.00, d: 1.2 }, // A4
      { f: 523.25, d: 2.0 }, // C5
      { f: 587.33, d: 1.4 }, // D5
      { f: 523.25, d: 1.8 }, // C5
      { f: 440.00, d: 1.4 }, // A4
      { f: 392.00, d: 2.2 }, // G4
      { f: 349.23, d: 1.5 }, // F4
      { f: 392.00, d: 1.4 }, // G4
      { f: 440.00, d: 1.8 }, // A4
      { f: 523.25, d: 1.6 }, // C5
      { f: 698.46, d: 2.4 }, // F5
      { f: 659.25, d: 1.6 }, // E5
      { f: 587.33, d: 1.6 }, // D5
      { f: 523.25, d: 2.2 }, // C5
      { f: 440.00, d: 2.5 }, // A4
    ];

    // Gentle arpeggio accompaniment
    const arpeggio = [
      { f: 174.61, d: 3.0 }, // F3
      { f: 261.63, d: 2.5 }, // C4
      { f: 349.23, d: 2.5 }, // F4
      { f: 220.00, d: 3.0 }, // A3
      { f: 196.00, d: 3.0 }, // G3
      { f: 293.66, d: 2.5 }, // D4
      { f: 261.63, d: 3.0 }, // C4
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isPlaying) return;

      const currentNote = melody[step % melody.length];
      const arpNote = arpeggio[step % arpeggio.length];

      // Play main gentle melody note
      this.playTone(currentNote.f, currentNote.d, 0, 'sine', 0.28);
      // Play octave sparkle
      this.playTone(currentNote.f * 2, currentNote.d * 0.7, 0.05, 'triangle', 0.08);
      // Play warm bass root
      if (step % 2 === 0) {
        this.playTone(arpNote.f, 2.5, 0, 'sine', 0.18);
      }

      step++;
      const delay = (currentNote.d * 0.85) * 1000;
      this.melodyTimer = setTimeout(playNext, delay);
    };

    playNext();
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0001 : 0.7, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  setVolume(val) {
    if (this.masterGain && this.ctx) {
      const volume = Math.max(0, Math.min(1, val));
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : volume, this.ctx.currentTime);
    }
  }

  // --- Sound Effects ---

  // Magical celestial chime when opening the gift box
  playGiftOpen() {
    this.init();
    if (this.isMuted) return;
    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];

    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.35, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  }

  // Breath swoosh and celestial chime when blowing candle
  playCandleBlow() {
    this.init();
    if (this.isMuted) return;
    const now = this.ctx.currentTime;

    // Soft breath swoosh (filtered noise simulation)
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(600, now);
    noiseFilter.Q.setValueAtTime(1.5, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.4, now + 0.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.55);

    // Magical chime cascade after blowing
    const notes = [659.25, 783.99, 1046.5, 1174.66, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.25 + idx * 0.07);

      gain.gain.setValueAtTime(0.001, now + 0.25 + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.3, now + 0.25 + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25 + idx * 0.07 + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + 0.25 + idx * 0.07);
      osc.stop(now + 0.25 + idx * 0.07 + 1.3);
    });
  }

  // Gift box click / surprise sound
  playSurprise() {
    this.init();
    if (this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.001, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.3, now + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.9);
    });
  }

  // Soft sparkle click
  playSparkle() {
    this.init();
    if (this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}

export const soundEngine = new SoundEngine();
