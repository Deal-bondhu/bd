"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { HiUserCircle } from "react-icons/hi2";

const Sign = () => {
  const session = useSession();
  const router = useRouter();
  const handleLogin = async() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    } else {
      await signOut({ redirect: false });
      router.push('/')
    }
  };
  return (
    <div onClick={handleLogin} className=" bg-[#196296] hover:bg-[#0ef]">
      <HiUserCircle />
      <p className="text-[#1A1A1A]">
        {session.status == "unauthenticated" ? "Sign In" : "Sign Out"}
      </p>
    </div>
  );
};

export default Sign;
