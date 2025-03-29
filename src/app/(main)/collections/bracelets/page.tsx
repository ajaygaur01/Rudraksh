"use client";
import ProductListing from "@/components/ProductListing";
import axios from "axios";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/productStore"; // Adjust the path as needed

const Page: React.FC = () => {
  const { setProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchBraceletProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:3000/api/products/getall");
        
        // Filter products by "Bracelets" category
        const filteredProducts = response.data.filter(product => product.category.includes("Bracelets"));
        setProducts(response.data);
        setFilteredProducts(filteredProducts);
        console.log(`Number of products in category "Bracelets": ${filteredProducts.length}`);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchBraceletProducts();
  }, [setProducts]);

  return (
    <main className="w-full px-8 py-8 bg-white">
      <ProductListing products={filteredProducts} />
    </main>
  );
};

export default Page;
