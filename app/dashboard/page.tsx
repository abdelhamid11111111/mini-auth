"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface Users {
  id: number;
  username: string;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<Users[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    const load = () => {
      fetchUsers();
    };
    load();
  }, []);

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
              <span className="text-slate-800">{user.username}</span>
              <span className="text-slate-500">{user.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
