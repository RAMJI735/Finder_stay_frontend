'use client';
import { LoginFn } from '@/services/api/auth';
import { useAuth } from '@/services/Context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// ✅ Props type define
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type LoginForm = {
  username: string;
  password: string;
};




const LoginModal = ({ isOpen, setIsOpen }: Props) => {
  const { user, setUser } = useAuth();
  const [data, setData] = useState<LoginForm>({
    username: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData(prev => ({ ...prev, [name as keyof LoginForm]: value }));
  };



  useEffect(() => {
    // ❗ jab modal open ho to form reset kar do
    if (isOpen) {
      setData({
        username: "",
        password: ""
      });
    }
  }, [isOpen]);


  const handleSubmit = () => {
    mutate(data);
  };

  const queryClient = useQueryClient();
  const { mutate, isPending, error, data: loginResponse } = useMutation({
    mutationFn: LoginFn,

    // onSuccess: (data) => {
    //   console.log("Login success", data);
    //   setUser(data?.user); // user context me username set kar do
    //   toast.success("Login successful! Welcome back.");
    //   setIsOpen(false); // modal band kar do login ke baad


    // },
    onSuccess: (data) => {
      const user = data?.user;
      // 🔥 instant UI update (NO delay)
      queryClient.setQueryData(["profile"], { user });
      toast.success("Login successful! Welcome back.");
      setIsOpen(false);
    },

    onError: (error: any) => {
      console.log("Error:", error?.response?.data?.message);
    }
  });



  // ❗ modal band ho to render hi mat karo
  if (!isOpen) return null;

  return (


    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-background p-6 rounded-lg w-80">

        {/* ❌ Close */}
        <button
          className="mb-3 text-right w-full"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        <h2 className="text-lg font-bold mb-4">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleInputChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleInputChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={handleSubmit} disabled={isPending}>
          Login
        </button>

      </div>
    </div>
  );
};

export default LoginModal;