import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Property', 'Rooms', 'Pool', 'Dining', 'Weddings'];

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
              Visual Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17382B] dark:text-[#F4EFE8] font-normal mb-4">
              A Glimpse Into Rajmahal
            </h1>
            <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
              Explore the tranquil grounds, accommodation interiors, swimming pavilions, and grand banquet halls of Rajmahal Resort in Nagaon, Assam.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter controls */}
        <ScrollReveal direction="up" delayMs={100}>
          <div className="flex items-center gap-1.5 p-1 bg-[#F4EFE6] dark:bg-[#121C17] rounded-lg border border-[#E6DDCF] dark:border-[#25362E] w-fit mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedFilter === cat
                    ? 'bg-white dark:bg-[#1C2C24] text-[#17382B] dark:text-[#C59F67] shadow-sm font-semibold'
                    : 'text-[#5E6963] dark:text-[#95A39B] hover:text-[#17382B] dark:hover:text-[#F4EFE8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" delayMs={(index % 3) * 120}>
              <div
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 border border-[#E6DDCF] dark:border-[#25362E] cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                fallbackTitle={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  {item.category}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-medium text-[#FAF6EE]">
                    {item.title}
                  </h3>
                  <Maximize2 className="w-4 h-4 text-[#C5A880]" />
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
              }
              aria-label="Previous Image"
              className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <span className="text-xs uppercase tracking-widest text-[#C5A880] block mb-1">
                  {filteredItems[lightboxIndex].category} · {lightboxIndex + 1} of {filteredItems.length}
                </span>
                <h3 className="font-serif text-lg font-medium text-[#FAF6EE]">
                  {filteredItems[lightboxIndex].title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredItems.length)}
              aria-label="Next Image"
              className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
