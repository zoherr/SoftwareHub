"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import setUser from "../../utils/setUser";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/auth/login", { identifier: email, password });
      setUser();
      router.push("/");
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-yellow-200 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-3xl font-black tracking-tight text-black">
            SIGN IN
          </h2>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-lg font-bold text-black"
              >
                Email or Username
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required
                autoComplete="email"
                className="block w-full rounded-md border-4 border-black bg-blue-100 px-4 py-2 text-lg text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="mb-2 block text-lg font-bold text-black"
                >
                  Password
                </label>
                <div className="text-sm">
                  <span className="font-bold text-black">
                    Forgot password?{" "}
                    <Link
                      href="/auth/forget-password"
                      className="underline text-red-600 hover:text-red-500"
                    >
                      Reset it
                    </Link>
                  </span>
                </div>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-4 border-black bg-green-100 px-4 py-2 text-lg text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="mt-8 w-full transform rounded-md bg-purple-600 px-6 py-4 text-xl font-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1 hover:translate-x-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none disabled:opacity-70"
            >
              {isLoading ? "LOADING..." : "LOG IN"}
            </button>
          </form>

          <div className="mt-12 flex flex-col items-center space-y-4">
            <div className="h-1 w-16 bg-black"></div>
            <p className="text-center text-lg font-bold">
              Not a member yet?{" "}
              <Link
                href="/auth/sign-up"
                className="text-blue-600 underline hover:text-blue-500"
              >
                SIGN UP NOW
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default LoginPage;
