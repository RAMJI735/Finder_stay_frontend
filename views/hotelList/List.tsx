'use client'
import { fetchHotels } from '@/services/api/hotelApi'
import { useAuth } from '@/services/Context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";


export const PopularHotelList = () => {
    const router = useRouter();

//   const { hotelList, setHotelList } = useAuth();

  const { data: hotelList, isLoading, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
    select: (res) => res?.data,
   initialData: null,
//    staleTime: 1000 * 60 * 5, //  5 minutes
  });

  console.log(hotelList,"hotellist")

//   useEffect(() => {
//     if (hotelsData) setHotelList(hotelsData?.data);
//   }, [hotelsData]);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading hotels</p>;

  return (
    <div>
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Popular Hotels</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {hotelList?.map((hotel: any) => (
            <div
              key={hotel._id}
              className="bg-neutral-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
               onClick={() => router.push(`/hotel/${hotel._id}`)}
            >
              <img
                src={hotel.images?.[0] || "/hotel.jpg"}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{hotel.name}</h3>

                <p className="text-sm text-gray-500">
                  {hotel.city}, {hotel.state}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  ⭐ {hotel.rating}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-blue-600">
                    ₹{hotel.policySnapshot?.earlyCheckInCharge || 2000}/night
                  </span>

                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Get Details
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  )
}

export default PopularHotelList