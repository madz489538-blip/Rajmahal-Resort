import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  durationMs?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delayMs = 0,
  direction = 'up',
  durationMs = 700,
  className = '',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransformClass = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0 scale-100';

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-6';
      case 'down':
        return 'opacity-0 -translate-y-6';
      case 'left':
        return 'opacity-0 translate-x-6';
      case 'right':
        return 'opacity-0 -translate-x-6';
      case 'none':
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-all ease-out ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
}
