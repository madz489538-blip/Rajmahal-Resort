import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { BackendService } from '../../services/backend';
import { RoomType } from '../../types';
import { BedDouble, Edit2, Check, X, Plus, Sparkles } from 'lucide-react';

export function AdminRoomsPage() {
  const [rooms, setRooms] = useState<RoomType[]>(BackendService.getRooms());
  const [editingRoom, setEditingRoom] = useState<RoomType | null>(null);

  // Edit fields
  const [basePrice, setBasePrice] = useState(0);
  const [availableUnits, setAvailableUnits] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [isPopular, setIsPopular] = useState(false);

  const startEdit = (room: RoomType) => {
    setEditingRoom(room);
    setBasePrice(room.basePrice);
    setAvailableUnits(room.availableUnits);
    setMaxGuests(room.occupancy.maxGuests);
    setIsPopular(!!room.isPopular);
  };

  const handleSave = () => {
    if (!editingRoom) return;
    try {
      const updated = BackendService.updateRoom(editingRoom.id, {
        basePrice,
        availableUnits,
        occupancy: {
          ...editingRoom.occupancy,
          maxGuests,
        },
        isPopular,
      });

      setRooms(BackendService.getRooms());
      setEditingRoom(null);
    } catch (e: any) {
      alert(e.message || 'Error updating room');
    }
  };

  return (
    <AdminLayout activeTab="rooms">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#17382B] dark:text-[#F4EFE8]">
              Room Inventory &amp; Tariff Management
            </h1>
            <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mt-1">
              Configure room rates, total physical inventory, guest occupancy limits, and featured status.
            </p>
          </div>
        </div>

        {/* Rooms Table */}
        <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF9F4] dark:bg-[#192620] border-b border-[#E6DDCF] dark:border-[#25362E] text-[#5E6963] dark:text-[#95A39B]">
                <tr>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Room Category</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Category</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Base Rate (₹/n)</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Physical Units</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Max Capacity</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Badge</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DDCF]/40 dark:divide-[#25362E]/40">
                {rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-[#FBF9F4] dark:hover:bg-[#192620]">
                    <td className="py-4 px-4">
                      <strong className="font-serif text-sm text-[#18201C] dark:text-[#F4EFE8] block">
                        {room.name}
                      </strong>
                      <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B]">
                        {room.bedConfiguration} · {room.sizeSqFt} sq.ft
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#5E6963] dark:text-[#95A39B]">
                      {room.category}
                    </td>
                    <td className="py-4 px-4 font-serif font-bold text-sm text-[#17382B] dark:text-[#C59F67]">
                      ₹{room.basePrice.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 font-medium text-[#18201C] dark:text-[#F4EFE8]">
                      {room.availableUnits} Keys
                    </td>
                    <td className="py-4 px-4 text-[#5E6963] dark:text-[#95A39B]">
                      {room.occupancy.maxGuests} Guests
                    </td>
                    <td className="py-4 px-4">
                      {room.isPopular ? (
                        <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 px-2 py-0.5 rounded font-medium">
                          Guest Favorite
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#A8B6AE]">Standard</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => startEdit(room)}
                        className="p-1.5 rounded hover:bg-[#F4EFE6] dark:hover:bg-[#1C2C24] text-[#17382B] dark:text-[#C59F67] inline-flex items-center gap-1 text-xs font-medium"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Room Modal */}
        {editingRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6DDCF] dark:border-[#25362E]">
                <h3 className="font-serif text-lg font-semibold text-[#17382B] dark:text-[#F4EFE8]">
                  Edit {editingRoom.name}
                </h3>
                <button
                  onClick={() => setEditingRoom(null)}
                  className="text-[#5E6963] hover:text-[#18201C] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1">
                    Nightly Base Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1">
                      Available Room Inventory
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={availableUnits}
                      onChange={(e) => setAvailableUnits(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E6963] dark:text-[#95A39B] mb-1">
                      Max Guest Occupancy
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={maxGuests}
                      onChange={(e) => setMaxGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-[#E6DDCF] dark:border-[#25362E] bg-[#FBF9F4] dark:bg-[#192620]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="rounded border-[#E6DDCF] text-[#17382B]"
                    />
                    <span className="text-xs text-[#18201C] dark:text-[#F4EFE8]">
                      Mark as "Guest Favorite" badge
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E6DDCF] dark:border-[#25362E]">
                <button
                  type="button"
                  onClick={() => setEditingRoom(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium border border-[#E6DDCF] dark:border-[#25362E]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#17382B] text-white hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
