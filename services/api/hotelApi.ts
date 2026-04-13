import { api } from "./auth";

export const fetchHotels = async () => {
  try {
    const response = await api.get("/hotel/hotels");
    return response.data; // Assuming the hotel data is in the response data
    } catch (error) {
    console.error("Failed to fetch hotels:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const fetchHotelById = async (id: string) => {
    try {
        const response = await api.get(`/hotel/hotels/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch hotel by ID:", error);
        throw error;
    }
};