'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import navItems  from "./navItems.json";
import LoginModal from "../auth/Loginmodal";
import SignUpModal from "../auth/SignUpModal";
import { useAuth } from "@/services/Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logoutAPI, profileAPI } from "@/services/api/auth";
import toast from "react-hot-toast";
import AddHotelModel from "../hotelList/AddHotelModel";

function Navbar() {

  const [openHotelModal, setOpenHotelModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const [signupOpen, setSignupOpen] = useState<boolean>(false);
      const {user, setUser} = useAuth();
      console.log(user,"hehyeuhd")


// const { data,isLoading ,isFetched } = useQuery({
//   queryKey: ["profile"],
//   queryFn: profileAPI,
//   select: (res) => res?.user,
//   //  initialData: null,
//   //  staleTime: 1000 * 60 * 5, // 5 minutes
//      refetchOnMount: true,
  
// });


const { data, isFetched } = useQuery({
  queryKey: ["profile"],
  queryFn: profileAPI,
  select: (res) => res?.user,
  staleTime: 1000 * 60 * 5, // 🔥 important,
  retry: false,
  // ❌ remove refetchOnMount
});

console.log(data,"heyeyeyey")

const {error,data:LogoutData,mutate, isPending} = useMutation({
  mutationFn: logoutAPI,
  onSuccess: (data) => {
    console.log(data)
    setUser(null);
    queryClient.setQueryData(["profile"], null);
    toast.success("Logged out successfully!");
  }
});


const SubmitLogout= async()=>{
mutate();
}

  return (
    <nav className="w-full fixed z-60 bg-BackgroundPaper shadow-md px-6 py-4 flex items-center justify-between">
      
      <h1 className="text-xl font-bold text-blue-600">
        StayFinder
      </h1>

      <div className="hidden md:flex gap-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <SignUpModal signupOpen={signupOpen} setSignupOpen={setSignupOpen} />
      <AddHotelModel isOpen={openHotelModal} setIsOpen={setOpenHotelModal} />
      <div className="flex items-center gap-3">
  {!isFetched ? null : data?.username ? (
    <>
      <span className="text-gray-700">
        Hello, {data.username}
      </span>

      <button
        onClick={SubmitLogout}
        className="px-4 py-1 border rounded-lg hover:bg-gray-600 transition"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-lg border border-blue-600 bg-white text-blue-600 font-medium hover:bg-blue-50 transition"
      >
        Login
      </button>

      <button
        onClick={() => setSignupOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Signup
      </button>
    </>
  )}

{data?.type === "admin" && (
  <button className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition" onClick={()=>setOpenHotelModal(true)}>
    Host Your Home
  </button>
)}
</div>
    </nav>
  );
}

export default Navbar;