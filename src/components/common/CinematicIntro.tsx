import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState<'enter' | 'line' | 'title' | 'details' | 'exit' | 'hidden'>('enter');

  useEffect(() => {
    // Respect prefers-reduced-motion accessibility setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStage('hidden');
      if (onComplete) onComplete();
      return;
    }

    // Lock body scroll while intro is visible
    document.body.style.overflow = 'hidden';

    // Animation sequence:
    // 0ms: Black fade-in begins
    // 350ms: Subtle gold line draws across
    // 800ms: RAJMAHAL title reveals
    // 1400ms: RESORT & BANQUETS and NAGAON, ASSAM reveal + progress line fills
    // 2850ms: Smooth cinematic fade/dissolve out
    // 3500ms: Unmount
    const tLine = setTimeout(() => setStage('line'), 350);
    const tTitle = setTimeout(() => setStage('title'), 800);
    const tDetails = setTimeout(() => setStage('details'), 1400);
    const tExit = setTimeout(() => setStage('exit'), 2850);
    const tHidden = setTimeout(() => {
      setStage('hidden');
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 3500);

    return () => {
      clearTimeout(tLine);
      clearTimeout(tTitle);
      clearTimeout(tDetails);
      clearTimeout(tExit);
      clearTimeout(tHidden);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('exit');
    setTimeout(() => {
      setStage('hidden');
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 450);
  };

  if (stage === 'hidden') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Rajmahal Resort & Banquets"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070E0B] text-[#F4EFE8] select-none transition-all duration-700 ease-in-out ${
        stage === 'exit' ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient luxury glow */}
      <div className="absolute inset-0 bg-radial-at-c from-[#142C21]/45 via-[#070E0B]/85 to-[#050A08] pointer-events-none" />

      {/* Elegant Skip Button */}
      <div className="absolute top-5 right-5 sm:top-7 sm:right-8 z-30">
        <button
          onClick={handleSkip}
          aria-label="Skip welcome introduction"
          className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#C5A880]/80 hover:text-[#C5A880] transition-all py-1.5 px-3 sm:py-2 sm:px-4 rounded-full border border-[#C5A880]/25 hover:border-[#C5A880]/60 bg-[#0E1A14]/60 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-102 active:scale-98"
        >
          <span>Skip</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Step 1: Suggested Welcome Text Kicker */}
        <div
          className={`transition-all duration-800 ease-out transform ${
            stage === 'enter'
              ? 'opacity-0 -translate-y-3'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#C5A880] font-medium block mb-3">
            An Experience Beyond the Ordinary
          </span>
          <div className="text-xs sm:text-sm text-[#B4C2BA] font-light tracking-wide mb-5">
            Welcome to
          </div>
        </div>

        {/* Step 2: Decorative Gold Drawing Line Across */}
        <div className="w-36 sm:w-56 h-[1px] relative mb-6 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-transparent via-[#C5A880] to-transparent transition-all duration-1000 ease-out mx-auto ${
              stage === 'enter' ? 'w-0 opacity-0' : 'w-full opacity-100'
            }`}
          />
        </div>

        {/* Step 3: Grand Wordmark "RAJMAHAL" */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            stage === 'enter' || stage === 'line'
              ? 'opacity-0 scale-95 translate-y-3'
              : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wider text-[#FAF6EE] mb-2 drop-shadow-md">
            RAJMAHAL
          </h1>
        </div>

        {/* Step 4 & 5: "RESORT & BANQUETS" and "NAGAON, ASSAM" */}
        <div
          className={`transition-all duration-800 delay-100 ease-out transform ${
            stage === 'details' || stage === 'exit'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C5A880] font-medium mb-3">
            <span>RESORT &amp; BANQUETS</span>
          </div>

          <div className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9BA8A1] font-light">
            NAGAON, ASSAM
          </div>
        </div>

        {/* Step 6: Refined Animated Gold Progress Line */}
        <div className="mt-10 sm:mt-12 w-36 sm:w-52 h-[2px] bg-[#172E22] rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-[#9E7D4E] via-[#D8B57F] to-[#C5A880] rounded-full transition-all duration-1800 ease-out ${
              stage === 'enter' ? 'w-0' : 'w-full'
            }`}
          />
        </div>
      </div>

      {/* Subtle bottom detail */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-[#61746B] opacity-70">
        Uriagaon Chowk · NH-37
      </div>
    </div>
  );
}
