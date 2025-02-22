import React, { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

interface SelectCurrencyOptions {
  currency: string;
  code: string;
}

const popularCurrencies: SelectCurrencyOptions[] = [
  { currency: "INR", code: "IN" }, 
  { currency: "USD", code: "US" }, 
  { currency: "EUR", code: "EU" }, 
  { currency: "GBP", code: "GB" }, 
  { currency: "JPY", code: "JP" }, 
  { currency: "AUD", code: "AU" }, 
  { currency: "CAD", code: "CA" }, 
];

const SelectCurrency = ({
  isOpen,
  setIsOpen
} : 
{
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [curVal, setCurVal] = useState<SelectCurrencyOptions>({
    currency: "INR",
    code: "IN",
  });

  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      gsap.set(dropdownRef.current, { opacity: 0, y: -10, display: "none" });
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);

    if (dropdownRef.current && chevronRef.current) {
      if (!isOpen) {
        gsap.to(dropdownRef.current, {
          opacity: 1,
          y: 0,
          display: "block",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(chevronRef.current, { rotate: 180, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(dropdownRef.current, {
          opacity: 0,
          y: -10,
          display: "none",
          duration: 0.2,
          ease: "power2.in",
        });

        gsap.to(chevronRef.current, { rotate: 0, duration: 0.3, ease: "power2.out" });
      }
    }
  };

  return (
    <div className="relative w-32">
      {/* Select Button */}
      <div
        className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
        onClick={toggleDropdown}
      >
        {/* Flag */}
        <ReactCountryFlag
          countryCode={curVal.code}
          svg
          style={{ width: "24px", height: "18px", borderRadius: "4px" }}
        />
        {/* Currency Code */}
        <span className="text-gray-800 font-medium">{curVal.currency}</span>

        {/* Rotating Dropdown Icon */}
        <ChevronDown ref={chevronRef} size={18} className="text-gray-500" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && 
          <div
          ref={dropdownRef}
          className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
        >
          {popularCurrencies.map((currency) => (
            <div
              key={currency.code}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setCurVal(currency);
                toggleDropdown();
              }}
            >
              <ReactCountryFlag
                countryCode={currency.code}
                svg
                style={{ width: "20px", height: "15px", borderRadius: "3px" }}
              />
              <span className="text-gray-800">{currency.currency}</span>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default SelectCurrency;
