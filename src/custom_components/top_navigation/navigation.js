"use client";

import { MyContext } from "@/context/context";
import { signInWithGoogle } from "@/utils/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const { user, is_signedIn, handle_sign_in } = useContext(MyContext);
  const router = useRouter();

  const handle_login_signup = () => {
    if (is_signedIn) {
      signOut(auth)
        .then(() => {
          handle_sign_in(false);
          console.log("logged out");
        })
        .catch((error) => {});
    } else {
      signInWithGoogle();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          handle_sign_in(user);
          console.log("logged in");
          router.push("/dashboard");
        }
      });
    }
  };

  useEffect(() => {
    console.log(user);
  }, [is_signedIn]);

  return (
    <div className="flex justify-center items-center p-4 bg-white  border-b border-gray-300 text-sm">
      <div className="flex-1 h-full flex items-center px-2">test</div>
      <div className="nav_links flex-1  h-full flex justify-end mx-2">
        <ul className="flex  h-full items-center  justify-between w-1/2 ">
          <li className="cursor-pointer">Help</li>
          <Link href={"/dashboard"}>
            <li className="cursor-pointer">Dashboard</li>
          </Link>
          <li
            className=" cursor-pointer border rounded-full border-gray-200 bg-[#21262B] text-white p-3"
            onClick={handle_login_signup}
          >
            Login / Sign Up
          </li>
        </ul>
      </div>
    </div>
  );
}
