"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useCurrencyStore from "@/store/currencyStore";

gsap.registerPlugin(ScrollTrigger);
const API_KEY = "273098da3cf25e72a17434ae";

const ProductItem: React.FC<{ item: ProductShow }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [convertedPrice, setConvertedPrice] = useState<{ current: string; original: string } | null>(null);
  const { currency } = useCurrencyStore();

  useEffect(() => {
    const convertCurrency = async () => {
      console.log("Raw current price:", item.price);
      console.log("Raw original price:", item.orgprice);

      const priceValue = item.price;
      const originalPriceValue = item.orgprice;

      if (isNaN(priceValue) || priceValue <= 0 || isNaN(originalPriceValue) || originalPriceValue <= 0) {
        setConvertedPrice({ current: "Error: Invalid price", original: "Error: Invalid price" });
        return;
      }

      if (currency === "INR") {
        setConvertedPrice({
          current: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(priceValue),
          original: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(originalPriceValue),
        });
        return;
      }

      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/INR/${currency}/${priceValue}`
        );
        const responseOriginal = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/INR/${currency}/${originalPriceValue}`
        );

        const data = await response.json();
        const dataOriginal = await responseOriginal.json();

        if (data.result === "success" && dataOriginal.result === "success") {
          setConvertedPrice({
            current: new Intl.NumberFormat("en-IN", { style: "currency", currency: currency || "INR" }).format(
              data.conversion_result
            ),
            original: new Intl.NumberFormat("en-IN", { style: "currency", currency: currency || "INR" }).format(
              dataOriginal.conversion_result
            ),
          });
        } else {
          setConvertedPrice({ current: "Error: Unable to convert", original: "Error: Unable to convert" });
        }
      } catch (error) {
        console.error("Currency conversion error:", error);
        setConvertedPrice({ current: "Error: Unable to convert", original: "Error: Unable to convert" });
      }
    };

    convertCurrency();
  }, [currency, item.price, item.orgprice]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={cardRef} className="bg-white rounded-xl shadow-lg p-4">
      <div className="relative w-[250px] h-56 mb-4 rounded-md overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover w-full h-full rounded-md" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-gray-500 line-through">
          {convertedPrice?.original || item.originalPrice}
        </span>
        <span className="text-lg font-medium text-green-600">
          {convertedPrice?.current || item.currentPrice}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
