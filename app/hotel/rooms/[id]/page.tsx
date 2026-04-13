'use client'
import { getRoomById } from '@/services/api/roomApi'
import RoomDetails from '@/views/rooms/RoomDetails'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'


const {id}= useParams<{id:string}>()

const {data, isLoading, error} = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoomById(id),
    retry: false,
    select: (res) => res?.data,
    enabled: !!id,
})

function page() {
  return (
    <div>
        <RoomDetails roomData={data} isLoading={isLoading} error={error} />
    </div>
  )
}

export default page