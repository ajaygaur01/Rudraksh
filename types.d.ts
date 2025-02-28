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