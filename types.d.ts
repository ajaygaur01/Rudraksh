declare module 'currency-converter-lt' {
    export default class CurrencyConverter {
      constructor(options?: { from?: string; to?: string; amount?: number });
      convert(amount: number): Promise<number>;
    }
  }
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
    [x: string]: { rating: number; }[];
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
    orgprice : number,
    price : number,
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

interface User {
    id: string;
    role: boolean;
    name: string;
    email: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    resetToken: string | null;
    resetTokenExpiry: Date | null;
}

type FetchUser =
  | { user: User  } // Success response
  | { error: string }; // Error response
