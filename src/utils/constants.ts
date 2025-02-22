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