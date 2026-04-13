'use client';
import React, { createContext, useContext, useState } from "react";

type User = {
  username: string;
};

type Hotel = {
  id: number;
  name: string;
  location: string;
  price: number;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  hotelList: Hotel[];
  setHotelList: React.Dispatch<React.SetStateAction<Hotel[]>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hotelList, setHotelList] = useState<Hotel[]>([]);

  return (
    <AuthContext.Provider value={{ user, setUser, hotelList, setHotelList }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};