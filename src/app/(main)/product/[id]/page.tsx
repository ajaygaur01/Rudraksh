"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { Star, X, ChevronLeft, ChevronRight, Minus, Plus, Truck, Clock, Shield, Flag, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { handleAddToCart } from "@/utils/api";
import Cookie from "js-cookie";
import useCurrencyStore from "@/store/currencyStore";
import ProductReviews from "@/components/ProductReviews";
import { useProductStore } from "@/store/productStore";
import RudrakshaShowCase from "@/components/RudraShowCase";

const API_KEY = "273098da3cf25e72a17434ae";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [pinCode, setPinCode] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [convertedPrice, setConvertedPrice] = useState<string | null>(null);
  const { currency } = useCurrencyStore();
  const { setProducts, products : allProducts } = useProductStore(); 
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        setError(error.response?.data?.error || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:3000/api/products/getall");
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    console.log("Checking conditions:", product?.category, allProducts);
  
    if (product?.category && allProducts?.length === 0) {
      fetchProducts();
    }
  }, [allProducts, product, setProducts]);

   useEffect(() => {
      const convertCurrency = async () => {
        if (currency === "INR") {
          setConvertedPrice(
            new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(product?.price || 0)
          );
          return;
        }
        try {
          const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/INR/${currency}/${product?.price || 0}`
          );
          const data = await response.json();
          if (data.result === "success") {
            setConvertedPrice(
              new Intl.NumberFormat("en-IN", { style: "currency", currency: currency || "INR" }).format(data.conversion_result)
            );
          } else {
            setConvertedPrice("Error: Unable to convert");
          }
        } catch (error) {
          console.error("Currency conversion error:", error);
          setConvertedPrice("Error: Unable to convert");
        }
      };
      convertCurrency();
    }, [currency, product?.price]);

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => Math.min(prev + 1, product?.stock || 10));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const handlePinCodeCheck = () => {
    // This would typically check delivery availability for the pin code
    alert(`Checking delivery availability for pin code: ${pinCode}`);
  };

  const handleAdd = () => {
    if(!product) return;
    handleAddToCart(product?.id, quantity);
  };

  const handleAddToWishlist = () => {
    // This would typically add the product to the wishlist
    alert(`Added ${product?.name} to wishlist`);
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  const calculateAverageRating = (reviews: { rating: number }[]) => {
    if (!reviews || reviews.length === 0) return 0;
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!product) return;
    
    if (direction === 'next') {
      setSelectedImageIndex(prev => 
        prev === product.image.length - 1 ? 0 : prev + 1
      );
    } else {
      setSelectedImageIndex(prev => 
        prev === 0 ? product.image.length - 1 : prev - 1
      );
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center mt-10 text-gray-500">Product not found</div>;
  console.log("---cookie---",Cookie.get('auth_token'));
  return (
    <>
      <main className="w-full px-4 md:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Product Layout - Grid for desktop, Stack for mobile */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images - Left Side */}
            <div className="space-y-4">
              {/* Main Image */}
              <div 
                className="relative w-full aspect-square cursor-pointer border rounded-lg overflow-hidden"
                onClick={() => openLightbox(selectedImageIndex)}
              >
                <Image
                  src={product.image[selectedImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2">
                {product.image.map((img, index) => (
                  <div 
                    key={index} 
                    className={`relative aspect-square cursor-pointer border rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'border-2 border-primary' : ''
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details - Right Side */}
            <div className="space-y-6">
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(calculateAverageRating(product.reviews)) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product?.rating?.toFixed(1)} Reviews {}
                </span>
                <button className="text-sm text-primary underline" onClick={() => {
                  const reviews = document.getElementById('reviews');
                  if (reviews) {
                    const topOffset = reviews.getBoundingClientRect().top + window.scrollY - 100; // Adjust offset if needed
                    window.scrollTo({ top: topOffset, behavior: 'smooth' });
                  }
                }}>
                  Write a Review
                </button>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-bold">
              {convertedPrice || "Loading..."}
              </div>
              
              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-10 text-center">{quantity}</div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange('increase')}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-2"
                  onClick={handleAdd}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={handleAddToWishlist}
                >
                  Wishlist
                </Button>
              </div>
              
              {/* Pin Code Checker */}
              <div className="flex gap-2 max-w-xs">
                <Input 
                  placeholder="Enter Pin Code" 
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  variant="outline" 
                  className="border-primary text-primary"
                  onClick={handlePinCodeCheck}
                >
                  Check
                </Button>
              </div>
              
              {/* Shipping Info */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Free shipping above Rs 950</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Within 24-48 hours Fast Dispatches</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Secure Payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Flag className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Product of India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Holistic Well-being</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-bold">Product Details</h2>
            <Separator />
            
            {/* <div className="space-y-4">
              {product.isConsecrated && (
                <div className="space-y-2">
                  <p className="font-medium">Dimensions</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                    <li>Silver Chain Open Length: 17.5 inch</li>
                    <li>Weight of Silver Chain (without Rudraksha): 11 gms</li>
                    <li>Adiyogi&apos;s grace: Consecrated Rudraksha from the mala that once adorned the 112ft Adiyogi at Isha</li>
                    <li>Silver Chain: Comes with a specially designed silver chain</li>
                    <li>Thoughtful gift: A perfect gift for spiritual seekers and Adiyogi devotees</li>
                  </ul>
                </div>
              )}
            </div> */}
            
            <h2 className="text-xl font-bold pt-4">Product Description</h2>
            <Separator />
            
            <div className="text-gray-700 space-y-4">
              <p>
                Stay connected to Adiyogi - the source of yoga with Isha&apos;s Adiyogi Rudraksha bead. Sourced from the Himalayas, this genuine Panchamukhi Rudraksha bead has been consecrated and energized at the Isha Yoga Centre. Once a part of the rudraksha mala that adorned the Adiyogi, it is a potent tool for self-transformation that brings balance, clarity and health to one&apos;s life. It comes with a pure silver chain and is designed to sit at the pit of your throat. Make yourself available to Adiyogi&apos;s grace with this powerful Rudraksha.
              </p>
            </div>
          </div>
          <div className="w-full mt-12">
          <RudrakshaShowCase item={allProducts.filter((p) => 
            Array.isArray(product.category) 
              ? product.category.some((cat) => p.category.includes(cat)) 
              : p.category.includes(product.category)
          )}/>
          </div>
          <div id="reviews" className="mt-12 space-y-6">
              <ProductReviews productId={product.id} />
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center">
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Main image container */}
          <div className="relative w-full h-[70vh] max-w-4xl">
            <Image
              src={product.image[selectedImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={() => navigateImage('prev')}
            className="absolute left-4 text-white p-2"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={() => navigateImage('next')}
            className="absolute right-4 text-white p-2"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          {/* Product title */}
          <div className="text-white text-center mt-4 mb-2">
            {product.name}
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 px-4 overflow-x-auto max-w-full">
            {product.image.map((img, index) => (
              <button
                key={index}
                className={`relative w-16 h-16 flex-shrink-0 border-2 ${
                  selectedImageIndex === index ? 'border-white' : 'border-transparent'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
