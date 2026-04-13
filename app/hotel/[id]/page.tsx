'use client';
import { useQuery } from '@tanstack/react-query';
import HotelDetails from '@/views/hotelList/HotelDetails'
import { useParams } from 'next/navigation';
import React from 'react'
import { fetchHotelById } from '@/services/api/hotelApi';
function page() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelById(id),
    retry: false,
    select: (res) => res?.data,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading hotel</p>;
  if (!data) return <p>No hotel found</p>;

  return <HotelDetails hotel={data} />;
}

export default page