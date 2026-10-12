import React from 'react';
import { useRouter } from '../context/RouterContext';
import { IMAGES } from '../data/mockData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Waves, Sparkles, UtensilsCrossed, Flower2, HeartHandshake, Compass, ArrowRight } from 'lucide-react';

export function ExperiencesPage() {
  const { navigate } = useRouter();

  const experiences = [
    {
      id: 'pool',
      category: 'Aquatic Leisure',
      title: 'The Oasis Swimming Pavilion',
      description: 'Lounge beside calm turquoise waters nestled amidst palm trees. Perfect for morning laps, leisurely afternoons with tropical refreshments, or an evening dip after exploring central Assam.',
      image: IMAGES.pool,
      specs: ['Filtered freshwater pool', 'Sun loungers & shaded umbrellas', 'Poolside beverage service'],
      cta: 'Explore Executive Poolside Rooms',
      ctaLink: '/stay',
    },
    {
      id: 'dining',
      category: 'Epicurean Retreat',
      title: 'Regional Gastronomy & Assam Tea Traditions',
      description: 'Immerse your senses in authentic indigenous cooking. From freshly caught river carp prepared with aromatic lemon and bamboo shoot to evening cups of bold, malty Assam orthodox tea.',
      image: IMAGES.dining,
      specs: ['Handcrafted thali spreads', 'Aromatic Assam tea cellar', 'Courtyard outdoor dining'],
      cta: 'View Dining Ambience',
      ctaLink: '/dining',
    },
    {
      id: 'weddings',
      category: 'Celebrations',
      title: 'Bespoke Weddings & Grand Receptions',
      description: 'Transform your dream celebration into a reality on our expansive manicured lawns and chandelier-lit grand ballroom. Generous space for grand baarat entries and starlit banquets.',
      image: IMAGES.wedding,
      specs: ['Indoor ballroom + outdoor lawns', 'Bridal preparation suites', 'Accommodates up to 1,000 guests'],
      cta: 'Plan an Event',
      ctaLink: '/weddings-events',
    },
    {
      id: 'gardens',
      category: 'Nature & Solitude',
      title: 'Lush Landscaped Grounds & Verandahs',
      description: 'Take quiet evening walks along illuminated walkways. The resort property offers a serene cocoon of fresh air away from busy city life, yet right beside NH-37 for effortless travel.',
      image: IMAGES.garden,
      specs: ['Manicured flora and indigenous plants', 'Covered seating pavilions', 'Tranquil garden pathways'],
      cta: 'Check Room Rates',
      ctaLink: '/booking',
    },
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
              The Resort Lifestyle
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17382B] dark:text-[#F4EFE8] font-normal mb-4">
              Curated Experiences in Nagaon
            </h1>
            <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
              Every moment at Rajmahal Resort is crafted to evoke calm, celebrate regional heritage, and provide effortless leisure.
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Story Layout */}
        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} direction={index % 2 === 0 ? 'left' : 'right'} delayMs={100}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
              {/* Media */}
              <div
                className={`lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden shadow-md ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <ImageWithFallback
                  src={exp.image}
                  alt={exp.title}
                  fallbackTitle={exp.title}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>

              {/* Text */}
              <div
                className={`lg:col-span-5 space-y-5 ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67]">
                  {exp.category}
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8] leading-tight">
                  {exp.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#E6DDCF]/60 dark:border-[#25362E]/60">
                  {exp.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#4A5550] dark:text-[#A7B5AD]">
                      <Sparkles className="w-3.5 h-3.5 text-[#B88E52] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigate(exp.ctaLink)}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#17382B] dark:text-[#C59F67] hover:underline underline-offset-4"
                  >
                    <span>{exp.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
