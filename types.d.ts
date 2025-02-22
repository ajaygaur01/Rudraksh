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