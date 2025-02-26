"use client";
import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

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
  rating,
  image,
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
}) => {
  // Format price to Indian Rupee format
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Generate star rating elements
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="text-amber-500">★</span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="text-amber-500">★</span>
        );
      } else {
        stars.push(
          <span key={i} className="text-amber-300">★</span>
        );
      }
    }

    return stars;
  };

  // Calculate discount percentage if not provided
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
        
        {/* Star rating */}
        <div className="mb-2 flex">
          {renderStars(rating)}
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-stone-800">
            {formatPrice(currentPrice)}
          </span>
          
          {originalPrice > currentPrice && (
            <span className="text-sm text-stone-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
        
        {/* Add to cart button - hidden by default, shows on hover */}
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