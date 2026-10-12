import React from 'react';
import { Link, useRouter } from '../../context/RouterContext';
import { MapPin, Phone, Instagram, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#11231A] text-[#E6E1D8] border-t border-[#253D30] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#21382C]">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <span className="font-serif text-2xl font-semibold text-[#F7F2E8] tracking-wide block">
              Rajmahal Resort
            </span>
            <p className="text-xs text-[#A8B6AE] leading-relaxed">
              A premier hospitality and celebration retreat situated along NH-37 in Nagaon, Assam. Offering refined accommodations, banquet lawns, swimming pavilions, and fine dining.
            </p>
            <div className="pt-2 text-[11px] text-[#C5A880] leading-relaxed border border-[#C5A880]/20 bg-[#162A20] p-3 rounded">
              <span className="font-semibold block mb-0.5">Concept Demo Notice</span>
              This unofficial portfolio concept was created independently to demonstrate digital hospitality design. All rates &amp; reservations are simulated.
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#CAD4CD]">
              <li>
                <Link href="/stay" className="hover:text-[#F7F2E8] transition-colors">
                  Rooms &amp; Suites
                </Link>
              </li>
              <li>
                <Link href="/weddings-events" className="hover:text-[#F7F2E8] transition-colors">
                  Weddings &amp; Banquets
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-[#F7F2E8] transition-colors">
                  Restaurant &amp; Dining
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#F7F2E8] transition-colors">
                  Resort Experiences
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#F7F2E8] transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#F7F2E8] transition-colors">
                  Check Room Availability
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Contact & Location */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-4">
              Location &amp; Desk
            </h4>
            <ul className="space-y-3 text-xs text-[#CAD4CD]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Uriagaon Chowk, NH-37,<br />
                  Nagaon, Assam 782003
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href="tel:+919678275255" className="hover:text-[#F7F2E8] transition-colors">
                  +91 96782 75255
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href="https://instagram.com/rajmahalresortnagaon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7F2E8] transition-colors inline-flex items-center gap-1"
                >
                  @rajmahalresortnagaon <ArrowUpRight className="w-3 h-3 text-[#A8B6AE]" />
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span className="text-[#A8B6AE]">concierge@rajmahalresort.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Action & Admin */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-4">
              Direct Inquiries
            </h4>
            <p className="text-xs text-[#A8B6AE] mb-3 leading-relaxed">
              Planning a wedding, banquet, or family celebration in Nagaon? Speak with our hospitality coordinators.
            </p>
            <button
              onClick={() => navigate('/weddings-events')}
              className="w-full py-2.5 px-3 rounded text-xs font-medium tracking-wide bg-[#1A382A] text-[#F3EFE6] hover:bg-[#234A38] border border-[#C5A880]/30 transition-colors text-center"
            >
              Submit Event Enquiry
            </button>
            <div className="mt-4 pt-4 border-t border-[#21382C] flex items-center justify-between text-[11px] text-[#A8B6AE]">
              <Link href="/admin/login" className="hover:text-[#F7F2E8] flex items-center gap-1.5 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                Staff Administration
              </Link>
              <Link href="/privacy" className="hover:text-[#F7F2E8] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#F7F2E8] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86968D]">
          <p>© {new Date().getFullYear()} Rajmahal Resort &amp; Banquets. Independent Concept Design.</p>
          <p className="text-center sm:text-right">
            Nagaon, Assam — Unofficial Demonstration Website
          </p>
        </div>
      </div>
    </footer>
  );
}
