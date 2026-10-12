import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export function DemoNotice() {
  const [dismissed, setDismissed] = useState(false);
  const { navigate } = useRouter();

  if (dismissed) return null;

  return (
    <aside
      aria-label="Concept Demonstration Notice"
      className="bg-[#182B21] text-[#EFE7D8] text-xs px-3 sm:px-4 py-2 border-b border-[#C5A880]/30 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] shrink-0" />
          <p className="truncate text-[11px] sm:text-xs leading-snug">
            <strong className="text-[#C5A880] font-medium mr-1 uppercase tracking-wider text-[10px] sm:text-[11px]">
              Concept Demo:
            </strong>
            Demonstration website for Rajmahal Resort &amp; Banquets, Nagaon, Assam. Rates and bookings are simulated.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => navigate('/terms')}
            className="text-[10px] sm:text-[11px] text-[#C5A880] hover:underline underline-offset-2 whitespace-nowrap"
          >
            Learn More
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-[#C5A880]/70 hover:text-[#C5A880] transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
