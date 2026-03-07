'use client'
import React from "react";
import Navbar from "../components/Navbar";



const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  { id: 4, name: "Alice Brown", email: "alice@example.com" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com" },
];

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">All Users</h1>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          {/* Table Header */}
          <div className="grid grid-cols-2 bg-slate-100 px-6 py-3">
            <span className="font-semibold text-slate-600">Name</span>
            <span className="font-semibold text-slate-600">Email</span>
          </div>
          {/* Table Rows */}
          {users.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-2 px-6 py-4 border-t border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span className="text-slate-800">{user.name}</span>
              <span className="text-slate-500">{user.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
