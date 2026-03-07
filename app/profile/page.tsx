'use client'
import React from "react";
import Navbar from "../components/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-100">
        <div className="bg-white rounded-xl shadow p-8 w-80">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h1>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-sm text-slate-500">Username</span>
              <p className="text-slate-900 font-medium">John Doe</p>
            </div>
            <div>
              <span className="text-sm text-slate-500">Email</span>
              <p className="text-slate-900 font-medium">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
