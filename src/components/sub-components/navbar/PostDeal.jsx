"use client";

import { openModal } from "@/redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PostDeal = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();

  const handleNavigate = () => {
    if (session.status === "unauthenticated" || session.status === "loading") {
      return toast.error("Login First");
    } else {
      dispatch(openModal());
      return
    }
  };
  return (
    <>
      <div className=" bg-[#196296] hover:bg-[#0ef] " onClick={handleNavigate}>
        <GoPlus />
        <p className="">Post Deal</p>
      </div>
    </>
  );
};

export default PostDeal;
