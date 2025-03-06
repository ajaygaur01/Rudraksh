"use client";
import ProductListing from "@/components/ProductListing"
import axios from "axios"
import { useEffect, useState } from "react"

const Page : React.FC = () => {

    const [allProducts, setAllProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get<Product[]>("http://localhost:3000/api/products/getall")
            setAllProducts(response.data)
            console.log(response.data.length)
        }
        fetchProducts();
    }, [])
    return (
        <main className="w-full px-8 py-8 bg-white">
        <ProductListing products={allProducts} />
    </main>
    )
}

export default Page