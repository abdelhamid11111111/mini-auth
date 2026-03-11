"use client";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { useSession } from "@/lib/auth-client";

export default function Home() {

  const {data: session, isPending} = useSession()

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-100">
        {isPending ? null : session?.user?.name ? (
          <h1 className="text-4xl text-black font-bold">Welcome {session?.user?.name}</h1>
        ) : (
          <h1 className="text-4xl text-black font-bold">Welcome</h1>
        )}
        <p className="text-gray-500 mt-4">This is the home page</p>
      </div>
    </div>
  );
}
