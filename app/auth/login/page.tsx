"use client";

import { login } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Slide, toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Reset previous error
    setError("");

    if (!email) {
      setError("Email cannot be empty!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format!");
      return;
    }
    // console.log(email);
    dispatch(login({ email: email })).then((data) => {
      // console.log(data);
      if (data.error) {
        toast.error("Invalid email.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
      if (data.payload.token) {
        router.push("/home");
        toast.success("Authenticated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
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
            {/* <label className="text-[var(--text-white)] font-medium mb-1">
              Email
            </label> */}
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full bg-[var(--primary)] border border-gray-600 rounded-lg text-[var(--text-white)] placeholder:text-[var(--text-white)]/50 focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] focus:outline-none transition-all"
              onChange={(e: any) => setEmail(e.target.value)}
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

        {/* Footer */}
        {/* <p className="text-center text-[var(--text-white)]/70 text-sm">
          Don’t have an account?{" "}
          <span className="text-[var(--green)] font-semibold cursor-pointer">
            Sign up
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
