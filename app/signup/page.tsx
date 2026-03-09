"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";



const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [error, setError] = useState<null | string>(null);
  const router = useRouter()

  const handleSignUp = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( form ),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else{
        router.push('/')
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div className="text-black">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white rounded-xl shadow p-8 w-96">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Sign Up</h1>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-slate-500">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="johndoe"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-500">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-500">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-500">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPass}
                onChange={(e) =>
                  setForm({ ...form, confirmPass: e.target.value })
                }
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <button
              onClick={handleSignUp}
              className="bg-slate-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors mt-2"
            >
              Sign Up
            </button>
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-slate-900 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
