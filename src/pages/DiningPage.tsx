import React, { useState } from 'react';
import { BackendService } from '../services/backend';
import { DINING_HIGHLIGHTS, SAMPLE_MENU, IMAGES } from '../data/mockData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { RestaurantEnquiry } from '../types';
import { 
  UtensilsCrossed, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall 
} from 'lucide-react';

export function DiningPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('7:30 PM');
  const [guestCount, setGuestCount] = useState(4);
  const [seatingArea, setSeatingArea] = useState<RestaurantEnquiry['seatingArea']>('Indoor Fine Dining');
  const [specialOccasion, setSpecialOccasion] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<RestaurantEnquiry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim() || !preferredDate) return;

    setIsSubmitting(true);
    try {
      const created = BackendService.createRestaurantEnquiry({
        fullName,
        phone,
        email,
        preferredDate,
        preferredTime,
        guestCount,
        seatingArea,
        specialOccasion: specialOccasion || undefined,
      });
      setSubmittedEnquiry(created);
      setIsSubmitting(false);
      setFullName('');
      setPhone('');
      setEmail('');
      setSpecialOccasion('');
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
              Culinary Experiences
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17382B] dark:text-[#F4EFE8] font-normal mb-4">
              Flavors of Assam &amp; Royal India
            </h1>
            <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
              Savor slow-braised indigenous curries, clay-oven tandoor kebabs, and refreshing tea garden blends in our indoor dining salon or poolside courtyard.
            </p>
          </div>
        </ScrollReveal>

        {/* Venues / Dining Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {DINING_HIGHLIGHTS.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delayMs={idx * 150}>
              <div
                className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full"
              >
              <div className="aspect-[16/9] overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  fallbackTitle={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#17382B] dark:text-[#F4EFE8] mb-1">
                    {item.name}
                  </h3>
                  <span className="text-xs text-[#B88E52] dark:text-[#C59F67] font-medium block mb-3">
                    {item.cuisine}
                  </span>
                  <p className="text-xs text-[#5E6963] dark:text-[#95A39B] leading-relaxed mb-4">
                    {item.ambiance}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-[#E6DDCF]/60 dark:border-[#25362E]/60 text-xs text-[#4A5550] dark:text-[#A7B5AD]">
                    {item.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#B88E52] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-[#E6DDCF]/60 dark:border-[#25362E]/60 flex items-center justify-between text-xs text-[#5E6963] dark:text-[#95A39B]">
                  <span>{item.timings}</span>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Sample Menu Section */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-1">
                Curated Selections
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
                Sample Tasting Menu
              </h2>
            </div>
            <span className="text-[11px] text-[#A8B6AE] bg-[#F4EFE6] dark:bg-[#15231C] px-3 py-1 rounded border border-[#E6DDCF] dark:border-[#25362E]">
              Demonstration Menu Data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAMPLE_MENU.map((section, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-xl p-6 space-y-4"
              >
                <h3 className="font-serif text-lg font-semibold text-[#17382B] dark:text-[#F4EFE8] pb-2 border-b border-[#E6DDCF] dark:border-[#25362E]">
                  {section.category}
                </h3>
                <div className="space-y-4">
                  {section.items.map((dish, i) => (
                    <div key={i} className="text-xs space-y-1">
                      <div className="flex items-baseline justify-between gap-2 font-medium">
                        <span className="text-[#18201C] dark:text-[#F4EFE8]">
                          {dish.name}
                        </span>
                        <span className="text-[#B88E52] dark:text-[#C59F67] shrink-0 font-mono">
                          {dish.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5E6963] dark:text-[#95A39B] leading-snug">
                        {dish.desc}
                      </p>
                      <span className={`inline-block text-[10px] px-1.5 py-0.2 rounded font-medium ${
                        dish.dietary === 'Veg'
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                      }`}>
                        {dish.dietary}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Reservation Request Form */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
              Table Enquiry
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
              Reserve Your Table
            </h2>
            <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mt-1">
              Table reservations are registered in pending status and confirmed by phone.
            </p>
          </div>

          {submittedEnquiry ? (
            <div className="p-8 text-center bg-[#F4EFE6] dark:bg-[#15231C] rounded-xl border border-[#B88E52]/40 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-semibold text-[#17382B] dark:text-[#F4EFE8]">
                Dining Request Registered
              </h3>
              <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                Reference: <strong className="font-mono text-[#17382B] dark:text-[#C59F67]">{submittedEnquiry.referenceNumber}</strong>.
                Our maître d’ will confirm table readiness for {submittedEnquiry.preferredDate} at {submittedEnquiry.preferredTime}.
              </p>
              <button
                onClick={() => setSubmittedEnquiry(null)}
                className="mt-3 px-4 py-2 rounded text-xs font-semibold uppercase bg-[#17382B] text-white"
              >
                Book Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanjeev Barman"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 96782 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Time *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  >
                    <option value="1:00 PM">1:00 PM (Lunch)</option>
                    <option value="2:00 PM">2:00 PM (Lunch)</option>
                    <option value="7:30 PM">7:30 PM (Dinner)</option>
                    <option value="8:30 PM">8:30 PM (Dinner)</option>
                    <option value="9:30 PM">9:30 PM (Dinner)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Guests *
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Area
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  >
                    <option value="Indoor Fine Dining">Indoor Fine Dining</option>
                    <option value="Verandah Courtyard">Verandah Courtyard</option>
                    <option value="Poolside Gazebo">Poolside Gazebo</option>
                    <option value="Private Dining">Private Dining Room</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                  Special Occasion or Dietary Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birthday celebration, Jain food requirements, high chair needed"
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Table Reservation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
