import React, { useState } from 'react';
import { BackendService } from '../services/backend';
import { useRouter } from '../context/RouterContext';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Send, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  MessageSquare 
} from 'lucide-react';

export function ContactPage() {
  const { navigate } = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      BackendService.createContactEnquiry({
        fullName,
        email,
        phone,
        subject: subject || 'General Resort Inquiry',
        message,
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
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
              Location &amp; Concierge Desk
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17382B] dark:text-[#F4EFE8] font-normal mb-4">
              Connect with Rajmahal Resort
            </h1>
            <p className="text-xs sm:text-sm text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
              Conveniently situated along the NH-37 arterial corridor in Nagaon, Assam. Our concierge desk is available to assist with room enquiries, banquet reservations, and route directions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Direct Actions */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" delayMs={100}>
              <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-serif text-xl text-[#17382B] dark:text-[#F4EFE8] font-semibold">
                Resort Information
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B88E52] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#18201C] dark:text-[#F4EFE8] font-medium">
                      Physical Address
                    </strong>
                    <span className="text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
                      Uriagaon Chowk, NH-37,<br />
                      Nagaon, Assam 782003, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B88E52] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#18201C] dark:text-[#F4EFE8] font-medium">
                      Public Telephone Desk
                    </strong>
                    <a
                      href="tel:+919678275255"
                      className="text-[#17382B] dark:text-[#C59F67] hover:underline font-mono"
                    >
                      +91 96782 75255
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="w-4 h-4 text-[#B88E52] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#18201C] dark:text-[#F4EFE8] font-medium">
                      Instagram Handle
                    </strong>
                    <a
                      href="https://instagram.com/rajmahalresortnagaon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#17382B] dark:text-[#C59F67] hover:underline inline-flex items-center gap-1"
                    >
                      @rajmahalresortnagaon <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B88E52] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#18201C] dark:text-[#F4EFE8] font-medium">
                      Check-In &amp; Check-Out Hours
                    </strong>
                    <span className="text-[#5E6963] dark:text-[#95A39B]">
                      Standard Check-In: 2:00 PM · Check-Out: 11:00 AM
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Enquiry Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919678275255?text=Hello%20Rajmahal%20Resort,%20I%20would%20like%20to%20enquire%20about%20stay%20rates%20and%20banquet%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20BE5A] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Enquiry</span>
                </a>
                <p className="text-[11px] text-[#A8B6AE] text-center mt-2">
                  Opens a prefilled enquiry draft with the resort desk.
                </p>
              </div>
            </div>

            {/* Event CTA card */}
            <div className="bg-[#17382B] text-white p-6 rounded-2xl space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                Weddings &amp; Galas
              </span>
              <h3 className="font-serif text-lg text-[#F7F2E8]">
                Planning a Wedding or Banquet?
              </h3>
              <p className="text-xs text-[#D1DDD6] leading-relaxed">
                Use our specialized banquet inquiry form to select preferred hall venues, lawn layouts, and catering requirements.
              </p>
              <button
                onClick={() => navigate('/weddings-events')}
                className="w-full py-2.5 rounded text-xs font-semibold uppercase bg-[#C59F67] text-[#0B120F] hover:bg-[#D8B57F] transition-colors mt-2"
              >
                Go to Weddings &amp; Events Form
              </button>
            </div>
            </ScrollReveal>
          </div>

          {/* Form & Map */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal direction="right" delayMs={150}>
            {/* Form */}
            <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif text-xl text-[#17382B] dark:text-[#F4EFE8] mb-2 font-semibold">
                Send Us a Message
              </h2>
              <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mb-6">
                Have questions regarding dining, swimming pool access, or road transit? Leave us a note.
              </p>

              {submitted ? (
                <div className="p-6 text-center bg-[#F4EFE6] dark:bg-[#15231C] rounded-xl border border-[#B88E52]/30 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-base font-semibold text-[#17382B] dark:text-[#F4EFE8]">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                    Thank you. Our hospitality desk will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs text-[#B88E52] underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Room Inquiry, Pool Timings"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                    />
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] transition-colors"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Map Interface container */}
            <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[#E6DDCF] dark:border-[#25362E] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-[#18201C] dark:text-[#F4EFE8]">
                  <MapPin className="w-3.5 h-3.5 text-[#B88E52]" />
                  <span>Google Maps Location: Uriagaon Chowk, NH-37, Nagaon, Assam</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Rajmahal+Resort+Banquets+Uriagaon+Chowk+Nagaon+Assam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#B88E52] hover:underline inline-flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="aspect-[16/9] w-full bg-[#E5DFD5] dark:bg-[#1C2620] relative flex items-center justify-center">
                <iframe
                  title="Rajmahal Resort Location Map"
                  src="https://maps.google.com/maps?q=Uriagaon+Chowk,+NH-37,+Nagaon,+Assam+782003&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
