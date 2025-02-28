"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { products } from "@/utils/constants";

export default function CollectionShowcase() {
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
                <div className="absolute top-[20%] right-0 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-l-md">
                  BEST OFFER!
                </div>

                {/* Free tag */}
                {/* <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold p-2 rounded-full h-10 w-10 flex items-center justify-center">
                  FREE
                </div> */}

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
              <p className="text-gray-700">{product.currentPrice}</p>
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
  )
}

