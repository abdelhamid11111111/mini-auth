'use client'
import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const page = () => {
  return (
    <div className="text-black">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white rounded-xl shadow p-8 w-96">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Sign Up</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-slate-500">Username</label>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-500">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-500">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-500">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <button className="bg-slate-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors mt-2">
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

export default page;
