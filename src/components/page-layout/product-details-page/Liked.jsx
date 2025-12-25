"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Liked = ({ liked, id, count }) => {
  const router = useRouter();
  const handleLike = () => {
    if (liked) {
      return toast.error("already liked");
    } else {
      fetch("/api/cookies/like_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.acknowledged) {
            router.refresh();
          }
        });
    }
  };
  return (
    <p onClick={handleLike} className="flex gap-1 items-center cursor-pointer">
      {liked ? <FcLike /> : <FcLikePlaceholder />} {count}
    </p>
  );
};

export default Liked;
