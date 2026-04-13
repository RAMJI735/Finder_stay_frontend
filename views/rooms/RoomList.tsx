'use client';

import { fetchRoomByHotelId } from '@/services/api/roomApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';

type Props = {
  hotelid: string;
};

function RoomList({ hotelid }: Props) {

    const router= useRouter()
  const { data: rooms, isLoading, error } = useQuery({
    queryKey: ["rooms", hotelid],
    queryFn: () => fetchRoomByHotelId(hotelid),
    enabled: !!hotelid,
    select: (res) => res?.data, // Assuming the room data is in res.data
  });

  if (isLoading) return <p>Loading rooms...</p>;
  if (error) return <p>Error loading rooms</p>;
  if (!rooms?.length) return <p>No rooms available</p>;

  return (
    <div className="m-10">
      <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room: any) => (
          <div
            key={room._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition h-full flex flex-col gap-4"
            onClick={() => router.push(`/hotel/rooms/${room._id}`)}  
          >
            {/* 🖼️ IMAGE */}
            <img
              src={room.images?.[0]}
              alt={room.type}
              className="w-full h-48 object-cover rounded-lg"
            />

            {/* 📄 DETAILS */}
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold">
                {room.type} Room (#{room.number})
              </h3>

              <p className="text-sm text-gray-500">
                👤 {room.capacity?.adults} Adults, {room.capacity?.children} Children
              </p>

              <p className="text-gray-600 text-sm">
                {room.description}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mt-2">
                {room.amenities?.map((a: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-2 py-1 rounded-full text-xs"
                  >
                    {a}
                  </span>
                ))}
              </div>

              {/* Availability */}
              <p
                className={`text-sm font-medium ${
                  room.isAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {room.isAvailable ? "Available" : "Not Available"}
              </p>
            </div>

            {/* 💰 PRICE + BUTTON */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-xl font-bold text-blue-600">
                ₹{room.price}/night
              </p>

              <button
                disabled={!room.isAvailable}
                className="
                  bg-blue-600 
                  text-white 
                  px-4 
                  py-2 
                  rounded-lg
                  hover:bg-blue-700
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                "
              >
                Select Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;