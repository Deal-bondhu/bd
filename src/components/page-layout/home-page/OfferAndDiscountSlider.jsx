"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";

// Import required modules
import { EffectCreative, Navigation, Autoplay } from "swiper/modules";

const OfferAndDiscountSlider = () => {
  return (
    <section className="w-full lg:mt-8 md:mt-6 smd:mt-4 mt-3 aspect-[1/0.3]">
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        navigation={true} 
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[EffectCreative, Navigation, Autoplay]}
        className="mySwiper w-full h-full"
      >
        <SwiperSlide className="bg-blue-400"><img src="" alt="" /></SwiperSlide>
        <SwiperSlide className="bg-yellow-300"><img src="" alt="" /></SwiperSlide>
        <SwiperSlide className="bg-red-600"><img src="" alt="" /></SwiperSlide>
        <SwiperSlide className="bg-amber-800"><img src="" alt="" /></SwiperSlide>
      </Swiper>
    </section>
  );
};

export default OfferAndDiscountSlider;
