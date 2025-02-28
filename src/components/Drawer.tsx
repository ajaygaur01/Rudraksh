"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, } from "lucide-react"
import gsap from "gsap"

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
}

// Replace the categories array with this one that uses placeholder images
const categories = [
  {
    title: "Rudraksha",
    icon: "/images/Collections/Rudraksha/categoriesRudraksha.jpg",
    url: "/images/Collections/Rudraksha/categoriesRudraksha.jpg",
  },
  {
    title: "Temple & Consecrated",
    icon: "/images/Collections/Rudraksha/temples.jpg",
    url: "/category/temple",
  },
  {
    title: "Yoga Store",
    icon: "/images/Collections/Rudraksha/yoga.jpg",
    url: "/category/yoga",
  },
  {
    title: "Mala",
    icon: "/images/Collections/Rudraksha/mala.jpg",
    url: "/category/food",
  },
  {
    title: "Bracelets",
    icon: "/images/Collections/Rudraksha/bracelets.jpg",
    url: "/category/food",
  },

]

const utilityLinks = [
  // { title: "Track Order", url: "/track-order" },
  { title: "Customer Support", url: "/support" },
  { title: "Blog", url: "/blog" },
]

const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const drawer = drawerRef.current
    const backdrop = backdropRef.current

    if (!drawer || !backdrop) return

    const tl = gsap.timeline({ paused: true })

    // Set initial state
    gsap.set(drawer, { x: "-100%" })
    gsap.set(backdrop, { opacity: 0, display: "none" })

    // Animation timeline
    tl.to(backdrop, {
      opacity: 1,
      display: "block",
      duration: 0.3,
      ease: "power2.out",
    }).to(
      drawer,
      {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.1",
    )

    // Play or reverse based on isOpen state
    if (isOpen) {
      tl.play()
      document.body.style.overflow = "hidden" // Prevent scrolling when drawer is open
    } else {
      tl.reverse()
      document.body.style.overflow = "" // Re-enable scrolling when drawer is closed
    }

    return () => {
      document.body.style.overflow = "" // Clean up
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div ref={backdropRef} className="fixed inset-0 bg-black/50 z-[60] hidden" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 h-full w-[320px] max-w-[85vw] bg-white z-[70] shadow-xl overflow-y-auto"
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close menu">
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Categories */}
        <div className="divide-y">
          {categories.map((category, index) => (
            <Link key={index} href={category.url} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 relative flex-shrink-0">
                  <Image
                    src={category.icon || "/placeholder.svg"}
                    alt={category.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-md"

                  />
                </div>
                <span className="font-medium">{category.title}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Utility Links */}
        <div className="mt-4 divide-y">
          {utilityLinks.map((link, index) => (
            <Link key={index} href={link.url} className="block p-4 hover:bg-gray-50 font-medium">
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Drawer

