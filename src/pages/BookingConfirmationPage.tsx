import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { BackendService } from '../services/backend';
import { Reservation } from '../types';
import { SimulatedPaymentModal } from '../components/booking/SimulatedPaymentModal';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  CreditCard, 
  Printer, 
  Home, 
  Phone, 
  AlertTriangle, 
  MapPin, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';

export function BookingConfirmationPage() {
  const { routeParams, navigate } = useRouter();
  const ref = routeParams.bookingReference || '';
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    if (ref) {
      const found = BackendService.getReservationByReference(ref);
      setReservation(found || null);
      setLoading(false);
    }
  }, [ref]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#17382B] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">Retrieving booking record...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="py-24 max-w-md mx-auto text-center px-4">
        <h2 className="font-serif text-2xl text-[#17382B] dark:text-[#F4EFE8] mb-3">
          Booking Record Not Found
        </h2>
        <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mb-6">
          Could not locate any active or historical reservation with reference number: <strong>{ref}</strong>
        </p>
        <button
          onClick={() => navigate('/booking')}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase bg-[#17382B] text-white"
        >
          Start New Reservation
        </button>
      </div>
    );
  }

  const handlePaymentComplete = (updated: Reservation) => {
    setReservation(updated);
    setShowPaymentModal(false);
  };

  const handleCancelBooking = () => {
    try {
      const updated = BackendService.cancelReservation(reservation.id, cancelReason);
      setReservation(updated);
      setCancelModalOpen(false);
    } catch (e: any) {
      alert(e.message || 'Failed to cancel reservation');
    }
  };

  const statusConfig = {
    confirmed: {
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      label: 'Confirmed Reservation',
      desc: 'Your reservation has been confirmed with simulated transaction verification.',
    },
    pending: {
      badgeBg: 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      label: 'Pending Confirmation',
      desc: 'Reservation recorded. Awaiting payment or staff review before final confirmation.',
    },
    demo_reservation: {
      badgeBg: 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      icon: <AlertTriangle className="w-5 h-5 text-blue-600" />,
      label: 'Demo Concept Reservation',
      desc: 'Test reservation record stored for portfolio demonstration purposes.',
    },
    enquiry_submitted: {
      badgeBg: 'bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      label: 'Enquiry Submitted',
      desc: 'Request received by front desk for review.',
    },
    cancelled: {
      badgeBg: 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800',
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      label: 'Cancelled',
      desc: 'This reservation has been cancelled. Inventory released back to catalog.',
    },
  }[reservation.status];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top actions */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-[#5E6963] dark:text-[#95A39B] hover:text-[#17382B] dark:hover:text-[#F4EFE8]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs text-[#5E6963] dark:text-[#95A39B] hover:text-[#17382B] dark:hover:text-[#F4EFE8] px-3 py-1.5 rounded border border-[#E6DDCF] dark:border-[#25362E]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Voucher</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-[#17382B] text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                  Rajmahal Resort &amp; Banquets · Nagaon, Assam
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF6EE]">
                  Reservation Summary
                </h1>
              </div>

              <div className="text-left sm:text-right bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                <span className="text-[10px] uppercase tracking-wider text-[#D1DDD6] block">
                  Reference Code
                </span>
                <span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-[#C5A880]">
                  {reservation.referenceNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Status banner */}
          <div className={`p-5 border-b border-[#E6DDCF] dark:border-[#25362E] flex items-start sm:items-center gap-3.5 ${statusConfig.badgeBg}`}>
            {statusConfig.icon}
            <div>
              <span className="font-semibold text-xs sm:text-sm block">
                Status: {statusConfig.label}
              </span>
              <p className="text-xs opacity-90">
                {statusConfig.desc}
              </p>
            </div>
          </div>

          {/* Content details */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Room & Stay */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#17382B] dark:text-[#F4EFE8] border-b border-[#E6DDCF] dark:border-[#25362E] pb-2">
                  Stay Specifications
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5E6963] dark:text-[#95A39B]">Accommodation:</span>
                    <strong className="text-[#18201C] dark:text-[#F4EFE8]">{reservation.roomName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6963] dark:text-[#95A39B]">Check-In:</span>
                    <strong className="text-[#18201C] dark:text-[#F4EFE8]">{reservation.checkIn}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6963] dark:text-[#95A39B]">Check-Out:</span>
                    <strong className="text-[#18201C] dark:text-[#F4EFE8]">{reservation.checkOut}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6963] dark:text-[#95A39B]">Stay Length:</span>
                    <strong className="text-[#18201C] dark:text-[#F4EFE8]">{reservation.nights} Night(s)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6963] dark:text-[#95A39B]">Party Size:</span>
                    <strong className="text-[#18201C] dark:text-[#F4EFE8]">
                      {reservation.adults} Adults, {reservation.children} Children ({reservation.roomsCount} room)
                    </strong>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#17382B] dark:text-[#F4EFE8] border-b border-[#E6DDCF] dark:border-[#25362E] pb-2">
                  Guest &amp; Contact
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5E6963] dark:text-[#95A39B]">Primary Guest:</span>
                    <strong className="text-[#18201C] dark:text-[#F4EFE8]">{reservation.guest.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6963] dark:text-[#95A39B]">Email:</span>
                    <span className="text-[#18201C] dark:text-[#F4EFE8]">{reservation.guest.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6963] dark:text-[#95A39B]">Mobile:</span>
                    <span className="text-[#18201C] dark:text-[#F4EFE8]">{reservation.guest.phone}</span>
                  </div>
                  {reservation.guest.specialRequests && (
                    <div className="pt-1">
                      <span className="text-[#5E6963] dark:text-[#95A39B] block mb-0.5">Special Requests:</span>
                      <p className="p-2 rounded bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8]">
                        {reservation.guest.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-[#FBF9F4] dark:bg-[#15231C] p-5 rounded-xl border border-[#E6DDCF] dark:border-[#25362E]">
              <h3 className="font-serif text-base font-semibold text-[#17382B] dark:text-[#F4EFE8] mb-3">
                Calculated Price Breakdown
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Room Charges (₹{reservation.pricing.baseRatePerNight.toLocaleString()} × {reservation.nights}n × {reservation.roomsCount}r):</span>
                  <span>₹{reservation.pricing.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Resort Service Charge (5%):</span>
                  <span>₹{reservation.pricing.serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5E6963] dark:text-[#95A39B]">
                  <span>Applicable GST Taxes (12%):</span>
                  <span>₹{reservation.pricing.taxes.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-[#E6DDCF] dark:border-[#25362E] flex justify-between font-bold text-sm text-[#18201C] dark:text-[#F4EFE8]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-lg text-[#17382B] dark:text-[#C59F67]">
                    ₹{reservation.pricing.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 text-[#5E6963] dark:text-[#95A39B]">
                  <span>Payment Status:</span>
                  <span className="font-semibold uppercase tracking-wider text-[#B88E52] dark:text-[#C59F67]">
                    {reservation.paymentStatus === 'simulated_paid'
                      ? 'Simulated Paid'
                      : reservation.paymentStatus}
                  </span>
                </div>
                {reservation.paymentDetails && (
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono pt-1">
                    Demo Txn ID: {reservation.paymentDetails.transactionId} ({reservation.paymentDetails.method})
                  </div>
                )}
              </div>
            </div>

            {/* Actions: Pay / Cancel */}
            <div className="flex flex-wrap gap-3 pt-2">
              {reservation.status !== 'confirmed' && reservation.status !== 'cancelled' && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-2 shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Launch Simulated Demo Payment</span>
                </button>
              )}

              {reservation.status !== 'cancelled' && (
                <button
                  onClick={() => setCancelModalOpen(true)}
                  className="px-4 py-2.5 rounded-lg text-xs font-medium border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Cancel Reservation
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cancellation modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-xl max-w-md w-full p-6 space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                Cancel Reservation {reservation.referenceNumber}?
              </h3>
              <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">
                This will release the reserved room inventory back to the resort availability catalog.
              </p>
              <div>
                <label className="block text-xs font-medium mb-1 text-[#5E6963] dark:text-[#95A39B]">
                  Reason for Cancellation (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Schedule change, date postponement"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 text-xs rounded border border-[#E6DDCF] dark:border-[#25362E]"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="px-4 py-2 text-xs rounded bg-red-600 text-white font-medium"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {reservation && (
          <SimulatedPaymentModal
            reservation={reservation}
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </div>
    </div>
  );
}
