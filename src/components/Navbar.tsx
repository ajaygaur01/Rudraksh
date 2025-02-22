"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlignJustify } from 'lucide-react';
import Input from './Input';
import { ButtonNavLinks, TopNavIcon } from '@/utils/constants';
import SelectCurrency from './SelectCurrency';


const NavIcon = ({Icon, url} : IconWithUrl) => {
    return (
        <Link href={url} className='px-2 py-2 inline-flex align-baseline hover:bg-[#ede9e0] rounded cursor-pointer'>
            <Icon size={28} strokeWidth={1} color='#0A0A0A'/>
        </Link>
    )
}

const Navbar = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollingDown(true);
        setIsOpen(false);
      } else {
        setIsScrollingDown(false); // Show top section on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Section (Hides on scroll down, reappears on scroll up) */}
      <nav
        className={`w-full fixed top-0 left-0 z-50 bg-white ${
          isScrollingDown ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ height: "60px" }} // Adjust based on your design
      >
        <div className="flex-between h-full">
          <div className="px-8 py-3 inline-flex align-baseline gap-6">
            <AlignJustify size={40} strokeWidth={1.2} color="#1f2937" />
            <Image
              src="/images/logos/Logo.svg"
              alt="Nepa Rudraksha"
              width={140}
              height={40}
              className="h-10 w-auto px-10"
            />
          </div>
          <div className="px-8 py-3 inline-flex flex-center gap-6">
            <Input searchVal={searchVal} setSearchVal={setSearchVal} className="mr-2" />
            {TopNavIcon.map((icon, index) => (
              <NavIcon key={index} Icon={icon.Icon} url={icon.url} />
            ))}
            <SelectCurrency
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </nav>

      {/* Fixed Nav Links (Positioned Below the Top Section) */}
      <div
        className={`w-full ${isScrollingDown ?  ' top-0' : 'top-[60px]'} fixed left-0 flex justify-center items-center py-4 border-b border-gray-100 bg-white z-40 shadow-md transition-transform duration-300`}
      >
        {ButtonNavLinks.map((link, index) => (
          <div key={index} className="relative px-5 md:px-8">
            <span
              className={`text-base font-medium cursor-pointer ${
                link.title === "whatever"
                  ? "text-amber-600"
                  : link.title === "whatever"
                  ? "text-amber-400 hover:text-amber-600"
                  : "text-gray-700 hover:text-amber-600"
              } transition-colors duration-200`}
            >
              {link.title}
            </span>
            {link.title === "Shivaratri" && (
              <span
                className="absolute -top-2 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded text-center"
                style={{ fontSize: "10px" }}
              >
                Special
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Space to prevent content overlap */}
      <div className="h-[85px]"></div>
    </>
  );
};


export default Navbar;