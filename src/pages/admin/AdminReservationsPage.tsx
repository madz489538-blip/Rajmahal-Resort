import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { BackendService } from '../../services/backend';
import { Reservation, ReservationStatus } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Eye, 
  RefreshCw 
} from 'lucide-react';

export function AdminReservationsPage() {
  const { navigate } = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>(BackendService.getReservations());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

  const reload = () => {
    setReservations(BackendService.getReservations());
  };

  const filtered = reservations.filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      r.referenceNumber.toLowerCase().includes(s) ||
      r.guest.fullName.toLowerCase().includes(s) ||
      r.guest.phone.includes(s) ||
      r.roomName.toLowerCase().includes(s);

    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: ReservationStatus) => {
    try {
      BackendService.updateReservationStatus(id, newStatus);
      reload();
      if (selectedRes && selectedRes.id === id) {
        setSelectedRes({ ...selectedRes, status: newStatus });
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Reference,Guest Name,Phone,Email,Room,Check-In,Check-Out,Nights,Total,Status,PaymentStatus'];
    const rows = filtered.map((r) =>
      `"${r.referenceNumber}","${r.guest.fullName}","${r.guest.phone}","${r.guest.email}","${r.roomName}","${r.checkIn}","${r.checkOut}",${r.nights},${r.pricing.total},"${r.status}","${r.paymentStatus}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rajmahal_reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout activeTab="reservations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
              Guest Reservations Management
            </h1>
            <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mt-1">
              Filter by booking status, confirm pending reservations, or export booking vouchers.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] flex items-center gap-2 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Bookings CSV</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#A8B6AE] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search reference, guest, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-[#F4EFE6] dark:bg-[#192620] rounded-lg">
            {['all', 'pending', 'confirmed', 'demo_reservation', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs rounded font-medium whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? 'bg-white dark:bg-[#121C17] text-[#17382B] dark:text-[#C59F67] font-semibold shadow-xs'
                    : 'text-[#5E6963] dark:text-[#95A39B]'
                }`}
              >
                {st.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF9F4] dark:bg-[#192620] border-b border-[#E6DDCF] dark:border-[#25362E] text-[#5E6963] dark:text-[#95A39B]">
                <tr>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Reference / Room</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Primary Guest</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Dates</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Amount</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Status</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Payment</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DDCF]/40 dark:divide-[#25362E]/40">
                {filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-[#FBF9F4] dark:hover:bg-[#192620]">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-[#18201C] dark:text-[#F4EFE8] block">
                        {res.referenceNumber}
                      </span>
                      <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B]">
                        {res.roomName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="text-[#18201C] dark:text-[#F4EFE8] block">
                        {res.guest.fullName}
                      </strong>
                      <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B]">
                        {res.guest.phone}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6963] dark:text-[#95A39B]">
                      {res.checkIn} → {res.checkOut}
                      <span className="block text-[11px]">({res.nights} nights)</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#17382B] dark:text-[#C59F67]">
                      ₹{res.pricing.total.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
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
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] ${
                        res.paymentStatus === 'simulated_paid'
                          ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                          : 'text-[#8A6724] dark:text-[#E2C17D]'
                      }`}>
                        {res.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedRes(res)}
                        className="p-1 rounded text-[#17382B] dark:text-[#C59F67] hover:bg-[#F4EFE6] dark:hover:bg-[#1C2C24]"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 inline" />
                      </button>

                      {res.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(res.id, 'confirmed')}
                          className="px-2 py-1 rounded bg-emerald-700 text-white text-[11px] font-semibold"
                          title="Confirm Reservation"
                        >
                          Confirm
                        </button>
                      )}

                      {res.status !== 'cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(res.id, 'cancelled')}
                          className="px-2 py-1 rounded border border-red-300 text-red-600 text-[11px]"
                          title="Cancel Reservation"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: View Details */}
        {selectedRes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6DDCF] dark:border-[#25362E]">
                <h3 className="font-serif text-lg font-semibold text-[#17382B] dark:text-[#F4EFE8]">
                  Reservation Details ({selectedRes.referenceNumber})
                </h3>
                <button onClick={() => setSelectedRes(null)} className="text-[#A8B6AE] hover:text-[#18201C]">
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#FBF9F4] dark:bg-[#192620] rounded-lg">
                  <div>
                    <span className="text-[#5E6963] dark:text-[#95A39B] block">Guest:</span>
                    <strong>{selectedRes.guest.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[#5E6963] dark:text-[#95A39B] block">Phone:</span>
                    <strong>{selectedRes.guest.phone}</strong>
                  </div>
                  <div>
                    <span className="text-[#5E6963] dark:text-[#95A39B] block">Email:</span>
                    <span>{selectedRes.guest.email}</span>
                  </div>
                  <div>
                    <span className="text-[#5E6963] dark:text-[#95A39B] block">Room:</span>
                    <strong>{selectedRes.roomName}</strong>
                  </div>
                  <div>
                    <span className="text-[#5E6963] dark:text-[#95A39B] block">Dates:</span>
                    <span>{selectedRes.checkIn} to {selectedRes.checkOut} ({selectedRes.nights}n)</span>
                  </div>
                  <div>
                    <span className="text-[#5E6963] dark:text-[#95A39B] block">Total Amount:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400">
                      ₹{selectedRes.pricing.total.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {selectedRes.guest.specialRequests && (
                  <div>
                    <span className="text-[#5E6963] dark:text-[#95A39B] block mb-1">Guest Notes:</span>
                    <p className="p-2.5 rounded bg-[#FBF9F4] dark:bg-[#192620] text-[#18201C] dark:text-[#F4EFE8]">
                      {selectedRes.guest.specialRequests}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-3 border-t border-[#E6DDCF] dark:border-[#25362E]">
                <button
                  onClick={() => navigate(`/booking/${selectedRes.referenceNumber}`)}
                  className="text-xs text-[#17382B] dark:text-[#C59F67] hover:underline"
                >
                  Open Guest Voucher Page
                </button>
                <button
                  onClick={() => setSelectedRes(null)}
                  className="px-4 py-2 rounded text-xs bg-[#17382B] text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
