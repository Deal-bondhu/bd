"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Marquee from "react-fast-marquee";

const HeadingMarquee = () => {
  const pathname = usePathname();
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/reset_password") ||
    pathname.startsWith("/verify_reset_code") ||
    pathname.startsWith("/reset_new_password")
  ) {
    return;
  } else {
    return (
      <Marquee pauseOnHover className=" w-full h-8 bg-[#F5F7FA]">
        <p className=" mr-20  lg:mr-0 font-medium">
          DealBondhu is community-supported. We may get paid by brands for
          deals, including promoted items.
        </p>
      </Marquee>
    );
  }
};

export default HeadingMarquee;
