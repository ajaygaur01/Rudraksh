"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { blogPosts } from "@/utils/constants"

export default function BlogCarousel() {
  const [startIndex, setStartIndex] = useState(0)
  const visiblePosts = 3
  const maxStartIndex = Math.max(0, blogPosts.length - visiblePosts)

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1))
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-light text-center mb-12">BLOG</h2>
      
      <div className="relative">
        {/* Previous button */}
        <button 
          onClick={handlePrevious}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md disabled:opacity-30"
          aria-label="Previous posts"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(startIndex, startIndex + visiblePosts).map((post) => (
            <div key={post.id} className="flex flex-col">
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4 flex-grow">{post.excerpt}</p>
              <Link 
                href={`/blog/${post.slug}`} 
                className="text-red-600 font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
        
        {/* Next button */}
        <button 
          onClick={handleNext}
          disabled={startIndex >= maxStartIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md disabled:opacity-30"
          aria-label="Next posts"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  )
}
