import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { BackendService } from '../../services/backend';
import { EventEnquiry } from '../../types';
import { PartyPopper, Phone, Mail, Calendar, Users, Edit3, Check } from 'lucide-react';

export function AdminEventsPage() {
  const [events, setEvents] = useState<EventEnquiry[]>(BackendService.getEventEnquiries());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState<EventEnquiry['status']>('new');

  const reload = () => {
    setEvents(BackendService.getEventEnquiries());
  };

  const startEdit = (e: EventEnquiry) => {
    setEditingId(e.id);
    setEditNotes(e.notes || '');
    setEditStatus(e.status);
  };

  const handleSave = (id: string) => {
    BackendService.updateEventEnquiryStatus(id, editStatus, editNotes);
    reload();
    setEditingId(null);
  };

  return (
    <AdminLayout activeTab="events">
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
            Weddings &amp; Banquet Enquiries
          </h1>
          <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mt-1">
            Review incoming event requests, log follow-up notes, and track site visit schedules.
          </p>
        </div>

        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-[#121C17] rounded-xl border border-[#E6DDCF] dark:border-[#25362E]">
              <p className="text-xs text-[#5E6963] dark:text-[#95A39B]">No event enquiries registered yet.</p>
            </div>
          ) : (
            events.map((event) => {
              const isEditing = editingId === event.id;

              return (
                <div
                  key={event.id}
                  className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E6DDCF]/50 dark:border-[#25362E]/50">
                    <div>
                      <span className="font-mono text-[10px] text-[#A8B6AE]">
                        REF: {event.referenceNumber}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[#18201C] dark:text-[#F4EFE8]">
                        {event.fullName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2.5 py-1 rounded font-semibold uppercase tracking-wider ${
                        event.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : event.status === 'site_visit'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'
                          : event.status === 'contacted'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                          : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                      }`}>
                        {event.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-[#5E6963] dark:text-[#95A39B] block">Event Type:</span>
                      <strong className="text-[#18201C] dark:text-[#F4EFE8]">{event.eventType}</strong>
                    </div>
                    <div>
                      <span className="text-[#5E6963] dark:text-[#95A39B] block">Preferred Date:</span>
                      <strong className="text-[#18201C] dark:text-[#F4EFE8]">{event.preferredDate}</strong>
                    </div>
                    <div>
                      <span className="text-[#5E6963] dark:text-[#95A39B] block">Guest Count:</span>
                      <strong className="text-[#18201C] dark:text-[#F4EFE8]">{event.guestCount} Guests</strong>
                    </div>
                    <div>
                      <span className="text-[#5E6963] dark:text-[#95A39B] block">Preferred Venue:</span>
                      <strong className="text-[#18201C] dark:text-[#F4EFE8]">{event.preferredVenue}</strong>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="flex flex-wrap gap-4 text-xs text-[#5E6963] dark:text-[#95A39B] pt-1">
                    <a href={`tel:${event.phone}`} className="flex items-center gap-1.5 hover:underline">
                      <Phone className="w-3.5 h-3.5 text-[#B88E52]" />
                      <span>{event.phone}</span>
                    </a>
                    <a href={`mailto:${event.email}`} className="flex items-center gap-1.5 hover:underline">
                      <Mail className="w-3.5 h-3.5 text-[#B88E52]" />
                      <span>{event.email}</span>
                    </a>
                    {event.budgetRange && (
                      <span>Budget: {event.budgetRange}</span>
                    )}
                  </div>

                  {event.additionalRequirements && (
                    <div className="p-3 rounded-lg bg-[#FBF9F4] dark:bg-[#192620] text-xs text-[#18201C] dark:text-[#F4EFE8]">
                      <strong>Client Requirements:</strong> {event.additionalRequirements}
                    </div>
                  )}

                  {/* Staff Notes section */}
                  {isEditing ? (
                    <div className="pt-2 border-t border-[#E6DDCF]/50 dark:border-[#25362E]/50 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-[#5E6963] dark:text-[#95A39B] mb-1">
                            Status
                          </label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value as any)}
                            className="w-full px-3 py-1.5 rounded border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                          >
                            <option value="new">New Enquiry</option>
                            <option value="contacted">Contacted / Call Completed</option>
                            <option value="site_visit">Site Visit Scheduled</option>
                            <option value="confirmed">Confirmed / Contract Signed</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-[#5E6963] dark:text-[#95A39B] mb-1">
                            Staff Follow-up Notes
                          </label>
                          <input
                            type="text"
                            placeholder="Add coordinator notes..."
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            className="w-full px-3 py-1.5 rounded border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 rounded text-xs border border-[#E6DDCF]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave(event.id)}
                          className="px-4 py-1.5 rounded text-xs font-semibold uppercase bg-[#17382B] text-white"
                        >
                          Save Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-[#E6DDCF]/50 dark:border-[#25362E]/50 flex items-center justify-between text-xs">
                      <div className="text-[#5E6963] dark:text-[#95A39B]">
                        {event.notes ? (
                          <span>Staff Note: <em>{event.notes}</em></span>
                        ) : (
                          <span className="italic">No follow-up notes recorded.</span>
                        )}
                      </div>
                      <button
                        onClick={() => startEdit(event)}
                        className="text-[#17382B] dark:text-[#C59F67] hover:underline font-medium"
                      >
                        Edit Notes / Status
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
