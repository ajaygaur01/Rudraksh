"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "@/utils/constants";
register();

import "swiper/css";
import "swiper/css/pagination";

const Carousel: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0); // Store active slide index

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true} // Enable infinite looping
        pagination={{
          clickable: true,
          type: "bullets",
          bulletClass: "swiper-pagination-bullet", // Default class for bullets
          bulletActiveClass: "swiper-pagination-bullet-active", // Active bullet class
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Use realIndex for loop
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-contain w-full h-full"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`absolute left-4 md:left-6 top-1/2 z-10 bg-white/25 backdrop-blur-lg w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 transition-all`}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`absolute right-4 md:right-6 top-1/2 z-10 bg-white/25 backdrop-blur-lg w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 transition-all`}
      >
        <ChevronRight size={28} />
      </button>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white; // Default bullet color
          opacity: 0.5; // Default opacity
          width: 10px;
          height: 10px;
          margin: 0 6px !important; // Spacing between bullets
        }
        .swiper-pagination-bullet-active {
          background: white; // Active bullet color
          opacity: 1; // Full opacity for active bullet
        }
      `}</style>
    </div>
  );
};

export default Carousel;