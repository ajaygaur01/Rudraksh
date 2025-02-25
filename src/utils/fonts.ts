import { Geist, Geist_Mono,Merriweather, Poppins, Cormorant_Garamond} from "next/font/google";


export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
export const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const merriweather = Merriweather({
    variable: "--font-merriweather",
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
});

export const popping = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
});

export const comorantGaramond = Cormorant_Garamond({
    variable: "--font-cormorant-garamond",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
});