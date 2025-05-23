"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "./component/Header";
import getCurrentUser from "./utils/currentUser";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) setUser(userData);
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-yellow-200 text-black">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-8">
        <h1 className="text-4xl font-bold border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-[#f9f9f9]">
          Welcome to the Homepage! {user ? `Hello, ${user.username}` : "Please log in."}
        </h1>
      </main>
    </div>
  );
};

export default Homepage;