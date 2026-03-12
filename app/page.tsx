import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {

  const session = await auth.api.getSession({ headers: await headers() });

  return (
  <div className=" bg-slate-50 dark:bg-slate-950 transition-colors">
    <div className="flex flex-col items-center justify-center h-100">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
        {session?.user?.name ? `Welcome ${session.user.name}` : "Welcome"}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mt-4">This is the home page</p>
    </div>
  </div>
);
}