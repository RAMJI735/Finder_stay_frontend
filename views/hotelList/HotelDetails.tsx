'use client';

import { useUser } from "@/utils/userHook";
import React from "react";
import RoomList from "../rooms/RoomList";

type Props = {
  hotel: any;
};

const HotelDetails = ({ hotel }: Props) => {
   
    const { data: user, isLoading, error } = useUser();

    console.log(user,"heyye")
  return (
    <div className="min-h-screen bg-BackgroundPaper text-slate-900">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* 🔥 HOTEL HEADER */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{hotel?.name}</h1>
          <p className="text-gray-600 text-lg">
            📍 {hotel?.city}, {hotel?.state}, {hotel?.country}
          </p>
        </div>

        {/* 🔥 IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {hotel?.images?.slice(0, 4).map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt="hotel"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          ))}
        </div>

        {/* 🔥 MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT - Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* DESCRIPTION */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">About this hotel</h2>
              <p className="text-gray-700 leading-relaxed">{hotel?.description}</p>
            </div>

            {/* AMENITIES */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {hotel?.amenities?.map((a: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* POLICIES */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Hotel Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">{hotel?.policySnapshot?.checkInTime || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">{hotel?.policySnapshot?.checkOutTime || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Early Check-in:</span>
                    <span className="font-medium">
                      {hotel?.policySnapshot?.earlyCheckInAllowed
                        ? `₹${hotel?.policySnapshot?.earlyCheckInCharge}`
                        : "Not allowed"}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Late Check-out:</span>
                    <span className="font-medium">
                      {hotel?.policySnapshot?.lateCheckOutAllowed
                        ? `₹${hotel?.policySnapshot?.lateCheckOutCharge}`
                        : "Not allowed"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Proof:</span>
                    <span className="font-medium">
                      {hotel?.policySnapshot?.idProofRequired ? "Required" : "Not required"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Local ID:</span>
                    <span className="font-medium">
                      {hotel?.policySnapshot?.localIdAllowed ? "Allowed" : "Not allowed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD - Booking Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">

              <h3 className="text-xl font-semibold mb-4 text-gray-900">Hotel Information</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">{hotel?.rating || "N/A"} / 5</span>
                </div>

                <div className="text-gray-600">
                  <p className="font-medium mb-1">Address</p>
                  <p>{hotel?.address}</p>
                </div>

                <div className="text-gray-600">
                  <p className="font-medium mb-1">Contact</p>
                  <p>📞 {hotel?.phone}</p>
                  <p>📧 {hotel?.email}</p>
                </div>

                {hotel?.website && (
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    🌐 Visit Website
                  </a>
                )}
              </div>

             <button
  disabled={!user}
  className="
    w-full 
    bg-blue-600 
    text-white 
    py-3 
    rounded-lg 
    font-semibold 
    transition-colors
    hover:bg-blue-700
    disabled:bg-gray-400 
    disabled:cursor-not-allowed
    disabled:hover:bg-gray-400
  "
  title="Login to Book"
>
  Book Now {!user && "for ₹" + (hotel?.policySnapshot?.earlyCheckInCharge || 2000) + "/night"}
</button>
            </div>
          </div>
        </div>
      </div>

<RoomList hotelid={hotel?._id} />

    </div>
  );
};

export default HotelDetails;