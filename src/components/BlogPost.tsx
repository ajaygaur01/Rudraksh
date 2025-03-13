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
      <div className="container  h-full  mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link
        href="/blog"
        className="inline-flex items-center justify-center px-6 py-3 bg-amber-800 text-white rounded-md hover:bg-amber-500 transition-colors"
      >
        Return to Blog
      </Link>
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

          {id === "1" && (
            <article className="prose prose-lg max-w-none">
              <p>
                Rudraksha beads hold immense spiritual significance and are revered for their divine energies. Found in various mukhi (facets), each type of Rudraksha possesses unique benefits, aligning with different cosmic vibrations. Understanding the types of Rudraksha can help you select the one that best resonates with your spiritual and personal growth.
              </p>

              <h2>What Are Rudraksha Beads?</h2>
              <p>
                Rudraksha beads are the sacred seeds of the Elaeocarpus ganitrus tree, believed to have originated from the tears of Lord Shiva. These beads are considered powerful energy tools that can transform the life of the wearer, offering peace, protection, and spiritual upliftment.
              </p>

              <h2>Types of Rudraksha and Their Benefits</h2>
              <p>
                Rudraksha beads are classified based on the number of mukhi (faces) present on their surface. Here’s a breakdown of the most significant types and their unique properties:
              </p>

              <h3>1 Mukhi Rudraksha</h3>
              <p>
                Known as the rarest and most powerful Rudraksha, the 1 Mukhi bead symbolizes pure consciousness. It is associated with Lord Shiva and grants enlightenment, spiritual growth, and detachment from materialism.
              </p>

              <h3>2 Mukhi Rudraksha</h3>
              <p>
                Representing the union of Shiva and Shakti, this bead enhances harmony in relationships, balances emotions, and promotes inner peace. It is ideal for those seeking unity and partnership stability.
              </p>

              <h3>3 Mukhi Rudraksha</h3>
              <p>
                Linked to Lord Agni (fire), the 3 Mukhi Rudraksha burns past karmic influences and enhances self-confidence. It is beneficial for those struggling with self-doubt and past regrets.
              </p>

              <h3>5 Mukhi Rudraksha</h3>
              <p>
                The most commonly available Rudraksha, the 5 Mukhi bead represents Lord Shiva in his Kalagni Rudra form. It promotes wisdom, mental clarity, and a balanced lifestyle, making it ideal for students and spiritual seekers.
              </p>

              <h3>7 Mukhi Rudraksha</h3>
              <p>
                Associated with Goddess Lakshmi, the 7 Mukhi Rudraksha is known for attracting wealth, prosperity, and financial stability. It is highly recommended for business professionals and entrepreneurs.
              </p>

              <h3>9 Mukhi Rudraksha</h3>
              <p>
                This bead is linked to Goddess Durga and instills courage, fearlessness, and protection from negative energies. It empowers individuals to overcome challenges with resilience and determination.
              </p>

              <h3>11 Mukhi Rudraksha</h3>
              <p>
                The 11 Mukhi Rudraksha represents Lord Hanuman and is known for boosting strength, intelligence, and devotion. It is particularly beneficial for those engaged in meditation and spiritual practices.
              </p>

              <h3>14 Mukhi Rudraksha</h3>
              <p>
                Known as the “Third Eye Rudraksha,” this bead enhances intuition and insight. It provides guidance in making important life decisions and connects the wearer to higher spiritual wisdom.
              </p>

              <h2>How to Choose the Right Rudraksha?</h2>
              <p>
                Selecting the right Rudraksha depends on your personal goals, astrological influences, and spiritual aspirations. It is recommended to seek guidance from experienced practitioners or follow your intuitive calling while choosing a Rudraksha.
              </p>

              <h2>Conclusion: Unlocking the Power of Rudraksha</h2>
              <p>
                Each Rudraksha carries unique vibrations and divine energy, offering various benefits to the wearer. Whether you seek spiritual elevation, mental peace, or material prosperity, there is a Rudraksha that aligns with your needs.
              </p>
              <p>
                Explore our carefully curated collection of authentic Rudraksha beads and embark on a journey of transformation. Let these sacred beads guide you towards enlightenment, balance, and a deeper connection with the divine.
              </p>
              <p>
                <em>Om Namah Shivaya!</em>
              </p>
            </article>
          )}
          {id === "5" && <article className="prose prose-lg max-w-none">
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
          </article>}

          {
            id === "2" && 
            <article className="prose prose-lg max-w-none">
  <p>
    Rudraksha beads have been revered for centuries for their spiritual, mental, and physical benefits. Many wearers experience increased peace, focus, and a deep connection to divine energy. But beyond traditional beliefs, modern science also acknowledges the unique properties of Rudraksha that positively impact human physiology and psychology.
  </p>

  <h2>Spiritual Significance of Wearing Rudraksha</h2>
  <p>
    In Hinduism and Buddhism, Rudraksha beads are considered sacred tools for spiritual enhancement. The term &quot;Rudraksha&quot; means &quot;Tears of Shiva,&quot; symbolizing their divine origin. Wearing a Rudraksha helps align your energy with cosmic vibrations, making it an essential element for meditation and self-discovery.
  </p>

  <h3>Connection to Higher Consciousness</h3>
  <p>
    Rudraksha beads are believed to act as energy conductors, helping wearers elevate their consciousness. They are often used during meditation to deepen focus and enhance spiritual awareness.
  </p>

  <h3>Protection from Negative Energies</h3>
  <p>
    Many spiritual practitioners believe that Rudraksha creates an energetic shield, protecting the wearer from negative influences, psychic disturbances, and external stressors.
  </p>

  <h2>Scientific Reasons to Wear Rudraksha</h2>
  <p>
    While the spiritual benefits of Rudraksha are well-documented, scientific research also highlights the physiological advantages of wearing these sacred beads. Studies have shown that Rudraksha beads generate a subtle electromagnetic field that interacts with the body&apos;s bioelectric system.
  </p>

  <h3>Balances the Nervous System</h3>
  <p>
    The natural frequency of Rudraksha beads helps stabilize the nervous system, reducing anxiety, stress, and restlessness. This makes them an excellent tool for individuals seeking mental calmness and focus.
  </p>

  <h3>Regulates Blood Pressure</h3>
  <p>
    Research suggests that wearing Rudraksha beads can help maintain optimal blood pressure by regulating heart rate and improving circulation. Their electromagnetic properties interact with the heart&apos;s rhythm, promoting overall cardiovascular health.
  </p>

  <h3>Enhances Concentration and Cognitive Function</h3>
  <p>
    Rudraksha beads stimulate positive neural activity, improving focus, memory retention, and overall cognitive performance. Many students and professionals wear Rudraksha to enhance their learning abilities and decision-making skills.
  </p>

  <h2>Who Should Wear Rudraksha?</h2>
  <p>
    Rudraksha beads can be worn by anyone, regardless of age, gender, or religious beliefs. They are particularly beneficial for individuals seeking:
  </p>
  <ul>
    <li>Spiritual growth and deeper meditation</li>
    <li>Relief from stress, anxiety, and depression</li>
    <li>Better focus, concentration, and decision-making</li>
    <li>Protection from negative energies and external influences</li>
    <li>Improved physical health and well-being</li>
  </ul>

  <h2>Conclusion: The Power of Rudraksha in Daily Life</h2>
  <p>
    Whether for spiritual elevation or scientific well-being, wearing a Rudraksha bead can bring transformative changes to your life. Its divine and bioelectric properties make it a powerful tool for achieving inner peace, clarity, and protection.
  </p>
  <p>
    If you are looking to enhance your spiritual journey or improve your mental and physical health, consider incorporating Rudraksha into your daily routine. Explore our collection of authentic, energized Rudraksha beads and experience their sacred power firsthand.
  </p>
  <p>
    <em>Om Namah Shivaya!</em>
  </p>
            </article>
          }

          {
            id === "3" && 
            <article className="prose prose-lg max-w-none">
            <p>
              Rudraksha beads have long been surrounded by mystery, legend, and divine reverence. Ancient scriptures describe them as sacred gifts from Lord Shiva, carrying spiritual power and mystical healing properties. But what are the origins of these mystical beads, and why have they fascinated sages, seekers, and scientists alike for centuries?
            </p>
          
            <h2>The Legend of Rudraksha: Tears of Lord Shiva</h2>
            <p>
              According to Hindu mythology, Rudraksha beads were born from the tears of Lord Shiva. It is said that while deep in meditation, Lord Shiva opened his eyes and shed tears of compassion for humanity. As these divine tears fell to the earth, they transformed into Rudraksha seeds, which grew into the sacred trees we see today.
            </p>
            <p>
              This celestial origin story highlights the immense spiritual significance of Rudraksha, making it a powerful talisman for protection, meditation, and enlightenment.
            </p>
          
            <h2>The Mystical Powers of Rudraksha</h2>
            <p>
              Rudraksha beads are believed to possess extraordinary mystical properties that go beyond spiritual benefits. They are said to:
            </p>
            <ul>
              <li>Enhance meditation by aligning the mind with higher consciousness</li>
              <li>Protect the wearer from negative energies and evil influences</li>
              <li>Promote healing by balancing the body’s energy fields</li>
              <li>Strengthen willpower and inner resilience</li>
              <li>Attract prosperity and good fortune</li>
            </ul>
          
            <h2>Rudraksha in Ancient Texts</h2>
            <p>
              The power of Rudraksha beads is documented in several ancient scriptures, including the Shiva Purana, Padma Purana, and Devi Bhagavata Purana. These texts provide insight into the benefits of different types of Rudraksha and their impact on spiritual growth, health, and well-being.
            </p>
            <p>
              According to the Shiva Purana, wearing Rudraksha brings divine blessings and protects one from negative karma. The Padma Purana describes its ability to balance planetary influences, while the Devi Bhagavata Purana highlights its role in enhancing devotion and spiritual discipline.
            </p>
          
            <h2>Modern Science and Rudraksha</h2>
            <p>
              While ancient legends emphasize the divine origins of Rudraksha, modern science has also begun to explore its potential benefits. Research suggests that Rudraksha beads generate an electromagnetic field that interacts with the human biofield, promoting balance and well-being.
            </p>
            <p>
              Some studies indicate that Rudraksha may help regulate blood pressure, reduce stress, and enhance mental clarity. This scientific validation aligns with centuries-old beliefs about the bead’s ability to influence the body and mind in positive ways.
            </p>
          
            <h2>Conclusion: The Everlasting Mystery of Rudraksha</h2>
            <p>
              The mysteries of Rudraksha continue to intrigue spiritual seekers and scientists alike. Whether viewed as divine tears of Shiva or as nature’s gift for well-being, these beads hold a profound place in spiritual traditions worldwide.
            </p>
            <p>
              For those drawn to its energy, Rudraksha is more than an ornament—it is a bridge between the earthly and the divine, carrying ancient wisdom and powerful vibrations. Embrace the mystery, and let Rudraksha guide you on your spiritual journey.
            </p>
            <p>
              <em>Har Har Mahadev!</em>
            </p>
            </article>
          }

          {
            id === "4" && 
            <article className="prose prose-lg max-w-none">
  <p>
    For centuries, Rudraksha beads have been revered for their profound impact on health, wealth, and spirituality. These sacred beads, believed to be formed from Lord Shiva’s tears, hold immense power to transform one’s life. But what exactly makes Rudraksha so beneficial? Let’s explore the incredible advantages of wearing these divine beads.
  </p>

  <h2>Health Benefits of Rudraksha</h2>
  <p>
    Rudraksha beads are known to harmonize the body’s energy and promote overall well-being. When worn regularly, they can provide numerous health benefits, including:
  </p>
  <ul>
    <li>Regulating blood pressure and promoting heart health</li>
    <li>Reducing stress, anxiety, and depression</li>
    <li>Enhancing focus, memory, and cognitive function</li>
    <li>Strengthening the immune system and increasing vitality</li>
    <li>Balancing the nervous system and promoting restful sleep</li>
  </ul>

  <h2>Wealth and Prosperity with Rudraksha</h2>
  <p>
    Rudraksha is not only a tool for spiritual growth but also a symbol of abundance and prosperity. Many business owners and professionals wear Rudraksha beads to attract success and financial stability. The benefits include:
  </p>
  <ul>
    <li>Enhancing decision-making skills and confidence</li>
    <li>Attracting positive energy and opportunities</li>
    <li>Helping overcome financial obstacles and setbacks</li>
    <li>Promoting clarity in business dealings and investments</li>
  </ul>

  <h2>Spiritual Growth and Inner Peace</h2>
  <p>
    At its core, Rudraksha is a powerful spiritual aid that helps the wearer connect with higher consciousness. It plays a vital role in meditation, yoga, and spiritual awakening by:
  </p>
  <ul>
    <li>Enhancing meditation and deepening spiritual practice</li>
    <li>Protecting against negative energies and evil influences</li>
    <li>Aligning the chakras and promoting energy balance</li>
    <li>Fostering inner peace and emotional stability</li>
  </ul>

  <h2>Scientific Backing: The Power of Rudraksha</h2>
  <p>
    While Rudraksha is deeply rooted in spirituality, modern science has also begun to validate its benefits. Research suggests that Rudraksha beads generate electromagnetic fields that positively influence the human biofield. Some studies indicate that they help stabilize the autonomic nervous system, reduce stress, and enhance cognitive function.
  </p>
  <p>
    This scientific perspective reinforces what ancient sages have known for millennia—Rudraksha beads are not just spiritual tools but also a natural source of well-being and harmony.
  </p>

  <h2>Conclusion: Embrace the Power of Rudraksha</h2>
  <p>
    Whether you seek better health, financial success, or spiritual enlightenment, Rudraksha beads can be a transformative addition to your life. Their benefits extend beyond mere belief, offering real, tangible improvements in various aspects of life.
  </p>
  <p>
    Wearing a Rudraksha is more than a tradition—it is a journey towards inner balance, prosperity, and divine connection. Choose your Rudraksha wisely and experience its profound impact firsthand.
  </p>
  <p>
    <em>Har Har Mahadev!</em>
  </p>
            </article>
          }

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
                        <Link href={`/blog/${post.id}`} className="text-orange-600 font-medium hover:text-orange-700">
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