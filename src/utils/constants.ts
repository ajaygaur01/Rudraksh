import { Heart, ShoppingBag, User } from "lucide-react";


export  const TopNavIcon : IconWithUrl[] = [
    {
        url: '/cart',
        Icon: ShoppingBag
    },
    {
        url: '/',
        Icon: Heart
    },
    {   
        url: '/register',
        Icon : User
    }
]

export const ButtonNavLinks : BottomNavLinks[] = [
    {
        title: 'Rudraksha',
        url: '/'
    },
    {
        title: 'Exclusive',
        url: '/'
    },
    {
        title: 'Siddha Mala',
        url: '/'
    },
    {
        title: 'Rudraksha Consultation',
        url: '/'
    },
    {
        title: 'About Us',
        url: '/'
    },
    {
        title: 'Shivratri',
        url: '/'
    },
    {
        title : 'More',
        url : '/'
    }
]

export const slides : Slides[] = [
    {
      title: "Mountain Paradise",
      description: "Discover breathtaking mountain views",
      image: "/images/banners/banner.webp" 
    },
    {
      title: "Beach Retreat",
      description: "Relax by the crystal clear waters",
      image: "/images/banners/banner.webp"
    },
    {
      title: "Urban Adventure",
      description: "Explore vibrant city life",
      image: "/images/banners/banner.webp"
    },
    {
      title: "Forest Escape",
      description: "Get lost in nature's embrace",
      image: "/images/banners/banner.webp"
    }
];

export const collections : CollectionItems[] = [
    {
      id: 1,
      title: 'Stone & Crystal Mala',
      image: '/images/listings/Jaap-Mala.jpg',
      href: '/collections/stone-crystal-mala'
    },
    {
      id: 2,
      title: 'Rudraksha & Wood Mala',
      image: '/images/listings/RudrakshaMala.webp',
      href: '/collections/rudraksha-wood-mala',
      badge: 'BEST OFFER'
    },
    {
      id: 4,
      title: '1 to 14 Mukhi Combination',
      image: '/images/listings/14Mukhi.jpg',
      href: '/collections/mukhi-combination'
    },
    {
      id: 3,
      title: 'Bracelets',
      image: '/images/listings/bracelet.jpg',
      href: '/collections/bracelets'
  },
]; 

export const rudrakshaItems: ProductShow[] = [
  {
    id: 1,
    name: "Ek Mukhi Rudraksha",
    description: "Spiritual enlightenment",
    originalPrice: "Rs. 500,000",
    currentPrice: "Rs. 450,000.00",
    image: "/images/Collections/Rudraksha/1Mukhi.webp"
  },
  {
    id: 2,
    name: "Do Mukhi Rudraksha",
    description: "Harmony, balance",
    originalPrice: "Rs. 50,000",
    currentPrice: "Rs. 45,000.00",
    image: "/images/Collections/Rudraksha/2Mukhi.webp"
  },
  {
    id: 3,
    name: "Teen Mukhi Rudraksha",
    description: "Confidence, energy",
    originalPrice: "Rs. 20,000",
    currentPrice: "Rs. 18,000.00",
    image: "/images/Collections/Rudraksha/3Mukhi.webp"
  },
  {
    id: 4,
    name: "Chaar Mukhi Rudraksha",
    description: "Knowledge, creativity",
    originalPrice: "Rs. 25,000",
    currentPrice: "Rs. 22,500.00",
    image: "/images/Collections/Rudraksha/4Mukhi.webp"
  },
  {
    id: 5,
    name: "Paanch Mukhi Rudraksha",
    description: "Peace, meditation",
    originalPrice: "Rs. 5,000",
    currentPrice: "Rs. 4,500.00",
    image: "/images/Collections/Rudraksha/5Mukhi.webp"
  },
  {
    id: 6,
    name: "Shat Mukhi Rudraksha",
    description: "Willpower, intelligence",
    originalPrice: "Rs. 12,000",
    currentPrice: "Rs. 10,800.00",
    image: "/images/Collections/Rudraksha/6Mukhi.webp"
  },
  {
    id: 7,
    name: "Saat Mukhi Rudraksha",
    description: "Wealth, prosperity",
    originalPrice: "Rs. 18,000",
    currentPrice: "Rs. 16,200.00",
    image: "/images/Collections/Rudraksha/7Mukhi.webp"
  },
  {
    id: 8,
    name: "Aath Mukhi Rudraksha",
    description: "Success, obstacles",
    originalPrice: "Rs. 30,000",
    currentPrice: "Rs. 27,000.00",
    image: "/images/Collections/Rudraksha/8Mukhi.webp"
  },
  {
    id: 9,
    name: "Nau Mukhi Rudraksha",
    description: "Strength, courage",
    originalPrice: "Rs. 40,000",
    currentPrice: "Rs. 36,000.00",
    image: "/images/Collections/Rudraksha/9Mukhi.webp"
  },
  {
    id: 10,
    name: "Dus Mukhi Rudraksha",
    description: "Protection, peace",
    originalPrice: "Rs. 60,000",
    currentPrice: "Rs. 54,000.00",
    image: "/images/Collections/Rudraksha/10Mukhi.webp"
  },
  // You can add Mukhi 11 to 21 similarly with their descriptions.
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anant P.",
    location: "San Jose, CA",
    rating: 5,
    timeAgo: "9 hours ago",
    comment: "Highly recommended! Exceptional Quality",
    avatarColor: "bg-purple-200",
    avatarInitial: "A",
  },
  {
    id: 2,
    name: "Yohan S.",
    location: "Unknown",
    rating: 5,
    timeAgo: "8 days ago",
    comment: "It was a great experience, very good customer service, and smooth delivery",
    avatarColor: "bg-teal-500",
    avatarInitial: "Y",
  },
  {
    id: 3,
    name: "Vyshnavl B.",
    location: "Unknown",
    rating: 5,
    timeAgo: "2 days ago",
    comment:
      "Very much impressed with the packaging...authentic Rudrakshas...really happy with the order. Har har mahadev Om namah parvathi pathaye har har mahadev🙏",
    avatarColor: "bg-purple-500",
    avatarInitial: "V",
  },
  {
    id: 4,
    name: "Rahul M.",
    location: "Mumbai, India",
    rating: 5,
    timeAgo: "1 week ago",
    comment: "The Rudraksha beads are of excellent quality. I can feel the positive energy. Thank you!",
    avatarColor: "bg-amber-500",
    avatarInitial: "R",
  },
  {
    id: 5,
    name: "Priya K.",
    location: "Delhi, India",
    rating: 5,
    timeAgo: "3 days ago",
    comment: "Fast shipping and beautiful packaging. The Rudraksha has brought peace to my life.",
    avatarColor: "bg-emerald-500",
    avatarInitial: "P",
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "5",
    title: "How to Choose the Right Rudraksha for Yourself?",
    excerpt: "Choosing the right Rudraksha depends on your needs and spiritual goals. Learn how to select the best Rudraksha bead based on your zodiac sign and energy requirements...",
    image: "/images/blogs/best.webp",
    slug: "choose-right-rudraksha"
  },
  {
    id: "1",
    title: "Different Types of Rudraksha and Their Significance",
    excerpt: "Rudraksha beads come in various types, each with unique benefits and spiritual significance. From one Mukhi to twenty-one Mukhi, discover the hidden power...",
    image: "/images/blogs/types.webp",
    slug: "different-types-of-rudraksha"
  },
  {
    id: "2",
    title: "Why Should You Wear a Rudraksha? The Spiritual and Scientific Reasons",
    excerpt: "Wearing a Rudraksha is believed to enhance spiritual growth, mental clarity, and physical well-being. But what does science say? Explore the reasons why...",
    image: "/images/blogs/choose.webp",
    slug: "why-wear-rudraksha"
  },
  {
    id: "3",
    title: "The Mysteries of Rudraksha: Unveiling Ancient Legends",
    excerpt: "Rudraksha beads are steeped in myths and ancient legends. From Lord Shiva’s tears to their mystical healing powers, dive deep into the fascinating mysteries...",
    image: "/images/blogs/whatev.webp",
    slug: "mysteries-of-rudraksha"
  },
  {
    id: "4",
    title: "Amazing Benefits of Rudraksha: Health, Wealth, and Spirituality",
    excerpt: "Rudraksha beads are known to bring balance, reduce stress, and promote spiritual growth. Learn about the profound benefits of wearing Rudraksha in daily life...",
    image: "/images/blogs/benefits.webp",
    slug: "benefits-of-rudraksha"
  },
];

