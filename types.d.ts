declare interface IconWithUrl {
    url: string;
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

declare interface NavInputProps {
    searchVal: string;
    setSearchVal: Dispatch<SetStateAction<string>>;
    className ?: string;
}

declare interface SelectCurrencyOptions {
    currency: string;
    code: string;
}

declare interface BottomNavLinks {
    title: string;
    url: string;
}
declare interface Slides {
    title: string;
    description: string;
    image: string;
}
declare interface UserType { 
    id: string;
    name: string;
    email: string; 
    role: boolean 
}

declare interface CollectionItems {
    id : number;
    title : string;
    image : string;
    href : string;
    badge ?: string;
}

interface Product {
    id: string
    name: string
    description: string
    price: number
    stock: number
    createdAt: string
    updatedAt: string
    image: string[]
    category: string[]
    rating: number
    isConsecrated: boolean
}

declare interface ProductShow    {
    id: number,
    name: string,
    originalPrice: string,
    currentPrice: string,
    image: string,
    description ?: string
}

declare interface Testimonial {
    id: number;
    name: string;
    location: string;
    rating: number;
    timeAgo: string;
    comment: string;
    avatarColor: string;
    avatarInitial: string;
}

declare interface BlogPost {
    id: string
    title: string
    excerpt: string
    image: string
    slug: string
}

interface CartResponse {
    cart: {
      id: string;
      userId: string;
      items: CartItem[];
    };
  }
  
  interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    product: Product;
  }