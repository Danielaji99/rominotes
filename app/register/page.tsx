"use client";
import { useActionState } from "react";
import { BookOpen } from "lucide-react";
import { registerAction } from "../actions";

const initialState = { error: "" };

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center mb-8">
          <BookOpen className="w-20 h-20 text-teal-400 stroke-[1.5]" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-teal-400 text-4xl font-light mb-2">Join</h1>
          <h2 className="text-teal-400 text-5xl font-bold">RomiNotes</h2>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="mb-5 p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-red-400 text-center">{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 bg-transparent border border-teal-500/50 text-teal-100 placeholder-teal-700 rounded-lg focus:outline-none focus:border-teal-400 transition-colors"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-transparent border border-teal-500/50 text-teal-100 placeholder-teal-700 rounded-lg focus:outline-none focus:border-teal-400 transition-colors"
          />

          <button
            type="submit"
            className="w-full py-3 bg-teal-400 hover:bg-teal-500 text-black font-semibold rounded-lg transition-colors shadow-lg shadow-teal-500/20"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-teal-100">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-teal-400 hover:text-teal-300 font-semibold underline transition-colors"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
