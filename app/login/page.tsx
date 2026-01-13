"use client";

import { signIn } from "next-auth/react"; // Auth.js client
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      setLoading(provider);
      // NextAuth signIn
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      console.error("Login failed", err);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-[400px] flex flex-col gap-8 animate-fade-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary font-sans">
            Welcome back
          </h1>
          <p className="text-text-secondary">
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-8 space-y-6">
          <div className="flex flex-col gap-4">
            {/* Google Button */}
            <button
              onClick={() => handleSignIn("google")}
              disabled={!!loading}
              className="w-full relative flex items-center justify-center gap-3 px-4 py-3 bg-card hover:bg-surface border border-border rounded-lg text-text-primary font-medium transition-all duration-200 hover:border-secondary disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]"
            >
              {loading === "google" ? (
                <Loader2 className="w-5 h-5 animate-spin text-text-muted" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              <span className="font-sans">Continue with Google</span>
            </button>

            {/* GitHub Button */}
            <button
              onClick={() => handleSignIn("github")}
              disabled={!!loading}
              className="w-full relative flex items-center justify-center gap-3 px-4 py-3 bg-primary text-white hover:bg-primary-dark rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading === "github" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Github className="w-5 h-5" />
              )}
              <span className="font-sans">Continue with GitHub</span>
            </button>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-text-muted font-sans tracking-wider">
                Secure Authentication
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted font-sans">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
