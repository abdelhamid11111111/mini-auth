"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-white bg-slate-50">
      {/* <Navbar /> */}

      <main className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Create an account
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Start building something great today.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Full Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                required
                className="w-full rounded-lg bg-slate-50 border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg bg-slate-50 border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                required
                minLength={8}
                className="w-full rounded-lg bg-slate-50 border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          {/* Sign-in link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-slate-900 underline-offset-4 hover:underline transition"
            >
              Sign in
            </Link>
          </p>

        </div>
      </main>
    </div>
  );
}