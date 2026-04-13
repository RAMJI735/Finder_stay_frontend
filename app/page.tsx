import HomeContent from "./home/page";
import NavbarComponent from "../views/navbar/navbar";

import { Search, MapPin, Calendar, Users } from "lucide-react";
import LoginModal from "@/views/auth/Loginmodal";
import PopularHotelList from "@/views/hotelList/List";

export default function Home() {



  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">

{/* <LoginModal/> */}

      {/* <nav>
        <NavbarComponent />
      </nav> */}

      {/* 🔥 Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-[url('/hotel.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Book hotels at the best price with zero hassle
          </p>

          {/* 🔍 Search Box */}
          <div className="bg-white text-black rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">

            <div className="flex items-center gap-2 border p-2 rounded-lg flex-1">
              <MapPin size={18} />
              <input
                type="text"
                placeholder="Where are you going?"
                className="outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-2 border p-2 rounded-lg flex-1">
              <Calendar size={18} />
              <input type="date" className="outline-none w-full" />
            </div>

            <div className="flex items-center gap-2 border p-2 rounded-lg flex-1">
              <Users size={18} />
              <input
                type="number"
                placeholder="Guests"
                className="outline-none w-full"
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </section>

{/* 🏨 Hotel List */}
      <PopularHotelList />

      {/* 🌍 Why Choose Us */}
      <section className="py-12 px-6 bg-gray-100 dark:bg-zinc-900">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-lg">Best Prices</h3>
            <p className="text-gray-500">
              Get unbeatable deals on hotel bookings
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Instant Booking</h3>
            <p className="text-gray-500">
              Book your stay instantly without hassle
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">24/7 Support</h3>
            <p className="text-gray-500">
              We are here to help anytime
            </p>
          </div>
        </div>
      </section>

      {/* 📩 Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <p>© 2026 Hotel Booking. All rights reserved.</p>
      </footer>
    </div>
  );
}
