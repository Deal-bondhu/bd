"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";

const SaveProduct = ({ id, isSaved }) => {
  const router = useRouter();
  const session = useSession();

  const { user } = session?.data;

  const handleSave = async () => {
    if (!user) {
      return toast.error("LogIn First");
    }
    if (isSaved) {
      return toast.error("Product Already Saved");
    }

    const res = await fetch("http://localhost:3000/api/cookies/save_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();

    if (result.acknowledged === true) {
      toast.success("product saved successfully");
      router.refresh();
      return;
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaved}
      className={`p-3 rounded-full ${
        isSaved && "bg-gray-400 text-white"
      } border w-fit hover:bg-gray-400 hover:text-white`}
    >
      <IoIosSend />
    </button>
  );
};

export default SaveProduct;
