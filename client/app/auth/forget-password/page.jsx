"use client";

import React, { useState } from "react";
import api from "../../utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const res = await api.put("/auth/forgot-password", { email });
    
    console.log("data" + res.data);
    setMessage(res.message);
    if (res.success === true) {
     setMessage("Check your email for the reset link");
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 2000);
    }
  } catch (err) {
    setMessage(err.response?.data?.message || "Error updating password");
  } finally {
    setIsLoading(false);
  }
};


  return (
     <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3] text-black font-sans p-4">
      <div className="w-full max-w-sm border-2 border-black rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-white p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center tracking-wide">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black bg-[#e8e8e8] placeholder:text-gray-600"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl border-2 border-black bg-yellow-300 hover:bg-yellow-200 active:translate-x-[2px] active:translate-y-[2px] transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,1)] py-3 font-semibold"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm font-medium text-gray-800">
            {message}
          </p>
        )}

        <p className="text-center text-sm">
          Remembered your password?{' '}
          <Link
            href="/auth/sign-in"
            className="underline decoration-2 underline-offset-4 hover:text-blue-600"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
