import { Heart, ShoppingBag, User } from "lucide-react";


export  const TopNavIcon : IconWithUrl[] = [
    {
        url: '/',
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
