"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { popping } from "@/utils/fonts";
import ProductItem from "./ProductItem";
import { rudrakshaItems } from "@/utils/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RudrakshaShowCase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLAnchorElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const calculateMaxScroll = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.clientWidth;
        const scrollWidth = scrollRef.current.scrollWidth;
        setMaxScroll(Math.max(0, scrollWidth - containerWidth));
      }
    };

    calculateMaxScroll();

    const resizeObserver = new ResizeObserver(calculateMaxScroll);
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      resizeObserver.observe(currentScrollRef);
    }

    return () => {
      if (currentScrollRef) {
        resizeObserver.unobserve(currentScrollRef);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Animate Heading & Subheading Text
  useEffect(() => {
    const animateText = (element: HTMLElement | null) => {
      if (!element) return;
      const text = element.innerText;
      element.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? `<span>&nbsp;</span>`
            : `<span style="display:inline-block">${char}</span>`
        )
        .join("");

      const chars = element.querySelectorAll("span");

      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.02,
          ease: "power4.out",
          duration: 0.5,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    };

    animateText(headingRef.current);
    animateText(subHeadingRef.current);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scroll 80% of visible width
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(maxScroll, scrollPosition + scrollAmount);

    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const newPosition = scrollRef.current.scrollLeft;
      setScrollPosition(newPosition);
      setShowLeftButton(newPosition > 0);
      setShowRightButton(newPosition < maxScroll - 5);
    }
  };

  return (
    <section className="w-full bg-[#f9f5ef] py-10 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top section with fixed heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1
              ref={headingRef}
              className={`${popping.className} text-2xl sm:text-3xl md:text-4xl font-medium md:font-normal text-stone-800`}
            >
              Holy & Powerful Rudraksha
            </h1>
            <div>
              <a
                ref={subHeadingRef}
                href="#"
                className="group text-amber-600 hover:text-amber-700  mt-1 inline-block"
              >
                Explore Our Most Sacred Rudraksha Selections
                
              </a>
              
            </div>
          </div>

          {/* Navigation buttons for larger screens */}
          <div className="hidden md:flex items-center gap-2">
            <button
              className={`bg-amber-100 rounded-full p-2 shadow-md transition-opacity ${
                !showLeftButton
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-amber-200"
              }`}
              onClick={() => handleScroll("left")}
              disabled={!showLeftButton}
              aria-label="Scroll left"
            >
              <ChevronLeft className="text-amber-700" size={24} />
            </button>
            <button
              className={`bg-amber-100 rounded-full p-2 shadow-md transition-opacity ${
                !showRightButton
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-amber-200"
              }`}
              onClick={() => handleScroll("right")}
              disabled={!showRightButton}
              aria-label="Scroll right"
            >
              <ChevronRight className="text-amber-700" size={24} />
            </button>
          </div>
        </div>

        {/* Product carousel with fixed navigation buttons */}
        <div className="relative">
          {/* The scrollable container */}
          <div
            className="w-full overflow-x-auto scrollbar-hide py-4 px-20 md:px-0"
            ref={scrollRef}
            onScroll={handleScrollEvent}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-4 md:gap-6">
              {rudrakshaItems.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Mobile navigation buttons positioned absolutely */}
          <div className="md:hidden">
            {showLeftButton && (
              <button
                className="absolute -left-4 top-[39%] -translate-y-1/2 bg-amber-100 rounded-full p-2 shadow-md z-10"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
              >
                <ChevronLeft className="text-amber-700" size={20} />
              </button>
            )}

            {showRightButton && (
              <button
                className="absolute -right-4 top-[40%] -translate-y-1/2 bg-amber-100 rounded-full p-2 shadow-md z-10"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                <ChevronRight className="text-amber-700" size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RudrakshaShowCase;
