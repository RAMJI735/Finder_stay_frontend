// 'use client';

// import React from "react";

//   // export type hotelData = {
//   //   name: string;
//   //   address: string;
//   //   city: string;
//   //   state?: string;
//   //   country: string;
//   //   phone?: string;
//   //   email?: string;
//   //   website?: string;
//   //   description?: string;
//   //   amenities: string[];
//   //   rooms: string[]; // ObjectId as string
//   //   images: File[];
//   //   location: {
//   //     type: "Point";
//   //     coordinates: [number, number]; // [lng, lat]
//   //   };
//   //   policySnapshot: {
//   //     checkInTime: string;
//   //     checkOutTime: string;
//   //     earlyCheckInAllowed: boolean;
//   //     earlyCheckInCharge: number;
//   //     lateCheckOutAllowed: boolean;
//   //     lateCheckOutCharge: number;
//   //     idProofRequired: boolean;
//   //     localIdAllowed: boolean;
//   //   };
//   // };



// type hotelData = {
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   country?: string;
// };

// function AddHotelModel() {
//   const [hoteldata, setHotelData] = React.useState<hotelData>({
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//   });
//   return (
//     <div>AddHotelModel</div>
//   )
// }

// export default AddHotelModel



'use client';
import React, { useState } from "react";
import TextField from "../customText/CustomField";

export type hotelData = {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  amenities: string[];
  rooms: string[];
  images: File[];
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  policySnapshot: {
    checkInTime: string;
    checkOutTime: string;
    earlyCheckInAllowed: boolean;
    earlyCheckInCharge: number;
    lateCheckOutAllowed: boolean;
    lateCheckOutCharge: number;
    idProofRequired: boolean;
    localIdAllowed: boolean;
  };
};


type Props = {
  isOpen:boolean;
  setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const AddHotelModel = ({ isOpen, setIsOpen }: Props) => {
  const [form, setForm] = useState<hotelData>({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    amenities: [],
    rooms: [],
    images: [],
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    policySnapshot: {
      checkInTime: "",
      checkOutTime: "",
      earlyCheckInAllowed: true,
      earlyCheckInCharge: 0,
      lateCheckOutAllowed: true,
      lateCheckOutCharge: 0,
      idProofRequired: true,
      localIdAllowed: false,
    },
  });

  // 🔥 handle input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔥 nested policy change
  const handlePolicyChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      policySnapshot: {
        ...prev.policySnapshot,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  // 🔥 file upload
  const handleImages = (e: any) => {
    setForm((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  // 🔥 amenities add
  const handleAmenityAdd = (value: string) => {
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      amenities: [...prev.amenities, value],
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
  };


 if (!isOpen) return null;

 

return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    {/* Modal Box */}
    <div className="bg-gray-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg relative">

      {/* ❌ Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-black"
      >
        ✖
      </button>

      <h2 className="text-xl font-bold mb-4">Add Hotel</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC INFO */}
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Hotel Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter Hotel name" />
          <TextField label="Address" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
          <TextField label="City" name="city" value={form.city} onChange={handleChange} placeholder="City" />
          <TextField label="State" name="state" value={form.state} onChange={handleChange} placeholder="State" />
          <TextField label="Country" name="country" value={form.country} onChange={handleChange} placeholder="Country" />
          <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" />
          <TextField label="Website" name="website" value={form.website} onChange={handleChange} placeholder="Website" type="url" />
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* AMENITIES */}
        <div>
          <input
            type="text"
            placeholder="Add Amenity (press enter)"
            className="border p-2 rounded w-full"
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAmenityAdd(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {form.amenities.map((a, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* IMAGES */}
        <input type="file" multiple onChange={handleImages} />

        {/* LOCATION */}
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Longitude"
            type="number"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  coordinates: [Number(e.target.value), prev.location.coordinates[1]],
                },
              }))
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Latitude"
            type="number"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  coordinates: [prev.location.coordinates[0], Number(e.target.value)],
                },
              }))
            }
            className="border p-2 rounded"
          />
        </div>

        {/* POLICY */}
        <div className="space-y-2">
          <input name="checkInTime" placeholder="Check-in Time" onChange={handlePolicyChange} className="border p-2 rounded w-full" />
          <input name="checkOutTime" placeholder="Check-out Time" onChange={handlePolicyChange} className="border p-2 rounded w-full" />

          <label className="flex gap-2 items-center">
            <input type="checkbox" name="earlyCheckInAllowed" onChange={handlePolicyChange} />
            Early Check-in Allowed
          </label>

          <input name="earlyCheckInCharge" type="number" placeholder="Charge" onChange={handlePolicyChange} className="border p-2 rounded w-full" />

          <label className="flex gap-2 items-center">
            <input type="checkbox" name="lateCheckOutAllowed" onChange={handlePolicyChange} />
            Late Check-out Allowed
          </label>

          <input name="lateCheckOutCharge" type="number" placeholder="Charge" onChange={handlePolicyChange} className="border p-2 rounded w-full" />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Hotel
        </button>
      </form>
    </div>
  </div>
);
};

export default AddHotelModel;