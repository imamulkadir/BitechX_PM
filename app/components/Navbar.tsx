"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    toast.info("Logged out!", {
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
  };

  return (
    <div className="navbar bg-[var(--primary)] text-[var(--text-white)] shadow-sm px-4">
      {/* Logo */}
      <div className="flex-1">
        <a
          className="flex items-center gap-2 text-xl font-bold cursor-pointer"
          onClick={() => router.push("/home")}
        >
          <img
            src="https://www.bitechx.com/icons/logo.svg"
            alt="logo"
            className="w-8"
          />
          BITECHX
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <a onClick={() => router.push("/home")}>Home</a>
          </li>
          <li>
            <a onClick={() => router.push("/products")}>Products</a>
          </li>
          <li>
            <a onClick={() => router.push("/categories")}>Categories</a>
          </li>
          <li>
            <a
              className="text-[var(--red)] font-semibold"
              onClick={handleLogout}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[var(--primary)] w-52 gap-2 rounded-b-lg"
          >
            <li>
              <a onClick={() => router.push("/home")}>Home</a>
            </li>
            <li>
              <a onClick={() => router.push("/products")}>Products</a>
            </li>
            <li>
              <a onClick={() => router.push("/categories")}>Categories</a>
            </li>
            <li>
              <a className="text-[var(--red)] font-bold" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
