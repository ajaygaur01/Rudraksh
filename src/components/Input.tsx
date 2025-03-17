"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import useSearch from "@/utils/useSearch";

const Input = ({
  searchVal,
  setSearchVal,
  className
}: NavInputProps) => {
  const { results, loading } = useSearch(searchVal); 
  const router = useRouter(); // Initialize router

  const handleSelect = (id: string) => {
    router.push(`/product/${id}`); // Navigate to product details page
    setSearchVal(""); // Clear search input
  };

  return (
    <div className={`relative w-[350px] max-w-md flex flex-col ${className}`}>
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search for the products"
        className="w-full px-4 py-2 pr-10 text-gray-600 placeholder-gray-500 border border-gray-600 outline-none focus:ring-0 focus:border-gray-600 rounded"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />

      {/* Search Icon */}
      <div className="absolute inset-y-0 right-3 flex items-center">
        <svg
          className="w-6 h-6 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {/* Search Results Dropdown */}
      {searchVal && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-1 rounded shadow-lg max-h-60 overflow-auto z-50">
          {loading ? (
            <p className="p-2 text-gray-500">Loading...</p>
          ) : results.length > 0 ? (
            results.map((product: any) => (
              <div 
                key={product.id} 
                className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                onClick={() => handleSelect(product.id)} // Handle click
              >
                {product.name}
              </div>
            ))
          ) : (
            <p className="p-2 text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
