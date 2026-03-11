import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {

  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-100">
        <h1 className="text-4xl text-black font-bold">
          {session?.user?.name ? `Welcome ${session.user.name}` : "Welcome"}
        </h1>
        <p className="text-gray-500 mt-4">This is the home page</p>
      </div>
    </div>
  );
}