import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RudrakshaShowCase = () => {
  const rudrakshaItems = [
    {
      id: 1,
      name: "Shani Kavacham",
      originalPrice: "Rs. 230,010",
      currentPrice: "Rs. 209,100.00",
      image: "/api/placeholder/250/300"
    },
    {
      id: 2,
      name: "Karya Siddhi Combination",
      description: "(Success and completion)",
      originalPrice: "Rs. 57,860",
      currentPrice: "Rs. 52,600.00",
      image: "/api/placeholder/250/300"
    },
    {
      id: 3,
      name: "Vidyadhari Saraswati Combination",
      description: "(Knowledge and Wisdom)",
      originalPrice: "Rs. 12,650",
      currentPrice: "Rs. 11,500.00",
      image: "/api/placeholder/250/300"
    },
    {
      id: 4,
      name: "Ashtavinayak Combination",
      originalPrice: "Rs. 21,500",
      currentPrice: "Rs. 18,900.00",
      image: "/api/placeholder/250/300"
    },
    {
      id: 5,
      name: "Karya Siddhi Combination",
      description: "(Success and completion)",
      originalPrice: "Rs. 57,860",
      currentPrice: "Rs. 52,600.00",
      image: "/api/placeholder/250/300"
    },
    {
      id: 6,
      name: "Vidyadhari Saraswati Combination",
      description: "(Knowledge and Wisdom)",
      originalPrice: "Rs. 12,650",
      currentPrice: "Rs. 11,500.00",
      image: "/api/placeholder/250/300"
    },
    {
      id: 7,
      name: "Ashtavinayak Combination",
      originalPrice: "Rs. 21,500",
      currentPrice: "Rs. 18,900.00",
      image: "/api/placeholder/250/300"
    }
  ];

  return (
    <div className="w-full bg-stone-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">All Combinations</h1>
            <a href="#" className="text-amber-600 hover:underline">Explore Our Best Combinations</a>
          </div>
        </div>
        
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto py-8">
            {rudrakshaItems.map((item) => (
              <div key={item.id} className="min-w-64 flex flex-col items-center">
                <div className="bg-black w-56 h-64 rounded-md flex items-center justify-center mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-40 h-48 object-contain"
                  />
                </div>
                <h2 className="text-lg font-semibold text-stone-800 text-center">{item.name}</h2>
                {item.description && (
                  <p className="text-stone-700 text-center">{item.description}</p>
                )}
                <div className="mt-2 text-center">
                  <span className="text-stone-400 line-through mr-2">{item.originalPrice}</span>
                  <span className="text-stone-800 font-bold">{item.currentPrice}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-100 rounded-full p-2 shadow-md">
            <ChevronLeft className="text-amber-700" size={24} />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-100 rounded-full p-2 shadow-md">
            <ChevronRight className="text-amber-700" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RudrakshaShowCase;