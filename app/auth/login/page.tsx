"use client";

import { login } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Slide, toast } from "react-toastify";
import type { AppDispatch } from "@/app/redux/store";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Navigate client-side only when login succeeds
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/home");
    }
  }, [isLoggedIn, router]);

  const handleLogin = () => {
    // Reset previous error
    setError(null);

    if (!email.trim()) {
      setError("Email cannot be empty!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format!");
      return;
    }

    dispatch(login({ email }))
      .unwrap()
      .then((payload) => {
        if (payload?.token) {
          toast.success("Authenticated!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
          setIsLoggedIn(true); // trigger client-side navigation
        }
      })
      .catch((err: unknown) => {
        let message = "Invalid email.";
        if (err instanceof Error) message = err.message;

        toast.error(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="bg-[var(--primary)] w-full max-w-md rounded-2xl shadow-xl p-8 flex flex-col space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[var(--text-white)]">
            Welcome Back!
          </h1>
          <p className="text-[var(--text-white)]/80">
            Login to manage your products
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full bg-[var(--primary)] border border-gray-600 rounded-lg text-[var(--text-white)] placeholder:text-[var(--text-white)]/50 focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] focus:outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-xs text-[var(--red)] mt-1">{error}</p>}
          </div>

          <button
            className="w-full py-2 rounded-lg bg-[var(--green)] hover:bg-[var(--green)]/90 text-[var(--text-white)] font-semibold transition-colors"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
