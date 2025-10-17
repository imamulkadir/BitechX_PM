"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="navbar bg-[var(--primary)] text-[var(--text-white)] shadow-sm">
      <div className="flex-1 pl-4">
        <a
          className="flex items-center gap-2 text-xl font-bold cursor-pointer"
          onClick={() => {
            router.push("/home");
          }}
        >
          <img src="https://www.bitechx.com/icons/logo.svg" alt="" />
          BITECHX
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              onClick={() => {
                router.push("/products");
              }}
            >
              Products
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                dispatch(logout());
                router.push("/");
                toast.info("Logged out!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                });
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
