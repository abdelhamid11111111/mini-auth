'use client'
// import Link from "next/link"
import Navbar from "./components/Navbar"


export default function Home() {
  return (
  <div>
    {/* Navbar */}
    <Navbar/>
   

    {/* Content */}
    <div className="flex flex-col items-center justify-center h-100">
      <h1 className="text-4xl text-black font-bold">Welcome</h1>
      <p className="text-gray-500 mt-4">This is the home page</p>
    </div>
  </div>
)
}
