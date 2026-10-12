import React from 'react';
import { ShieldCheck, AlertCircle, Info } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-[#B88E52] dark:text-[#C59F67] font-semibold block mb-2">
          Legal &amp; Concept Disclosure
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#17382B] dark:text-[#F4EFE8] font-normal mb-3">
          Terms of Concept Demonstration
        </h1>
        <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">
          Last reviewed: October 2026
        </p>
      </div>

      <div className="bg-[#FFF9EE] dark:bg-[#1A261E] border border-[#E6DDCF] dark:border-[#25362E] p-6 rounded-2xl mb-8 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#8A6724] dark:text-[#E2C17D]">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>Important Notice: Independent Concept Demo</span>
        </div>
        <p className="text-xs text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
          This website is an <strong>UNOFFICIAL CONCEPT DEMO</strong> developed by an independent digital designer to showcase what a modern, luxury web presence for Rajmahal Resort &amp; Banquets (Uriagaon Chowk, NH-37, Nagaon, Assam 782003) could look like.
        </p>
        <p className="text-xs text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
          This website is NOT an official site operated by Rajmahal Resort &amp; Banquets, nor has the ownership authorized or endorsed this publication. No real hotel reservations, commercial bookings, or financial payments take place on this domain.
        </p>
      </div>

      <div className="space-y-8 text-xs text-[#5E6963] dark:text-[#95A39B] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
            1. Nature of Simulated Bookings &amp; Tariffs
          </h2>
          <p>
            All room categories, square footages, tariffs, package inclusions, and availability data shown within this demo are hypothetical test values designed to test the reservation algorithm and user experience.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
            2. Payment Sandbox Simulation
          </h2>
          <p>
            The checkout flow includes a Razorpay-style interactive sandbox modal strictly for demonstration of payment state transitions. It does NOT debit any bank account, UPI ID, or card, and does not connect to live merchant credentials.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
            3. Contacting the Resort Directly
          </h2>
          <p>
            To reach the physical establishment of Rajmahal Resort &amp; Banquets for genuine stays or event bookings in Nagaon, please contact their publicly listed phone desk directly at <strong>+91 96782 75255</strong> or visit Uriagaon Chowk, NH-37, Nagaon, Assam 782003.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
            4. Cancellation and Refund Simulation
          </h2>
          <p>
            In the event that live payment gateway credentials and official booking management are provisioned following owner authorization, standard cancellation policies (e.g. 48-hour free cancellation prior to check-in) will take effect under official resort guidelines.
          </p>
        </section>
      </div>
    </div>
  );
}
