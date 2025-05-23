"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import setUser from "../../utils/setUser";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/auth/register", { username, fullName, email, password });
      setUser();
      router.push("/");
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
   <div className="flex min-h-screen bg-lime-200 text-black font-sans">
  <div className="m-auto w-full max-w-md p-8">
    {/* Title with decorative element */}
    <div className="mb-6 flex flex-col items-center">
      {/* <div className="mb-4 h-16 w-16 rounded-full bg-cyan-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div> */}
      <h2 className="text-center text-3xl font-black tracking-tight">REGISTER</h2>
    </div>

    {/* Form container */}
    <div className="bg-white p-6 border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block mb-2 text-lg font-bold" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className="w-full border-4 border-black rounded-md bg-red-100 px-4 py-2 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-lg font-bold" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full border-4 border-black rounded-md bg-yellow-100 px-4 py-2 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-lg font-bold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border-4 border-black rounded-md bg-blue-100 px-4 py-2 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-lg font-bold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full border-4 border-black rounded-md bg-green-100 px-4 py-2 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full mt-8 transform rounded-md bg-purple-500 px-6 py-2 text-xl font-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1 hover:translate-x-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "SIGNING UP..." : "SIGN UP"}
        </button>
      </form>

      <div className="mt-12 flex flex-col items-center space-y-4">
        <div className="h-1 w-16 bg-black"></div>
        <p className="text-center text-lg font-bold">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-blue-600 underline hover:text-blue-500">
            LOG IN
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

export default SignUp;
