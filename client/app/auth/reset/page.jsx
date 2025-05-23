"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/app/utils/api";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token");
  const id = params.get("id");
  const router = useRouter();

  const [pwd, setPwd] = useState("");
  const [conf, setConf] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token || !id) router.replace("/auth/forgot-password");
  }, [token, id]);

  const submit = async (e) => {
    e.preventDefault();
    if (pwd !== conf) return setErr("Passwords do not match");
 
    const res = await api.put("/auth/reset", {
      token, id, newPassword: pwd
    });
  
    setDone(true);
    setTimeout(() => router.push("/auth/sign-in"), 2500);
  };

  if (done)
    return <p className="text-center mt-24">Password updated! Redirecting…</p>;

  return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-200 p-4">
      <div className="max-w-md w-full">
        {/* Title with decorative element */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 h-16 w-16 bg-orange-500 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-black flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V5a3 3 0 00-3-3H5a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3v-5a3 3 0 00-3-3h-3" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-black text-center">
            RESET PASSWORD
          </h1>
        </div>

        {/* Form container */}
        <form 
          onSubmit={submit} 
          className="rounded-lg bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black"
        >
          <div className="space-y-6">
            <div>
              <label 
                htmlFor="new-password" 
                className="mb-2 block text-lg font-bold text-black"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                required
                className="block w-full rounded-md border-4 border-black bg-pink-100 px-4 py-3 text-lg text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>

            <div>
              <label 
                htmlFor="confirm-password" 
                className="mb-2 block text-lg font-bold text-black"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                className="block w-full rounded-md border-4 border-black bg-blue-100 px-4 py-3 text-lg text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0"
                value={conf}
                onChange={(e) => setConf(e.target.value)}
              />
            </div>

            {err && (
              <div className="rounded-md bg-red-100 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-lg font-bold text-red-600">{err}</p>
              </div>
            )}

            <button
              type="submit"
              className="mt-8 w-full transform rounded-md bg-green-500 px-6 py-4 text-xl font-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1 hover:translate-x-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none"
            >
              UPDATE PASSWORD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
