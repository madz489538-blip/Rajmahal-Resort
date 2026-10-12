import React, { useState } from 'react';
import { Reservation } from '../../types';
import { BackendService } from '../../services/backend';
import { ShieldCheck, CheckCircle2, XCircle, CreditCard, Smartphone, Building, RefreshCw, AlertTriangle } from 'lucide-react';

interface SimulatedPaymentModalProps {
  reservation: Reservation;
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (updatedReservation: Reservation) => void;
}

export function SimulatedPaymentModal({
  reservation,
  isOpen,
  onClose,
  onPaymentComplete,
}: SimulatedPaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'failure' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatePayment = (outcome: 'success' | 'failure') => {
    setProcessing(true);
    setErrorMessage(null);

    // Simulate network delay to payment gateway
    setTimeout(() => {
      try {
        const result = BackendService.simulatePayment(reservation.id, outcome);
        setProcessing(false);
        setPaymentResult(outcome);
        if (outcome === 'success') {
          setTimeout(() => {
            onPaymentComplete(result.reservation);
          }, 1200);
        } else {
          setErrorMessage('Simulated transaction declined by bank gateway. You may test retry below.');
        }
      } catch (err: any) {
        setProcessing(false);
        setPaymentResult('failure');
        setErrorMessage(err.message || 'Payment simulation error');
      }
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Header Strip with Razorpay-like theme & Demo disclaimer */}
        <div className="bg-[#17382B] text-white p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif text-lg tracking-wide font-semibold text-[#F3EFE6]">
              Rajmahal Gateway (Demo)
            </span>
            <div className="flex items-center gap-1.5 text-[11px] bg-[#B88E52]/20 border border-[#B88E52]/40 text-[#EBDCC5] px-2 py-0.5 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Sandbox Sandbox</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-[#A8B6AE]">
              Booking Ref: {reservation.referenceNumber}
            </span>
            <span className="text-xl font-bold font-serif text-[#C59F67]">
              ₹{reservation.pricing.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Demo banner */}
        <div className="bg-[#FFF9EE] dark:bg-[#1C261E] border-b border-[#E6DDCF] dark:border-[#25362E] px-5 py-2.5 flex items-center gap-2 text-xs text-[#8A6724] dark:text-[#E2C17D]">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <p className="leading-tight">
            <strong>DEMO ONLY — NO REAL PAYMENT.</strong> No money will be debited. Select outcome to test full booking lifecycle.
          </p>
        </div>

        {/* Body content */}
        <div className="p-6">
          {paymentResult === 'success' ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                Payment Simulated Successfully!
              </h3>
              <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                Transaction verified on server. Reservation status updated to Confirmed. Redirecting...
              </p>
            </div>
          ) : paymentResult === 'failure' ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-950/40 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                  Simulated Payment Failed
                </h3>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {errorMessage}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setPaymentResult(null)}
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-3 rounded-lg text-xs font-medium border border-[#E6DDCF] dark:border-[#25362E] text-[#5E6963] dark:text-[#95A39B]"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Method tabs */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-2">
                  Select Simulated Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                      selectedMethod === 'upi'
                        ? 'border-[#B88E52] bg-[#FBF9F4] dark:bg-[#1A2620] text-[#17382B] dark:text-[#C59F67]'
                        : 'border-[#E6DDCF] dark:border-[#25362E] text-[#5E6963] dark:text-[#95A39B]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#B88E52]" />
                    <span>UPI / QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                      selectedMethod === 'card'
                        ? 'border-[#B88E52] bg-[#FBF9F4] dark:bg-[#1A2620] text-[#17382B] dark:text-[#C59F67]'
                        : 'border-[#E6DDCF] dark:border-[#25362E] text-[#5E6963] dark:text-[#95A39B]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#B88E52]" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('netbanking')}
                    className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                      selectedMethod === 'netbanking'
                        ? 'border-[#B88E52] bg-[#FBF9F4] dark:bg-[#1A2620] text-[#17382B] dark:text-[#C59F67]'
                        : 'border-[#E6DDCF] dark:border-[#25362E] text-[#5E6963] dark:text-[#95A39B]'
                    }`}
                  >
                    <Building className="w-4 h-4 text-[#B88E52]" />
                    <span>Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Guest & Room summary */}
              <div className="bg-[#FBF9F4] dark:bg-[#192620] p-3 rounded-lg border border-[#E6DDCF]/70 dark:border-[#25362E]/70 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#5E6963] dark:text-[#95A39B]">Guest Name:</span>
                  <span className="font-medium text-[#18201C] dark:text-[#F4EFE8]">
                    {reservation.guest.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5E6963] dark:text-[#95A39B]">Room:</span>
                  <span className="font-medium text-[#18201C] dark:text-[#F4EFE8]">
                    {reservation.roomName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5E6963] dark:text-[#95A39B]">Stay Dates:</span>
                  <span className="font-medium text-[#18201C] dark:text-[#F4EFE8]">
                    {reservation.checkIn} to {reservation.checkOut} ({reservation.nights} nights)
                  </span>
                </div>
              </div>

              {/* Simulation triggers */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => handleSimulatePayment('success')}
                  className="w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {processing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Simulate Successful Payment</span>
                </button>

                <button
                  type="button"
                  disabled={processing}
                  onClick={() => handleSimulatePayment('failure')}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wider uppercase border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Simulate Failed Payment</span>
                </button>

                <button
                  type="button"
                  disabled={processing}
                  onClick={onClose}
                  className="w-full py-2 text-xs text-[#5E6963] dark:text-[#95A39B] hover:text-[#18201C] dark:hover:text-[#F4EFE8] transition-colors"
                >
                  Cancel and Pay Later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
