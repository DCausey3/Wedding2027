"use client";

import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Heart, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn({ username: email, password });
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #1a1209 0%, #2d1f0e 100%)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Heart size={16} className="text-sand fill-sand" />
          <span className="text-xs uppercase tracking-[0.25em] text-ivory font-sans">
            J &amp; D Admin
          </span>
        </div>

        <h1 className="font-serif text-3xl font-light text-ivory text-center mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-ivory/50 text-center mb-8">
          Bride &amp; Groom portal access only
        </p>

        <form onSubmit={handleLogin} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="label-overline text-ivory/50 block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl text-sm bg-white/8 border border-white/10 text-ivory placeholder:text-ivory/30 focus:border-sand focus:outline-none"
              placeholder="you@example.com"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />
          </div>
          <div>
            <label htmlFor="password" className="label-overline text-ivory/50 block mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl text-sm border text-ivory placeholder:text-ivory/30 focus:border-sand focus:outline-none"
              placeholder="••••••••"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs" role="alert">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-3 rounded-full bg-sand text-white text-xs uppercase tracking-[0.15em] font-sans font-medium transition-opacity hover:opacity-80 disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
