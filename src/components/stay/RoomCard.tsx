import React from 'react';
import { RoomType } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Users, Bed, Maximize2, Check, ArrowRight } from 'lucide-react';

interface RoomCardProps {
  room: RoomType;
  checkIn?: string;
  checkOut?: string;
}

export function RoomCard({ room, checkIn, checkOut }: RoomCardProps) {
  const { navigate } = useRouter();

  const handleReserve = () => {
    navigate('/booking', {
      roomId: room.id,
      ...(checkIn && { checkIn }),
      ...(checkOut && { checkOut }),
    });
  };

  const handleViewDetails = () => {
    navigate(`/stay/${room.slug}`);
  };

  return (
    <div className="bg-white dark:bg-[#121C17] border border-[#E6DDCF] dark:border-[#25362E] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={handleViewDetails}>
        <ImageWithFallback
          src={room.images[0]}
          alt={room.name}
          fallbackTitle={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 bg-[#17382B]/85 text-[#FDFBF7] text-[11px] font-medium px-2.5 py-1 rounded backdrop-blur-sm tracking-wide">
          {room.category}
        </div>
        {room.isPopular && (
          <div className="absolute top-3 right-3 bg-[#B88E52] text-white text-[11px] font-medium px-2.5 py-1 rounded shadow-sm tracking-wide">
            Guest Favorite
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-1 sm:gap-2 mb-2">
            <h3
              onClick={handleViewDetails}
              className="font-serif text-lg sm:text-xl font-semibold text-[#18201C] dark:text-[#F4EFE8] group-hover:text-[#B88E52] dark:group-hover:text-[#C59F67] transition-colors cursor-pointer"
            >
              {room.name}
            </h3>
            <div className="xs:text-right shrink-0">
              <span className="font-serif text-lg font-bold text-[#17382B] dark:text-[#C59F67]">
                ₹{room.basePrice.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#5E6963] dark:text-[#95A39B] block -mt-0.5">
                / night (Demo Rate)
              </span>
            </div>
          </div>

          <p className="text-xs text-[#5E6963] dark:text-[#95A39B] line-clamp-2 leading-relaxed mb-4">
            {room.description}
          </p>

          {/* Quick Specifications */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 text-xs text-[#4A5550] dark:text-[#A7B5AD] py-2.5 border-y border-[#E6DDCF]/60 dark:border-[#25362E]/60 mb-4">
            <div className="flex items-center gap-1.5 shrink-0">
              <Users className="w-3.5 h-3.5 text-[#B88E52]" />
              <span>Up to {room.occupancy.maxGuests} guests</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <Bed className="w-3.5 h-3.5 text-[#B88E52] shrink-0" />
              <span className="truncate max-w-[140px]">{room.bedConfiguration}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Maximize2 className="w-3.5 h-3.5 text-[#B88E52]" />
              <span>{room.sizeSqFt} sq.ft</span>
            </div>
          </div>

          {/* Amenities checklist */}
          <div className="grid grid-cols-2 gap-1.5 mb-5 text-[11px] text-[#5E6963] dark:text-[#95A39B]">
            {room.amenities.slice(0, 4).map((amenity, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#B88E52] shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E6DDCF]/40 dark:border-[#25362E]/40">
          <button
            onClick={handleViewDetails}
            className="py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase border border-[#E6DDCF] dark:border-[#25362E] text-[#17382B] dark:text-[#F4EFE8] hover:bg-[#F4EFE6] dark:hover:bg-[#192620] transition-colors text-center"
          >
            Details
          </button>
          <button
            onClick={handleReserve}
            className="py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase bg-[#17382B] text-[#FAF7F2] hover:bg-[#11281F] dark:bg-[#C59F67] dark:text-[#0D1612] dark:hover:bg-[#D8B57F] transition-colors text-center flex items-center justify-center gap-1"
          >
            <span>Reserve</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
