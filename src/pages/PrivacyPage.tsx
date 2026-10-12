import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
          Data Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#17382B] dark:text-[#F4EFE8] font-normal mb-3">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">
          Concept Demo Privacy Guidelines
        </p>
      </div>

      <div className="space-y-8 text-xs text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
            1. Data Storage &amp; Persistence
          </h2>
          <p>
            Information submitted through demonstration forms (including simulated guest names, phone numbers, and event requests) is saved within local client storage to demonstrate the administration dashboard functionality. No private financial or personal identifying data is sold, monetized, or transmitted to third-party advertising brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
            2. Payment Information Protection
          </h2>
          <p>
            This website does not solicit, collect, store, or process real credit card numbers, CVVs, or bank account credentials. The simulated payment gateway acts exclusively in mock sandbox mode.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
            3. Local Storage Preferences
          </h2>
          <p>
            We use browser localStorage solely to preserve user preferences such as your choice of Light or Dark display theme, and temporary session state for the staff administration portal.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
            4. Inquiries &amp; Data Erasure
          </h2>
          <p>
            If you have entered test information and wish to clear the database, you can do so by resetting your browser storage or using the Reset Demo Data button located in the Staff Administration Settings page.
          </p>
        </section>
      </div>
    </div>
  );
}
