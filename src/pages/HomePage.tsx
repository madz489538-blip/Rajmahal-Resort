import React from 'react';
import { useRouter } from '../context/RouterContext';
import { BookingSearchBar } from '../components/booking/BookingSearchBar';
import { RoomCard } from '../components/stay/RoomCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { BackendService } from '../services/backend';
import { IMAGES, VENUES, DINING_HIGHLIGHTS } from '../data/mockData';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';

const HOMEPAGE_EXPERIENCES = [
  {
    id: 'pool',
    category: 'Swimming Pool',
    title: 'The Oasis Swimming Pavilion',
    description: 'Lounge beside calm turquoise waters surrounded by tropical palms, sun loungers, and poolside refreshments.',
    image: IMAGES.pool,
    link: '/experiences',
  },
  {
    id: 'dining',
    category: 'Restaurant & Dining',
    title: 'Regional Gastronomy & Tea Traditions',
    description: 'Savor indigenous Assamese river carp delicacies, clay-oven tandoor kebabs, and aromatic regional Assam tea blends.',
    image: IMAGES.dining,
    link: '/dining',
  },
  {
    id: 'weddings',
    category: 'Weddings & Celebrations',
    title: 'Bespoke Weddings & Banquets',
    description: 'Expansive manicured open-air lawns and regal banquet halls crafted for grand ceremonies, Sangeet galas, and receptions.',
    image: IMAGES.wedding,
    link: '/weddings-events',
  },
  {
    id: 'stay',
    category: 'Stay & Accommodation',
    title: 'Sanctuaries of Comfort & Rest',
    description: 'Serene garden retreats, poolside guestrooms, and expansive heritage suites tailored for families, couples, and road travelers.',
    image: IMAGES.suite,
    link: '/stay',
  },
];

