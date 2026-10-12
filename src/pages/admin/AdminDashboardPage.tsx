import React, { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { BackendService } from '../../services/backend';
import { useRouter } from '../../context/RouterContext';
import { Reservation, EventEnquiry } from '../../types';
import { 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  PartyPopper, 
  UtensilsCrossed, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export function AdminDashboardPage() {
  const { navigate } = useRouter();
  const [stats, setStats] = useState(BackendService.getAdminStats());
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [eventEnquiries, setEventEnquiries] = useState<EventEnquiry[]>([]);

  useEffect(() => {
    setStats(BackendService.getAdminStats());
    setReservations(BackendService.getReservations().slice(0, 5));
    setEventEnquiries(BackendService.getEventEnquiries().slice(0, 3));
  }, []);

  return (
    <AdminLayout activeTab="dashboard">
      <div className="space-y-8">
        {/* Welcome row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
              Hospitality Operations Dashboard
            </h1>
            <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mt-1">
              Rajmahal Resort &amp; Banquets, Nagaon, Assam (NH-37)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/reservations')}
              className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612]"
            >
              All Bookings
            </button>
            <button
              onClick={() => navigate('/admin/events')}
              className="px-4 py-2 rounded-lg text-xs font-medium border border-[#E6DDCF] dark:border-[#25362E] text-[#18201C] dark:text-[#F4EFE8] hover:bg-[#F4EFE6] dark:hover:bg-[#192620]"
            >
              Banquet Enquiries
            </button>
          </div>
        </div>

        {/* KPI Cards Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Verified Revenue */}
          <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] p-5 rounded-xl shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] block mb-1">
              Simulated Revenue
            </span>
            <span className="font-serif text-2xl font-bold text-[#17382B] dark:text-[#C59F67] block">
              ₹{stats.verifiedRevenue.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 block">
              From verified demo payments
            </span>
          </div>

          {/* Card 2: Confirmed Reservations */}
          <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] p-5 rounded-xl shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] block mb-1">
              Confirmed Bookings
            </span>
            <span className="font-serif text-2xl font-bold text-[#17382B] dark:text-[#C59F67] block">
              {stats.confirmedReservations}
            </span>
            <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B] mt-1 block">
              {stats.upcomingCheckIns} upcoming check-in(s)
            </span>
          </div>

          {/* Card 3: Pending Reservations */}
          <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] p-5 rounded-xl shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] block mb-1">
              Pending Bookings
            </span>
            <span className="font-serif text-2xl font-bold text-[#B88E52] dark:text-[#C59F67] block">
              {stats.pendingReservations}
            </span>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 block">
              Awaiting payment or action
            </span>
          </div>

          {/* Card 4: Banquet / Events */}
          <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] p-5 rounded-xl shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] block mb-1">
              Event Enquiries
            </span>
            <span className="font-serif text-2xl font-bold text-[#17382B] dark:text-[#C59F67] block">
              {stats.eventEnquiriesCount}
            </span>
            <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B] mt-1 block">
              Weddings &amp; celebrations
            </span>
          </div>
        </div>

        {/* Two-column layout: Recent Bookings & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Reservations Table */}
          <div className="lg:col-span-8 bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E6DDCF] dark:border-[#25362E]">
              <h2 className="font-serif text-lg font-semibold text-[#17382B] dark:text-[#F4EFE8]">
                Recent Room Reservations
              </h2>
              <button
                onClick={() => navigate('/admin/reservations')}
                className="text-xs text-[#B88E52] dark:text-[#C59F67] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#5E6963] dark:text-[#95A39B] border-b border-[#E6DDCF]/50 dark:border-[#25362E]/50">
                    <th className="pb-2 font-medium">Ref / Room</th>
                    <th className="pb-2 font-medium">Guest</th>
                    <th className="pb-2 font-medium">Dates</th>
                    <th className="pb-2 font-medium">Total</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DDCF]/40 dark:divide-[#25362E]/40">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-[#FBF9F4] dark:hover:bg-[#192620]">
                      <td className="py-3">
                        <span className="font-mono font-semibold text-[#18201C] dark:text-[#F4EFE8] block">
                          {res.referenceNumber}
                        </span>
                        <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B]">
                          {res.roomName}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="font-medium text-[#18201C] dark:text-[#F4EFE8] block">
                          {res.guest.fullName}
                        </span>
                        <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B]">
                          {res.guest.phone}
                        </span>
                      </td>
                      <td className="py-3 text-[#5E6963] dark:text-[#95A39B]">
                        {res.checkIn} to {res.checkOut} ({res.nights}n)
                      </td>
                      <td className="py-3 font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                        ₹{res.pricing.total.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <span className={`inline-block text-[10px] px-2 py-0.5 rounded font-medium ${
                          res.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : res.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                            : res.status === 'cancelled'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => navigate(`/booking/${res.referenceNumber}`)}
                          className="text-[#17382B] dark:text-[#C59F67] hover:underline font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Event Inquiries */}
          <div className="lg:col-span-4 bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DDCF] dark:border-[#25362E]">
              <h2 className="font-serif text-lg font-semibold text-[#17382B] dark:text-[#F4EFE8]">
                Event Leads
              </h2>
              <button
                onClick={() => navigate('/admin/events')}
                className="text-xs text-[#B88E52] dark:text-[#C59F67] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {eventEnquiries.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border border-[#E6DDCF]/70 dark:border-[#25362E]/70 bg-[#FBF9F4] dark:bg-[#192620] space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                      {event.fullName}
                    </span>
                    <span className="font-mono text-[10px] text-[#A8B6AE]">
                      {event.referenceNumber}
                    </span>
                  </div>
                  <div className="text-[#B88E52] dark:text-[#C59F67] font-medium">
                    {event.eventType} · {event.guestCount} Guests
                  </div>
                  <div className="text-[11px] text-[#5E6963] dark:text-[#95A39B]">
                    Date: {event.preferredDate} · Venue: {event.preferredVenue}
                  </div>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] bg-white dark:bg-[#121C17] px-2 py-0.5 rounded border border-[#E6DDCF] dark:border-[#25362E]">
                      Status: {event.status}
                    </span>
                    <a
                      href={`tel:${event.phone}`}
                      className="text-[#17382B] dark:text-[#C59F67] hover:underline text-[11px]"
                    >
                      Call Lead
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
