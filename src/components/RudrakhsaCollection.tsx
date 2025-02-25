"use client";
import { collections } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { comorantGaramond, popping } from '@/utils/fonts';

const RudrakshaCollection : React.FC = () =>  {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const collectionRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Collection items staggered animation
    gsap.fromTo(
      collectionRefs.current,
      { y: 100, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.15,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: collectionRefs.current[0],
          start: 'top 85%',
        }
      }
    );
    const currentCollectionRefs = collectionRefs.current;
    const currentHeadingRef = headingRef.current;
    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf(currentCollectionRefs);
        gsap.killTweensOf(currentHeadingRef);
      }
    };
  }, []);
  
  // Reset refs array when collections change
  const setCollectionRef = (el: HTMLAnchorElement | null, index: number): void => {
    collectionRefs.current[index] = el;
  };

  return (
    <div className="container mx-auto px-4 lg:px-10 py-14 overflow-hidden">
        <div className="w-full flex flex-col items-center justify-center mb-12">
            <h2 
                ref={headingRef}
                className={`
                    text-5xl font-light text-center mb-4
                    bg-gradient-to-r 
                    from-[#fbc634] to-[#dda01a]
                    bg-clip-text text-transparent inline-block
                    ${comorantGaramond.className}
                `}
            >
                OUR COLLECTIONS
            </h2>
            <h4 
                ref={headingRef}
                className={`${popping.className} text-lg text-center text-gray-600 tracking-wide`}
            >
                Discover the perfect harmony of artistry and craftsmanship in every piece.
            </h4>
        </div>

            
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((collection: CollectionItems, index: number) => (
          <Link 
            href={collection.href} 
            key={collection.id} 
            className="block relative group overflow-hidden rounded-lg"
            ref={(el) => setCollectionRef(el, index)}
          >
            <div className="relative h-40 md:h-80 w-full">
              <Image 
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-30">
                <h3 className="text-white text-xl md:text-2xl font-bold text-center px-4 transform transition-transform duration-500 group-hover:translate-y-2">
                  {collection.title}
                </h3>
              </div>
              
              {collection.badge && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-red-600 text-white px-2 py-1 md:px-3 text-[10px] md:text-sm font-semibold rounded animate-pulse">
                  {collection.badge}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RudrakshaCollection;