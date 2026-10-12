import React, { useState } from 'react';
import { BackendService } from '../services/backend';
import { EventEnquiry } from '../types';
import { VENUES, IMAGES } from '../data/mockData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { 
  Users, 
  Maximize2, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  Send, 
  AlertCircle 
} from 'lucide-react';

export function WeddingsEventsPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState<EventEnquiry['eventType']>('Wedding');
  const [preferredDate, setPreferredDate] = useState('');
  const [guestCount, setGuestCount] = useState<number>(300);
  const [preferredVenue, setPreferredVenue] = useState(VENUES[0].name);
  const [budgetRange, setBudgetRange] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<EventEnquiry | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !phone.trim() || !email.trim() || !preferredDate) {
      setFormError('Please fill in all required enquiry details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = BackendService.createEventEnquiry({
        fullName,
        phone,
        email,
        eventType,
        preferredDate,
        guestCount,
        preferredVenue,
        budgetRange: budgetRange || undefined,
        additionalRequirements: additionalRequirements || undefined,
      });

      setSubmittedEnquiry(created);
      setIsSubmitting(false);
      // Reset form
      setFullName('');
      setPhone('');
      setEmail('');
      setAdditionalRequirements('');
    } catch (err: any) {
      setIsSubmitting(false);
      setFormError(err.message || 'Failed to submit enquiry. Please try again.');
    }
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
              Weddings, Banquets &amp; Galas
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17382B] dark:text-[#F4EFE8] font-normal mb-4">
              Bespoke Celebrations in Nagaon
            </h1>
            <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
              From intimate Sangeet gatherings and Haldi ceremonies to grand open-air reception galas and corporate conclaves along NH-37.
            </p>
          </div>
        </ScrollReveal>

        {/* Venues Showcase */}
        <div className="space-y-12 mb-20">
          {VENUES.map((venue, idx) => (
            <ScrollReveal key={venue.id} direction={idx % 2 === 0 ? 'left' : 'right'} delayMs={100}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl overflow-hidden p-6 sm:p-8 shadow-sm ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
              <div className={`lg:col-span-6 aspect-[16/10] rounded-xl overflow-hidden shadow-md ${
                idx % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <ImageWithFallback
                  src={venue.image}
                  alt={venue.name}
                  fallbackTitle={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className={`lg:col-span-6 space-y-4 ${
                idx % 2 === 1 ? 'lg:order-1' : ''
              }`}>
                <div className="flex items-center gap-2 text-xs text-[#B88E52] dark:text-[#C59F67] font-semibold uppercase tracking-wider">
                  <span>{venue.capacity}</span>
                  <span>·</span>
                  <span>{venue.area}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
                  {venue.name}
                </h2>

                <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
                  {venue.tagline}
                </p>

                <div className="pt-2 text-xs text-[#17382B] dark:text-[#F4EFE8]">
                  <strong className="block mb-2 font-medium">Ideal Celebrations:</strong>
                  <p className="text-[#5E6963] dark:text-[#95A39B]">{venue.idealFor}</p>
                </div>

                <div className="space-y-2 pt-2">
                  {venue.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4E5B54] dark:text-[#A7B5AD]">
                      <Sparkles className="w-3.5 h-3.5 text-[#B88E52] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setPreferredVenue(venue.name);
                      const el = document.getElementById('enquiry-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612]"
                  >
                    Enquire for {venue.name}
                  </button>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enquiry Form Section */}
        <ScrollReveal direction="up" delayMs={150}>
          <div id="enquiry-form" className="max-w-4xl mx-auto bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-10 shadow-lg">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
                Event Booking Inquiry
              </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
              Connect with Our Event Concierge
            </h2>
            <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mt-2">
              Event enquiries are reviewed by our hospitality banquet manager. Note: Inquiries are not confirmed bookings until discussed and accepted.
            </p>
          </div>

          {submittedEnquiry ? (
            <div className="p-8 text-center bg-[#F4EFE6] dark:bg-[#15231C] rounded-xl border border-[#B88E52]/40 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#17382B] dark:text-[#F4EFE8]">
                Enquiry Successfully Registered
              </h3>
              <p className="text-xs text-[#5E6963] dark:text-[#95A39B] max-w-md mx-auto">
                Thank you, <strong>{submittedEnquiry.fullName}</strong>. Your event enquiry reference code is{' '}
                <span className="font-mono font-bold text-[#17382B] dark:text-[#C59F67]">
                  {submittedEnquiry.referenceNumber}
                </span>.
                Our team will reach out at <strong>{submittedEnquiry.phone}</strong> to coordinate details.
              </p>
              <button
                onClick={() => setSubmittedEnquiry(null)}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {formError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Partha Pratim Das"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Event Type *
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  >
                    <option value="Wedding">Wedding Celebration</option>
                    <option value="Reception">Wedding Reception</option>
                    <option value="Banquet">Banquet Gala</option>
                    <option value="Family Celebration">Family Celebration / Birthday</option>
                    <option value="Corporate Event">Corporate Meeting / Conclave</option>
                    <option value="Other">Other Private Gathering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Preferred Date *
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
                    Estimated Guests *
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={1500}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Preferred Venue
                  </label>
                  <select
                    value={preferredVenue}
                    onChange={(e) => setPreferredVenue(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  >
                    {VENUES.map((v) => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                    <option value="Both Ballroom + Lawn">Both Ballroom + Outdoor Lawn</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                    Budget Range (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹5,00,000 - ₹8,00,000"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                  Additional Requirements &amp; Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about decor preferences, catering menu wishes, stage setup, or guest accommodation needs."
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B]">
                  Direct Event Desk: <strong>+91 96782 75255</strong>
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Registering Enquiry...' : 'Submit Event Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
