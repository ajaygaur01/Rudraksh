import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductItem: React.FC<{ item: ProductShow }> = ({ item }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div ref={cardRef} className="bg-white rounded-2xl shadow-lg p-4">
      <div className="relative w-[250px] h-56 mb-4 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="w-full h-full rounded-lg"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      {item.description && (
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
      )}
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
        <span className="text-lg font-bold text-green-600">{item.currentPrice}</span>
      </div>
    </div>
  );
};

export default ProductItem;