"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

type Props = {
  initialSession: { user: { name: string; email: string } } | null;
};

const Navbar = ({ initialSession }: Props) => {
  
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Once useSession finishes loading, trust it completely over initialSession
  const user = isPending ? initialSession?.user ?? null : session?.user ?? null;

  return (
    <nav className="flex items-center px-8 py-4 bg-white shadow sticky top-0 z-50">
      <div className="flex-1" />

      <div className="flex gap-8 items-center">
        <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
          Home
        </Link>
        <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
          Dashboard
        </Link>
        {user && (
          <Link href="/profile" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
            Profile
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {user ? (
          <button
            onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
            className="text-black font-medium bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300"
          >
            Log out
          </button>
        ) : (
          <Link href="/sign-in">
            <button className="border border-white text-white bg-neutral-800 font-medium px-6 py-2 rounded-md hover:bg-neutral-600">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;