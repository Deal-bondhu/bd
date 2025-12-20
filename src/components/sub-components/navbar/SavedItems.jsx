"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSaveDown2 } from "react-icons/ci";

const SavedItems = () => {
  const router = useRouter();
  const session = useSession();

  const handleRoute = () => {
    router.push("/saved_products");
  };
  return (
    session?.data?.user && (
      <div onClick={handleRoute} className=" bg-[#196296] hover:bg-[#0ef] ">
        <CiSaveDown2 />
        <p className="">Saved Items</p>
      </div>
    )
  );
};

export default SavedItems;
