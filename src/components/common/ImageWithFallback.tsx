import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export function ImageWithFallback({
  src,
  alt = 'Resort imagery',
  className = '',
  containerClassName = '',
  fallbackTitle = 'Rajmahal Resort & Banquets',
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#1B3528] via-[#14261D] to-[#0E1A14] flex flex-col items-center justify-center text-center p-6 text-[#EBDCC5] ${containerClassName || className}`}
      >
        <div className="w-12 h-12 rounded-full border border-[#C5A880]/30 flex items-center justify-center mb-3 bg-[#11231A]/60">
          <Sparkles className="w-5 h-5 text-[#C5A880]" />
        </div>
        <p className="font-serif text-sm tracking-wide text-[#F3EFE6] font-medium">{fallbackTitle}</p>
        <span className="text-[11px] text-[#A69B89] tracking-wider uppercase mt-1">Nagaon, Assam</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#15231C]/10 ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EFE8DD] dark:bg-[#16221C] animate-pulse" />
      )}
    </div>
  );
}
