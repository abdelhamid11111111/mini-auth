'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Profile = () => {

  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<null | string>(null)

  useEffect(() => {
    const fetchUsr = async () => {
      const res = await fetch('/api/me')
      const data = await res.json()
      setUsername(data.user.username)
      setEmail(data.user.email)
    }
    fetchUsr()
   }, [])


  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-100">
        <div className="bg-white rounded-xl shadow p-8 w-80">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h1>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-sm text-slate-500">Username</span>
              <p className="text-slate-900 font-medium">{username}</p>
            </div>
            <div>
              <span className="text-sm text-slate-500">Email</span>
              <p className="text-slate-900 font-medium">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
