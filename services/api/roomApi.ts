import { api } from "./auth";

export const fetchRooms = async () => {
    try {
        const response = await api.get("/room/listings");
        return response.data; // Assuming the room data is in the response data
    }
    catch (error) {
        console.error("Failed to fetch rooms:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};


export const fetchRoomByHotelId = async (hotelId: string) => {
    try {
        const response = await api.get(`/room/listings/${hotelId}`);
        return response.data; // Assuming the room data is in the response data
    }
    catch (error) {
        console.error(`Failed to fetch rooms for hotel ID ${hotelId}:`, error);
        throw error; // Rethrow the error to be handled by the caller
    }
}


export const getRoomById = async (roomId: string) => {
    try {
        const response = await api.get(`/room/listing/${roomId}`);
        return response.data; // Assuming the room data is in the response data
    }
    catch (error) {
        console.error(`Failed to fetch room with ID ${roomId}:`, error);
        throw error; // Rethrow the error to be handled by the caller
    }   
}