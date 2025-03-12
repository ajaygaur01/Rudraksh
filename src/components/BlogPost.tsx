"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { blogPosts } from '@/utils/constants';


export default function BlogPost({id = "1"} : {id?: string}) {
  const router = useRouter();

  // Blog post data
  const blogPost = blogPosts.find(post => post.id === id);

  if (!blogPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600">Blog post not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-b mt-10 from-amber-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/blog" className="flex items-center text-orange-700 hover:text-orange-500 transition" onClick={() => router.back()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12 shadow-lg">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Blog Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">{blogPost.title}</h1>
            {/* <div className="flex items-center justify-center text-sm text-gray-600">
              <p>By {blogPost.author}</p>
              <span className="mx-2">•</span>
              <p>{blogPost.date}</p>
            </div> */}
          </div>

          {/* Blog Content */}
          <article className="prose prose-lg max-w-none">
            <p>
              The ancient wisdom of Rudraksha beads has been revered for thousands of years in Hindu and Buddhist traditions. These sacred seeds from the Elaeocarpus ganitrus tree are believed to carry powerful spiritual energies that can transform your life when chosen correctly. At Narayana Rudraksha, we understand the profound connection between these divine beads and your personal spiritual journey.
            </p>

            <h2>Understanding the Spiritual Significance of Rudraksha</h2>
            <p>
              Rudraksha beads are more than just spiritual accessories—they are living energy conduits that establish a connection between the wearer and cosmic forces. The name &quot;Rudraksha&quot; comes from &quot;Rudra&quot; (a form of Lord Shiva) and &quot;Aksha&quot; (eyes), literally meaning &quot;Tears of Shiva.&quot; According to ancient texts, these sacred beads formed from Lord Shiva&apos;s tears as he emerged from deep meditation.
            </p>
            <p>
              Each Rudraksha contains distinct vibrational frequencies based on its mukhi (faces or divisions visible on the surface). From 1 mukhi to 21 mukhi, each configuration offers different benefits and aligns with specific planetary energies in the cosmos.
            </p>

            <h2>The Science Behind Rudraksha Selection</h2>
            <p>
              Modern scientific studies have begun to validate what ancient sages knew for millennia—Rudraksha beads generate a measurable electromagnetic field that interacts with your body&apos;s bioelectric field. When correctly matched to your energy needs, these beads can help balance your nervous system, reduce stress, normalize blood pressure, and enhance mental clarity.
            </p>
            <p>
              Recent studies conducted by various research institutes have shown that wearing the appropriate Rudraksha can:
            </p>
            <ul>
              <li>Generate positive electromagnetic waves that shield against harmful radiation</li>
              <li>Stabilize heart rate and reduce hypertension</li>
              <li>Enhance concentration and cognitive functions</li>
              <li>Strengthen the immune system</li>
              <li>Balance the chakra system and promote energy flow</li>
            </ul>

            <h2>Selecting Your Rudraksha Based on Zodiac Sign</h2>
            <p>
              Your astrological profile provides valuable insights into which Rudraksha will resonate most powerfully with your personal energy. Below is a guide to help you understand which Rudraksha may benefit you based on your zodiac sign:
            </p>

            <h3>Aries (Mesh)</h3>
            <p>
              As a fire sign ruled by Mars, Aries individuals benefit greatly from 3 mukhi Rudraksha. This bead enhances courage, willpower, and helps control aggression—qualities often needed to balance Aries&apos; dynamic energy. The 11 mukhi can also be beneficial as it connects to Rudra (a form of Lord Shiva), providing protection and strength.
            </p>

            <h3>Taurus (Vrishabha)</h3>
            <p>
              Venus-ruled Taurus benefits from 5 mukhi Rudraksha, which balances the five elements within the body and promotes health, wealth, and stability. The 14 mukhi is also recommended as it enhances prosperity and material comfort—aspects valued by Taurus individuals.
            </p>

            <h3>Gemini (Mithuna)</h3>
            <p>
              Mercury-ruled Geminis thrive with 2 mukhi Rudraksha, which enhances communication skills, intellectual capacity, and helps balance their dual nature. The 10 mukhi also benefits Geminis by promoting peace of mind and reducing overthinking.
            </p>

            {/* Add more zodiac signs and content as needed */}

            <h2>Conclusion: Your Spiritual Journey with Rudraksha</h2>
            <p>
              Selecting the right Rudraksha is a deeply personal process that marks an important step in your spiritual evolution. At Narayana Rudraksha, we&apos;re committed to guiding you through this sacred journey with authenticity and wisdom passed down through generations.
            </p>
            <p>
              Remember that while general guidelines are helpful, your intuitive connection to a particular Rudraksha should not be ignored. Many spiritual seekers report feeling a special attraction or &quot;calling&quot; to certain beads—this inner guidance is equally valuable in your selection process.
            </p>
            <p>
              We invite you to explore our carefully curated collection of genuine, energized Rudraksha beads, each carrying centuries of spiritual tradition and transformative potential. Your perfect Rudraksha awaits—the one that will resonate with your unique energy and support your life&apos;s divine purpose.
            </p>
            <p>
              For personalized guidance on selecting your ideal Rudraksha, our team of Vedic experts is available for consultation. May your choice bring you peace, prosperity, and spiritual awakening.
            </p>
            <p>
              <em>Jai Shiva Shankar! Har Har Mahadev!</em>
            </p>
          </article>

          {/* Call to Action */}
          <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Discover Your Perfect Rudraksha</h3>
            <p className="text-gray-700 mb-4">Experience the transformative power of authentic Rudraksha beads. Our experts at Narayana Rudraksha can help you find the perfect match for your spiritual journey.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="bg-orange-600 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-700 transition text-center">
                Shop Authentic Rudraksha
              </Link>
              <Link href="/contact" className="bg-white text-orange-600 border border-orange-600 px-6 py-3 rounded-md font-medium hover:bg-orange-50 transition text-center">
                Get Expert Advice
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {blogPosts
      .filter((post) => post.id !== id) // Exclude the current blog post
      .slice(0, 2) // Show only two related articles
      .map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-orange-600 font-medium hover:text-orange-700">
              Read More →
            </Link>
          </div>
        </div>
      ))}
  </div>
</div>

          {/* Newsletter Signup */}
          <div className="mt-12 bg-gray-100 rounded-lg p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600">Receive sacred wisdom, special offers, and updates on new Rudraksha arrivals</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}