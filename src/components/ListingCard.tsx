"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: Product;
  gridView: boolean;
};

export default function ProductCard({ product, gridView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? "text-yellow-400"
                : star - 0.5 <= rating
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      {gridView ? (
        <div className="relative group border rounded-md overflow-hidden bg-white">
          <div className="relative aspect-square">
            <Image src={product.image[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <button
              onClick={toggleWishlist}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md z-10"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </button>
            {product.isConsecrated && (
              <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">Consecrated</div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium line-clamp-2 h-10">{product.name}</h3>
            <div className="mt-1 mb-2">{renderRatingStars(product.rating)}</div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">₹ {product.price.toLocaleString()}</p>
            </div>
            <Button className="w-full mt-3 bg-amber-500 hover:bg-amber-600">ADD TO CART</Button>
          </div>
        </div>
      ) : (
        <div className="relative group border rounded-md overflow-hidden bg-white">
          <div className="flex">
            <div className="relative w-40 h-40 flex-shrink-0">
              <Image src={product.image[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              <button
                onClick={toggleWishlist}
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md z-10"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>
              {product.isConsecrated && (
                <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  Consecrated
                </div>
              )}
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
              <div className="mt-2">{renderRatingStars(product.rating)}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-semibold">₹ {product.price.toLocaleString()}</p>
                <Button className="bg-amber-500 hover:bg-amber-600">ADD TO CART</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
