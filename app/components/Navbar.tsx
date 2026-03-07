'use client'
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center px-8 py-4 bg-white shadow sticky top-0 z-50">
      {/* Left - empty to balance */}
      <div className="flex-1" />

      {/* Center - links */}
      <div className="flex gap-8">
        <Link
          href="/"
          className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/profile"
          className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
        >
          Profile
        </Link>
      </div>

      {/* Right - login button */}
      <div className="flex-1 flex justify-end">
        <Link href='/login'>
        <button className="bg-slate-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors">
          Login
        </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
