"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  
  const { data: session, isPending } = useSession();
  const router = useRouter()


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
        {isPending ? null : session?.user && (
          <Link
            href="/profile"
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Profile
          </Link>
        )}
      </div>

      {/* Right - login button */}

      <div className="flex-1 flex justify-end">
        
          <div className="w-24 h-9" />
       {isPending ? null :isPending ? null :  session?.user ? (
          <button 
          onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
          className=" text-black border-b-black font-medium bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300">
            Log out
          </button>
        ) : (
          <Link href="/sign-in">
            <button
              className="border border-white text-white  bg-neutral-800 font-medium px-6 py-2 rounded-md hover:bg-neutral-600"
            >
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
