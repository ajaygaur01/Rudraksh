"use client";
import ProductListing from "@/components/ProductListing";
import axios from "axios";
import { useEffect } from "react";
import { useProductStore } from "@/store/productStore"; // Adjust the path as needed

const Page: React.FC = () => {
  const { setProducts, products } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:3000/api/products/getall");
        setProducts(response.data);
        console.log(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <main className="w-full px-8 py-8 bg-white">
      <ProductListing products={products} />
    </main>
  );
};

export default Page;
