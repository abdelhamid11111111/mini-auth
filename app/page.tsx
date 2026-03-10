"use client";
import { useEffect, useState } from "react";
// import Link from "next/link"
import Navbar from "./components/Navbar";

export default function Home() {
  const [username, setUsername] = useState<null | string>(null);

  useEffect(() => {
    const fetchUsr = async () => {
      const res = await fetch("/api/me");
      const data = await res.json();
      setUsername(data.user.username);
    };
    fetchUsr();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-100">
        {username ? (
          <h1 className="text-4xl text-black font-bold">Welcome {username}</h1>
        ) : (
          <h1 className="text-4xl text-black font-bold">Welcome</h1>
        )}
        <p className="text-gray-500 mt-4">This is the home page</p>
      </div>
    </div>
  );
}
