"use client";
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react'; // Assuming you're using Lucide React for the icon
import { useState } from 'react';
import { popping } from '@/utils/fonts';

const HomeBtn = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href="/" // Replace with the desired path
      className={`absolute flex-center text-md top-[5%] left-[3%] ${
        !isHovering ? 'text-[#8B5E3C]' : 'text-white bg-[#8B5E3C]'
      } border border-[#8B5E3C] pl-1 pr-3 py-1 rounded-lg`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={`flex items-center ${popping.className}`}>
        <ChevronLeft strokeWidth={1.5} size={20} /> Home
      </span>
    </Link>
  );
};

export default HomeBtn;