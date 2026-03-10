"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/");
      } else {
        setError(data.error);
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
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Login</h1>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-4">
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
            <button
              onClick={handleLogin}
              className="bg-slate-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors mt-2"
            >
              Login
            </button>
            <p className="text-center text-sm text-slate-500">
              Do not have an account?{" "}
              <Link
                href="/signup"
                className="text-slate-900 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
