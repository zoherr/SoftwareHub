"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getCurrentUser from "../../utils/currentUser";
import api from "@/app/utils/api";
export const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) setUser(userData);
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-[#f3f3f3] border-b-2 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      <Link
        href="/"
        className="text-2xl font-extrabold  px-3  rounded-xl hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
      >
        SoftwareHub
      </Link>
      <div className="flex items-center gap-6 font-medium text-lg">
        <Link href="/article" className="hover:underline underline-offset-4">
          Article
        </Link>
        <Link href="/services" className="hover:underline underline-offset-4">
          Community
        </Link>
        <Link href="/contact" className="hover:underline underline-offset-4">
          Courses
        </Link>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="border-2 border-black px-4 py-2 rounded-xl bg-red-300 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-red-200 active:translate-x-[2px] active:translate-y-[2px] transition-transform font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/auth/sign-in"
          className="border-2 border-black px-4 py-2 rounded-xl bg-green-300 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-green-200 active:translate-x-[2px] active:translate-y-[2px] transition-transform font-semibold"
        >
          Login
        </Link>
      )}
    </nav>
  );
};
