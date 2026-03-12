"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

type Props = {
  initialSession: { user: { name: string; email: string } } | null;
};

const Navbar = ({ initialSession }: Props) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const user = isPending ? initialSession?.user ?? null : session?.user ?? null;

  return (
    <nav className="flex items-center px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="flex-1" />

      <div className="flex gap-8 items-center">
        <Link href="/" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          Home
        </Link>
        <Link href="/dashboard" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          Dashboard
        </Link>
        {user && (
          <Link href="/profile" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Profile
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-end items-center gap-3">
        <ThemeToggle />
        {user ? (
          <button
            onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
          >
            Log out
          </button>
        ) : (
          <Link href="/sign-in">
            <button className="text-sm font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-300 px-4 py-2 rounded-lg transition-colors">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;