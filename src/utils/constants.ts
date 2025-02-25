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