"use client"
import React from 'react';
import Image from 'next/image';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

register();

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = () => {
  const slides = [
    {
      title: "Mountain Paradise",
      description: "Discover breathtaking mountain views",
      image: "/mountains.jpg" 
    },
    {
      title: "Beach Retreat",
      description: "Relax by the crystal clear waters",
      image: "/beach.jpg"
    },
    {
      title: "Urban Adventure",
      description: "Explore vibrant city life",
      image: "/city.jpg"
    },
    {
      title: "Forest Escape",
      description: "Get lost in nature's embrace",
      image: "/forest.jpg"
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="py-8"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="h-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={`/api/placeholder/400/300`}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
                <p className="text-gray-600">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors">
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors">
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

export default Carousel;