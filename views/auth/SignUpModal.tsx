import { SignUpFn } from '@/services/api/auth';
import { useMutation } from '@tanstack/react-query';
import { sign } from 'crypto';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

type Props ={
    signupOpen:boolean;
    setSignupOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

type SignupForm = {
    username:string;
    email:string;
    password:string;
    type:"user" | "admin";
}

const SignUpModal: React.FC<Props> = ({ signupOpen, setSignupOpen }) => {

    const [data, setData] = React.useState<SignupForm>({
        username:"",
        email:"",
        password:"",
        type:"user"
    });
    

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
        ...prev,
        [name as keyof SignupForm]: value
    }));
}


const {mutate, isPending, error, data: signupResponse } = useMutation({
mutationFn: SignUpFn, // ❗ signupAPI function define karna padega jisme API call hogi
onSuccess: (data) => {
    console.log("Signup successful", data);
    setSignupOpen(false); // modal band kar do signup ke baad
    toast.success("Signup successful! Please login to continue.");
},
onError: (error) => {
    console.error("Signup failed:", error);
    toast.error("Signup failed. Please try again.");
}

});

const handleSubmit = () => {
    mutate(data);
}

useEffect(() => {
    // ❗ jab modal open ho to form reset kar do
    if (signupOpen) {
        setData({
            username: "",
            email: "",
            password: "",
            type: "user"
        });
    }
}, [signupOpen]);

    if (!signupOpen) return null;
  return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg">

        <button
          className="mb-3 text-right w-full"
          onClick={() => setSignupOpen(false)}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        {/* 👤 Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* 📧 Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* 🔒 Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* 👥 Role */}
        <select
          name="type"
          value={data.type}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded bg-background"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* 🚀 Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Signup
        </button>

      </div>
    </div>
  )
}

export default SignUpModal