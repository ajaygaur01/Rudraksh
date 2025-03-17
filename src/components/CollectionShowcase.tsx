"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/utils/constants";
import useCurrencyStore from "@/store/currencyStore";

const API_KEY = "634f467018358f02e9dc1ae4";

export default function CollectionShowcase() {
  const { currency } = useCurrencyStore();
  const [convertedPrices, setConvertedPrices] = useState<{ [key: number]: { price: string; orgprice: string } }>({});

  useEffect(() => {
    const convertPrices = async () => {
      const conversions: { [key: number]: { price: string; orgprice: string } } = {};

      await Promise.all(
        products.map(async (product) => {
          const priceValue = product.price;
          const orgPriceValue = product.orgprice;

          if (isNaN(priceValue) || priceValue <= 0 || isNaN(orgPriceValue) || orgPriceValue <= 0) {
            conversions[product.id] = { price: "Error: Invalid price", orgprice: "Error: Invalid price" };
            return;
          }

          if (currency === "INR") {
            conversions[product.id] = {
              price: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(priceValue),
              orgprice: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(orgPriceValue),
            };
            return;
          }

          try {
            const [priceResponse, orgPriceResponse] = await Promise.all([
              fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/INR/${currency}/${priceValue}`),
              fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/INR/${currency}/${orgPriceValue}`)
            ]);

            const [priceData, orgPriceData] = await Promise.all([priceResponse.json(), orgPriceResponse.json()]);

            conversions[product.id] = {
              price: priceData.result === "success"
                ? new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(priceData.conversion_result ?? 0)
                : "Error: Unable to convert",
              orgprice: orgPriceData.result === "success"
                ? new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(orgPriceData.conversion_result ?? 0)
                : "Error: Unable to convert"
            };
          } catch (error) {
            console.error("Currency conversion error:", error);
            conversions[product.id] = { price: "Error: Unable to convert", orgprice: "Error: Unable to convert" };
          }
        })
      );

      setConvertedPrices(conversions);
    };

    convertPrices();
  }, [currency]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-medium text-center mb-10 tracking-wide text-gray-700">
        MALA COLLECTION
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative overflow-hidden rounded-md mb-3">
              {/* Product image */}
              <div className="relative aspect-square">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Best offer tag */}
                <div className="absolute top-[10%] right-0 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-l-md">
                  BEST OFFER!
                </div>

                {/* Shop now button (hidden by default, shown on hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div>
              <h3 className="text-base font-medium mb-1">
                <Link href={`/products/${product.id}`} className="hover:text-amber-600 transition-colors">
                  {product.name}
                </Link>
              </h3>
              <p className="text-gray-500 line-through">{convertedPrices[product.id]?.orgprice || product.originalPrice}</p>
              <p className="text-green-600 font-medium">{convertedPrices[product.id]?.price || product.currentPrice}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button variant="outline" className="bg-slate-500 hover:bg-slate-600 text-white border-none px-8 py-2 rounded">
          VIEW ALL
        </Button>
      </div>
    </section>
  );
}
