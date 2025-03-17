"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import useCurrencyStore from '@/store/currencyStore';
import CurrencyConverter from "currency-converter-lt";

interface ProductCardProps {
  id: number;
  name: string;
  description?: string;
  originalPrice: number;
  currentPrice: number;
  discountPercentage?: number;
  rating: number;
  image: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

const RudrakshaProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  originalPrice,
  currentPrice,
  discountPercentage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rating,
  image,
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
}) => {
  const { currency } = useCurrencyStore(); // Get selected currency

  // State to store converted prices
  const [formattedPrice, setFormattedPrice] = useState<string>('');
  const [formattedOriginalPrice, setFormattedOriginalPrice] = useState<string>('');

  // Function to convert and format price



  // Update converted price whenever price or currency changes
  useEffect(() => {
    console.log("Currency", currency);
    const formatPrice = async (price: number): Promise<string> => {
      if (!currency || currency === "INR") {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        }).format(price);
      }
  
      try {
        const currencyConverter = new CurrencyConverter({ from: "INR", to: currency });
        const convertedPrice = await currencyConverter.convert(price);
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: currency,
          maximumFractionDigits: 2,
        }).format(convertedPrice);
      } catch (error) {
        console.error("Currency conversion error:", error);
        return "Error converting price";
      }
    };
    const updatePrices = async () => {
      setFormattedPrice(await formatPrice(currentPrice));
      setFormattedOriginalPrice(await formatPrice(originalPrice));
    };

    updatePrices();
  }, [currentPrice, originalPrice, currency, formattedPrice]);

  // Calculate discount percentage
  const discount = discountPercentage || 
    Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <div className="group relative w-64 mx-auto overflow-hidden rounded-md bg-white shadow-md transition-all hover:shadow-lg">
      {/* Discount tag */}
      {discount > 0 && (
        <div className="absolute right-0 top-0 z-10 rounded-bl-md bg-red-600 px-2 py-1 text-xs font-bold text-white">
          {discount}% OFF
        </div>
      )}
      
      {/* Wishlist button */}
      <button 
        onClick={() => onFavoriteToggle?.(id)} 
        className="absolute left-2 top-2 z-10 rounded-full bg-white/80 p-1.5 transition-colors hover:bg-white"
        aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart 
          size={18} 
          className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} 
        />
      </button>
      
      {/* Product image */}
      <div className="relative h-64 w-full bg-stone-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="256px"
          className="object-contain p-4"
          priority
        />
      </div>
      
      {/* Product info */}
      <div className="p-4">
        {/* Product name */}
        <h3 className="mb-1 text-lg font-medium text-stone-800 line-clamp-2">{name}</h3>
        
        {/* Description if available */}
        {description && (
          <p className="mb-2 text-sm text-stone-600 line-clamp-2">{description}</p>
        )}
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-stone-800">
            {formattedPrice || "Loading..."}
          </span>
          
          {originalPrice > currentPrice && (
            <span className="text-sm text-stone-400 line-through">
              {formattedOriginalPrice || "Loading..."}
            </span>
          )}
        </div>
        
        {/* Add to cart button */}
        <button
          onClick={() => onAddToCart?.(id)}
          className="mt-3 w-full transform rounded bg-amber-600 py-2 text-sm font-medium text-white transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RudrakshaProductCard;