export function HomePage() {
  const { navigate } = useRouter();
  const rooms = BackendService.getRooms().slice(0, 3);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight * 0.75, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[82vh] sm:min-h-[86vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#070F0B]">
        {/* Background visual asset with slow cinematic zoom animation */}
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src={IMAGES.hero}
            alt="Rajmahal Resort exterior"
            fallbackTitle="Rajmahal Resort & Banquets"
            className="w-full h-full object-cover animate-slow-zoom"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B120F] via-[#0B120F]/65 to-[#0B120F]/45" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B120F]/30 to-[#0B120F]/80" />
        </div>

        {/* Hero Content with Staggered Cinematic Reveal */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16 sm:py-20 lg:py-28">
          {/* Subtle gold accent label */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4 sm:mb-6 font-medium animate-in fade-in slide-in-from-top-3 duration-700">
            <span className="w-4 sm:w-6 h-[1px] bg-[#C5A880]" />
            <span>Nagaon · Assam · NH-37</span>
            <span className="w-4 sm:w-6 h-[1px] bg-[#C5A880]" />
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF6EE] leading-[1.2] mb-4 sm:mb-6 text-balance max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 fill-mode-both">
            An Experience Beyond the Ordinary
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#D1DDD6] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light px-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
            Discover a place to unwind, celebrate, dine, and create cherished memories in Nagaon, Assam.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
            <button
              onClick={() => navigate('/stay')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-md text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 bg-[#C59F67] text-[#0B120F] hover:bg-[#D8B57F] hover:shadow-lg hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Explore The Resort</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/booking')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-md text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 bg-white/10 hover:bg-white/20 text-[#FAF6EE] border border-white/25 backdrop-blur-xs hover:scale-102 active:scale-98"
            >
              Book Your Stay
            </button>
          </div>
        </div>

        {/* Animated subtle scroll indicator */}
        <button
          onClick={handleScrollDown}
          aria-label="Scroll to explore"
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 hover:text-white text-[10px] tracking-widest uppercase transition-colors animate-float-slow cursor-pointer"
        >
          <span className="hidden sm:inline">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-[#C5A880]" />
        </button>
      </section>

      {/* Booking Search Overlap Strip */}
      <div className="relative z-20 max-w-6xl mx-auto px-3 sm:px-6 -mt-8 sm:-mt-10 lg:-mt-14 w-full">
        <ScrollReveal direction="up" delayMs={100}>
          <BookingSearchBar />
        </ScrollReveal>
      </div>

      {/* Editorial Overview Section */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 lg:sticky lg:top-24">
            <ScrollReveal direction="up" delayMs={50}>
              <div className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold">
                The Hospitality Sanctuary
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#17382B] dark:text-[#F4EFE8] leading-tight mt-1">
                A Serene Oasis in the Heart of Central Assam
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={150}>
              <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
                Conveniently positioned along NH-37 at Uriagaon Chowk, Rajmahal Resort &amp; Banquets offers an idyllic balance between highway connectivity and lush, secluded tranquility.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={200}>
              <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
                Whether you are organizing a destination wedding on our grand banquet lawns, reserving a quiet weekend staycation with the family, or enjoying regional Assamese culinary delicacies, our doors are open with genuine warmth.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={250}>
              <div className="pt-2 grid grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div className="p-3.5 sm:p-4 rounded-lg bg-[#F4EFE6] dark:bg-[#15231C] border border-[#E6DDCF] dark:border-[#25362E] transition-transform hover:-translate-y-0.5 duration-300">
                  <span className="font-serif text-base sm:text-lg font-bold text-[#17382B] dark:text-[#C59F67] block">
                    NH-37
                  </span>
                  <span className="text-[#5E6963] dark:text-[#95A39B] text-[10px] sm:text-[11px]">
                    Uriagaon Chowk access
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-lg bg-[#F4EFE6] dark:bg-[#15231C] border border-[#E6DDCF] dark:border-[#25362E] transition-transform hover:-translate-y-0.5 duration-300">
                  <span className="font-serif text-base sm:text-lg font-bold text-[#17382B] dark:text-[#C59F67] block">
                    Grand Lawns
                  </span>
                  <span className="text-[#5E6963] dark:text-[#95A39B] text-[10px] sm:text-[11px]">
                    Wedding grounds
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={300}>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/experiences')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#17382B] dark:text-[#C59F67] hover:underline underline-offset-4 group"
                >
                  <span>Discover All Experiences</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {HOMEPAGE_EXPERIENCES.map((exp, idx) => (
              <ScrollReveal key={exp.id} direction="up" delayMs={idx * 120} className="h-full">
                <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                  {/* [ EXPERIENCE IMAGE ] */}
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <ImageWithFallback
                      src={exp.image}
                      alt={exp.title}
                      fallbackTitle={exp.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Card Content Directly Underneath */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* CATEGORY LABEL */}
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-1">
                        {exp.category}
                      </span>

                      {/* Experience Title */}
                      <h3 className="font-serif text-lg sm:text-xl text-[#17382B] dark:text-[#F4EFE8] font-normal leading-snug group-hover:text-[#B88E52] dark:group-hover:text-[#C59F67] transition-colors">
                        {exp.title}
                      </h3>

                      {/* Short description */}
                      <p className="text-xs text-[#5E6963] dark:text-[#95A39B] leading-relaxed mt-2">
                        {exp.description}
                      </p>
                    </div>

                    {/* Explore More → */}
                    <div className="pt-3 border-t border-[#E6DDCF]/60 dark:border-[#25362E]/60 mt-auto">
                      <button
                        onClick={() => navigate(exp.link)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#17382B] dark:text-[#C59F67] hover:underline underline-offset-4 group/btn"
                      >
                        <span>Explore More</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Accommodations */}
      <section className="py-14 sm:py-20 bg-[#F4EFE6]/60 dark:bg-[#0E1713] border-y border-[#E6DDCF]/80 dark:border-[#25362E]/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
                  Accommodations
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17382B] dark:text-[#F4EFE8]">
                  Sanctuaries of Comfort &amp; Rest
                </h2>
              </div>
              <button
                onClick={() => navigate('/stay')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#17382B] dark:text-[#C59F67] hover:underline underline-offset-4 group"
              >
                <span>View All Room Categories</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {rooms.map((room, idx) => (
              <ScrollReveal key={room.id} direction="up" delayMs={idx * 150}>
                <RoomCard room={room} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Banquets & Weddings Marquee */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="left" delayMs={100}>
              <div className="aspect-[16/11] rounded-2xl overflow-hidden shadow-xl group">
                <ImageWithFallback
                  src={IMAGES.banquet}
                  alt="Rajmahal Banquet Hall"
                  fallbackTitle="Grand Banquet Hall"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#17382B] text-white p-6 rounded-xl border border-[#C5A880]/30 shadow-2xl max-w-xs transition-transform hover:-translate-y-1 duration-300">
                <span className="font-serif text-lg font-semibold text-[#C5A880] block mb-1">
                  Up to 1,000 Guests
                </span>
                <p className="text-xs text-[#D1DDD6] leading-snug">
                  Pillarless grand ballroom and starlit open-air lawn combinations for weddings and corporate galas.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 space-y-4 sm:space-y-6 lg:pl-6">
            <ScrollReveal direction="right" delayMs={150}>
              <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold">
                Weddings &amp; Banquets
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17382B] dark:text-[#F4EFE8] leading-tight mt-1">
                Create Timeless Celebrations in Nagaon
              </h2>
              <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed mt-3">
                Rajmahal Resort &amp; Banquets is engineered to stage grand Assamese weddings, receptions, Sangeet galas, and corporate conclaves. From spacious pre-function foyers to manicured green lawns, our facilities accommodate gatherings of all sizes.
              </p>

              <div className="space-y-2.5 sm:space-y-3 pt-3">
                {VENUES.map((venue) => (
                  <div
                    key={venue.id}
                    className="flex items-start gap-3 p-3 sm:p-3.5 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-white dark:bg-[#121C17] transition-all hover:border-[#B88E52]/60 hover:-translate-x-0.5 duration-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B88E52] dark:text-[#C59F67] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-[#18201C] dark:text-[#F4EFE8] truncate">
                        {venue.name}
                      </h4>
                      <p className="text-xs text-[#5E6963] dark:text-[#95A39B] line-clamp-1">
                        {venue.capacity} · {venue.tagline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/weddings-events')}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] dark:hover:bg-[#D8B57F] transition-all duration-200 hover:scale-102 active:scale-98 shadow-sm"
                >
                  Submit Event Enquiry
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dining & Culinary Highlight */}
      <section className="py-14 sm:py-20 bg-[#121F19] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
                Gastronomy &amp; Tastes
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7F2E8] mb-3 sm:mb-4">
                Authentic Flavors, Artful Hospitality
              </h2>
              <p className="text-xs sm:text-sm text-[#A8B6AE] leading-relaxed px-2">
                Sample traditional Assamese culinary treasures like fresh river fish with bamboo shoot, alongside rich North Indian royal tandoor classics.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {DINING_HIGHLIGHTS.map((dining, idx) => (
              <ScrollReveal key={dining.id} direction="up" delayMs={idx * 150}>
                <div className="bg-[#182B21] border border-[#274233] rounded-2xl overflow-hidden flex flex-col sm:flex-row group transition-all hover:border-[#C5A880]/40">
                  <div className="sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <ImageWithFallback
                      src={dining.image}
                      alt={dining.name}
                      fallbackTitle={dining.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="sm:w-1/2 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#F7F2E8] mb-1">
                        {dining.name}
                      </h3>
                      <p className="text-xs text-[#C5A880] mb-2">{dining.cuisine}</p>
                      <p className="text-xs text-[#A8B6AE] leading-relaxed">
                        {dining.ambiance}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#274233]">
                      <span className="text-[11px] text-[#A8B6AE] block mb-3">
                        {dining.timings}
                      </span>
                      <button
                        onClick={() => navigate('/dining')}
                        className="text-xs font-semibold text-[#C5A880] hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <span>Explore Menu &amp; Book Table</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Direct Contact Action */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="bg-[#F4EFE6] dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-5 sm:p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-8 space-y-3 sm:space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold">
                  Visit Rajmahal Resort
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
                  Easily Accessible on NH-37, Nagaon
                </h2>
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 pt-2 text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#B88E52] shrink-0" />
                    <span>Uriagaon Chowk, NH-37, Nagaon, Assam 782003</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#B88E52] shrink-0" />
                    <a href="tel:+919678275255" className="hover:underline">
                      +91 96782 75255
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] text-center transition-all duration-200 hover:scale-102 active:scale-98 shadow-xs"
                >
                  Get Directions &amp; Contact
                </button>
                <a
                  href="https://wa.me/919678275255?text=Hello%20Rajmahal%20Resort,%20I%20would%20like%20to%20enquire%20about%20stay%20and%20events."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider border border-[#B88E52] text-[#17382B] dark:text-[#C59F67] hover:bg-[#FBF9F4] dark:hover:bg-[#1A2620] text-center transition-all duration-200 hover:scale-102 active:scale-98"
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
