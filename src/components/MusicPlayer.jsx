import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    // Check if music has started in sound engine
    const checkState = setInterval(() => {
      setIsPlaying(soundEngine.isPlaying);
      setIsMuted(soundEngine.isMuted);
    }, 500);
    return () => clearInterval(checkState);
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundEngine.stopMusic();
      setIsPlaying(false);
    } else {
      soundEngine.startMusic();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Floating Volume Slider on Hover/Open */}
      {showVolume && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-full glass-card border border-pink-200/80 shadow-lg animate-fade-in">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-pink-500 cursor-pointer h-1.5 rounded-lg bg-pink-100"
          />
        </div>
      )}

      {/* Floating Music Action Button */}
      <div
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full glass-card-pink border border-pink-200 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 group"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        {/* Animated equalizer waves when playing */}
        <div className="flex items-end gap-0.5 h-4 w-4 mr-1">
          <div
            className={`w-1 bg-pink-500 rounded-full transition-all duration-200 ${
              isPlaying && !isMuted ? 'h-4 animate-bounce' : 'h-1.5'
            }`}
            style={{ animationDelay: '0.1s' }}
          />
          <div
            className={`w-1 bg-rose-500 rounded-full transition-all duration-200 ${
              isPlaying && !isMuted ? 'h-3 animate-bounce' : 'h-2'
            }`}
            style={{ animationDelay: '0.3s' }}
          />
          <div
            className={`w-1 bg-purple-500 rounded-full transition-all duration-200 ${
              isPlaying && !isMuted ? 'h-3.5 animate-bounce' : 'h-1'
            }`}
            style={{ animationDelay: '0.2s' }}
          />
        </div>

        {/* Music label / play-pause toggle */}
        <button
          onClick={handleTogglePlay}
          className="text-xs font-semibold text-rosegold-700 hover:text-pink-600 flex items-center gap-1 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-pink-600" />
              <span className="hidden sm:inline">Pause Lullaby</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-pink-600" />
              <span className="hidden sm:inline">Play Lullaby</span>
            </>
          )}
        </button>

        {/* Mute button */}
        <button
          onClick={handleToggleMute}
          className="p-1 rounded-full text-rosegold-600 hover:text-pink-600 transition cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
