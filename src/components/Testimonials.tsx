"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/utils/constants";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="relative py-16 bg-amber-50 overflow-hidden">
      <div className="container mx-auto px-[50px] max-w-6xl">
        <div className="relative text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-amber-800 mb-4">
            Transformed My Life: A Surprising Experience With Rishi Rudraksha
          </h2>
          <p className="text-gray-900 md:px-[10%] px-[15%]">
            Our products are genuine, sourced from trusted suppliers, and undergo strict quality checks. Shop with confidence in a secure and transparent environment.
          </p>
        </div>



        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="relative px-[30px]"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}

        
        </Swiper>

        <Button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-[2vw] mx-4 md:left-[4vw] top-[65%] -translate-y-1/2 bg-white hover:bg-neutral-100 shadow-md rounded-full h-10 w-10 md:h-12 md:w-12 z-10 border-amber-200"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-amber-700" />
        </Button>

        <Button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-[2vw] mx-4 md:right-[4vw] top-[65%] -translate-y-1/2 bg-white hover:bg-neutral-100 shadow-md rounded-full h-10 w-10 md:h-12 md:w-12 z-10 border-amber-200"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-amber-700" />
        </Button>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial } : {testimonial : Testimonial}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col min-h-[275px]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-sm text-gray-500">{testimonial.timeAgo}</span>
      </div>

      <p className="text-gray-700 mb-6 flex-grow h-30">{testimonial.comment}</p>

      <div className="flex items-center mt-auto">
        <div
          className={`${testimonial.avatarColor} rounded-full w-10 h-10 flex items-center justify-center text-white font-medium`}
        >
          {testimonial.avatarInitial}
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-800">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