export const products: ProductShow[] = [
  {
    id: 1,
    name: "2 Mukhi Rudraksha Mala",
    originalPrice: "Rs. 3,000.00",
    currentPrice: "Rs. 2,500.00",
    image: "/images/Collections/Rudraksha/2Mukhi.webp",
    description: "Lab-certified Indonesian Rudraksha mala",
  },
  {
    id: 2,
    name: "3 Mukhi Rudraksha Mala",
    originalPrice: "Rs. 3,000.00",
    currentPrice: "Rs. 2,500.00",
    image: "/images/Collections/Rudraksha/3mukhi.webp",
    description: "Lab-certified Indonesian Rudraksha mala",
  },
  {
    id: 3,
    name: "4 Mukhi Rudraksha mala",
    originalPrice: "Rs. 2,200.00",
    currentPrice: "Rs. 1,800.00",
    image: "/images/Collections/Rudraksha/4mukhii.webp",
    description: "Lab-certified Indonesian Rudraksha mala",
  },
  {
    id: 4,
    name: "5 mukhi rudraksha mala with 108+1 beads",
    originalPrice: "Rs. 750.00",
    currentPrice: "Rs. 599.00",
    image: "/images/Collections/Rudraksha/5mukhi.png",
    description: "Lab-certified Indonesian Rudraksha mala",
  },
  {
    id: 5,
    name: "6 Mukhi Rudraksha mala",
    originalPrice: "Rs. 2,200.00",
    currentPrice: "Rs. 1,800.00",
    image: "/images/Collections/Rudraksha/6mukhi.webp",
    description: "Lab-certified Indonesian Rudraksha mala",
  },
  {
    id: 6,
    name: "7 Mukhi Rudraksha mala",
    originalPrice: "Rs. 4,500.00",
    currentPrice: "Rs. 3,999.00",
    image: "/images/Collections/Rudraksha/7Mukhi.webp",
    description: "Lab-certified Indonesian Rudraksha mala",
  },
  {
    id: 7,
    name: "8 Mukhi Rudraksha Mala",
    originalPrice: "Rs. 2,500.00",
    currentPrice: "Rs. 2,000.00",
    image: "/images/Collections/Rudraksha/8mukhii.webp",
    description: "Lab-certified Indonesian Rudraksha mala",
  },
  {
    id: 8,
    name: "9 Mukhi Rudraksha Mala",
    originalPrice: "Rs. 3,000.00",
    currentPrice: "Rs. 2,500.00",
   image: "/images/Collections/Rudraksha/9mukhi.webp",
    description: "Lab-certified Indonesian Rudraksha mala",
  },
]
